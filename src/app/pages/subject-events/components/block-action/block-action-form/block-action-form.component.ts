import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { BlockActionModel } from 'src/app/core/models/subject/block-action.model';
import { BlockModel } from 'src/app/core/models/subject/block.model';
import { BlockService } from 'src/app/core/services/subject/block.service';

@Component({
  selector: 'app-block-action-form',
  templateUrl: './block-action-form.component.html',
  styleUrls: ['./block-action-form.component.scss']
})
export class BlockActionFormComponent implements OnInit {

  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  form: FormGroup;
  action: BlockActionModel = new BlockActionModel();
  block: BlockModel;

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
    this.triggerFormValidation();

    this.validateDate();

    if (this.form.valid) {
      const action = this.form.value as BlockActionModel;
      action.id = this.action.id;
      action.blockId = this.block.id;

      console.log(action);

      if (this.action.id) {
        this.update(action);
      } else {
        this.create(action);
      }
    }
  }

  validateDate(): void {
    this.form.get('startDate').setErrors(null);

    const startDate = this.form.get('startDate').value as Date;
    const endDate = this.form.get('endDate').value as Date;

    if (!this.form.get('startDate').touched || !this.form.get('endDate').touched) {
      return;
    }

    if (!startDate || !endDate) {
      this.form.get('startDate').setErrors({ 'required': true });
    } else {
      if (endDate >= startDate) {
        this.form.get('startDate').setErrors(null);
      } else {
        this.form.get('startDate').setErrors({ 'dateRange': true });
      }
    }
  }

  update(action: BlockActionModel): void {

  }

  create(action: BlockActionModel): void {
    console.log(action);
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
      description: [this.action.description, []],
      // startEndDate: [this.action.id ? [this.action.startDate, this.action.endDate] : [], [Validators.required]],
      startDate: [this.action.startDate, [Validators.required]],
      endDate: [this.action.endDate, [Validators.required]],
      attendanceAllowStartDate: [this.action.attendanceAllowStartDate, []],
      attendanceAllowEndDate: [this.action.attendanceAllowEndDate, []],
      attendanceSignOffEndDate: [this.action.attendanceSignOffEndDate, [Validators.required]],
      visible: [this.action.visible, [Validators.required]],
    });
  }


  handleStartOpenChange(open: boolean): void {
    this.validateDate();

    if (!open) {
      this.endDatePicker.open();
    }
  }

  handleEndOpenChange(open: boolean): void {
    this.validateDate();
  }



  back(): void {
    const navState: any = this.location.getState();

    if (navState.navigationId === 1) {
      this.router.navigateByUrl('admin/term/detail/' + this.block.termId);
    } else {
      this.location.back();
    }
  }

  triggerFormValidation(): void {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsTouched();
      this.form.controls[i].updateValueAndValidity();
    }
  }
}
