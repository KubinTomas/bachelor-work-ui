import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockModel } from 'src/app/core/models/subject/block.model';
import { BlockService } from 'src/app/core/services/subject/block.service';
import { SubjectInYearTermService } from 'src/app/core/services/subject/subject-in-year-term.service';

@Component({
  selector: 'app-subject-in-year-block-form',
  templateUrl: './subject-in-year-block-form.component.html',
  styleUrls: ['./subject-in-year-block-form.component.scss']
})
export class SubjectInYearBlockFormComponent implements OnInit {

  form: FormGroup;
  block: BlockModel = new BlockModel();

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private blockService: BlockService,
    private termService: SubjectInYearTermService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.form = null;

      const termId = Number(params.termId);
      const blockId = Number(params.blockId);

      // potrebuji subjectId a subjectInYearId

      if (blockId) {
        this.getBlock(blockId);
      } else {
        this.getTerm(termId);
      }

    });
  }


  getTerm(termId: number): void {
    this.termService.getSingle(termId).subscribe(term => {

      this.block.termId = termId;
      this.block.subjectId = term.subjectId;
      this.block.subjectInYearId = term.subjectInYearId;

      this.buildForm();
    });
  }

  getBlock(blockId: number): void {
    this.blockService.getSingle(blockId).subscribe(res => {
      this.block = res;
      this.buildForm();
    });
  }

  buildForm(): void {
    // todo validator ze rok je unikatni
    this.form = this.formBuilder.group({
      name: [this.block.name, [Validators.required, Validators.maxLength(100)]],
      blockRestriction: this.formBuilder.group({
        allowExternalUsers: [this.block.blockRestriction.allowExternalUsers, Validators.required],
        allowOnlyStudentsOnWhiteList: [this.block.blockRestriction.allowOnlyStudentsOnWhiteList, Validators.required],
        actionAttendLimit: [this.block.blockRestriction.actionAttendLimit, Validators.required],
      })
    });
  }

  submitForm(): void {
    this.triggerFormValidation();

    if (this.form.valid) {
      if (this.block.id) {
        this.updateSubject(this.form.value);
      } else {
        this.createSubject(this.form.value);
      }
    }
  }

  createSubject(block: BlockModel): void {
    this.blockService.create(block).subscribe(() => {
      this.back();
    });
  }

  back(): void {
    const navState: any = this.location.getState();

    if (navState.navigationId === 1) {
      this.router.navigateByUrl('admin/term/detail/' + this.block.termId);
    } else {
      this.location.back();
    }
  }

  updateSubject(block: BlockModel): void {
    block.id = this.block.id;

    this.blockService.update(block).subscribe(() => {
      this.back();
    });
  }

  triggerFormValidation(): void {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsTouched();
      this.form.controls[i].updateValueAndValidity();
    }
  }

}
