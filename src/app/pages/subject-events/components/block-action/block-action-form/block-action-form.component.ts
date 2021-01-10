import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockActionModel } from 'src/app/core/models/subject/block-action.model';
import { BlockModel } from 'src/app/core/models/subject/block.model';
import { BlockService } from 'src/app/core/services/subject/block.service';

@Component({
  selector: 'app-block-action-form',
  templateUrl: './block-action-form.component.html',
  styleUrls: ['./block-action-form.component.scss']
})
export class BlockActionFormComponent implements OnInit {

  form: FormGroup;
  action: BlockActionModel = new BlockActionModel();
  block: BlockModel;

  actionStartEndDate: Date[];

  constructor(
    private route: ActivatedRoute,
    private blockService: BlockService,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    this.route.params.subscribe(params => {
      this.form = null;

      const blockId = Number(params.blockId);

      if (blockId) {
        this.getBlock(blockId);
      }

    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    console.log(this.form.value);
    console.log(this.actionStartEndDate);
  }

  getBlock(blockId: number): void {
    this.blockService.getSingle(blockId).subscribe(res => {
      this.block = res;
      this.buildForm();
    });
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.action.name, [Validators.required]],
      location: [this.action.location, []],
      description: [this.action.description, [Validators.required]],
      actionStartEndDate: [[this.action.startDate, this.action.endDate], [Validators.required]],
      // startDate: [this.action.startDate, [Validators.required]],
      // endDate: [this.action.endDate, [Validators.required]],
      // attendanceAllowStartDate: [this.action.attendanceAllowStartDate, []],
      // attendanceAllowEndDate: [this.action.attendanceAllowEndDate, []],
      visible: [this.action.visible, [Validators.required]],
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
}
