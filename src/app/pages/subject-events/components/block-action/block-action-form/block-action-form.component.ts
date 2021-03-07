import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { BlockActionModel } from 'src/app/core/models/subject/block-action.model';
import { BlockModel } from 'src/app/core/models/subject/block.model';
import { ActionService } from 'src/app/core/services/subject/action.service';
import { BlockService } from 'src/app/core/services/subject/block.service';
import { DateService } from 'src/app/core/services/utils/date.service';

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

  previousStartDate: Date;

  constructor(
    private route: ActivatedRoute,
    private blockService: BlockService,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private actionService: ActionService,
    private dateService: DateService
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

      action.startDate = this.dateService.covertDateToAPIFriendlyFormat(new Date(action.startDate));
      action.endDate = this.dateService.covertDateToAPIFriendlyFormat(new Date(action.endDate));

      if (action.attendanceAllowStartDate) {
        action.attendanceAllowStartDate = this.dateService.covertDateToAPIFriendlyFormat(new Date(action.attendanceAllowStartDate));
      }
      if (action.attendanceAllowEndDate) {
        action.attendanceAllowEndDate = this.dateService.covertDateToAPIFriendlyFormat(new Date(action.attendanceAllowEndDate));
      }
      if (action.attendanceSignOffEndDate) {
        action.attendanceSignOffEndDate = this.dateService.covertDateToAPIFriendlyFormat(new Date(action.attendanceSignOffEndDate));
      }

      action.attendanceSignOffEndDate = this.dateService.covertDateToAPIFriendlyFormat(new Date(action.attendanceSignOffEndDate));

      if (this.action.id) {
        this.update(action);
      } else {
        this.create(action);
      }
    }
  }

  covertDateToISO(date: Date): string {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    return (new Date(date.getTime() - tzoffset)).toISOString().slice(0, -1);
  }

  validateDate(): void {
    this.form.get('startDate').setErrors(null);

    this.validateAttendanceAllowStartDate();
    this.validateAttendanceAllowEndDate();
    this.validateAttendanceSignOffEndDate();

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

  validateAttendanceSignOffEndDate(): void {
    const startDate = this.form.get('startDate').value as Date;
    const attendanceSignOffEndDate = this.form.get('attendanceSignOffEndDate').value as Date;

    if (!startDate || !attendanceSignOffEndDate) {
      return;
    }

    if (attendanceSignOffEndDate > startDate) {
      this.form.get('attendanceSignOffEndDate').setErrors({ 'dateRange': true });
    }

  }

  validateAttendanceAllowStartDate(): void {
    const startDate = this.form.get('startDate').value as Date;
    const attendanceAllowStartDate = this.form.get('attendanceAllowStartDate').value as Date;

    if (!startDate || !attendanceAllowStartDate) {
      return;
    }

    if (attendanceAllowStartDate > startDate) {
      this.form.get('attendanceAllowStartDate').setErrors({ 'dateRange': true });
    }

  }

  validateAttendanceAllowEndDate(): void {
    const startDate = this.form.get('startDate').value as Date;
    const attendanceAllowEndDate = this.form.get('attendanceAllowEndDate').value as Date;

    if (!startDate || !attendanceAllowEndDate) {
      return;
    }

    if (attendanceAllowEndDate > startDate) {
      this.form.get('attendanceAllowEndDate').setErrors({ 'dateRange': true });
    }

  }

  update(action: BlockActionModel): void {

  }

  create(action: BlockActionModel): void {
    this.actionService.create(action).subscribe(() => {
      this.back();
    });
  }

  getBlock(blockId: number): void {
    this.blockService.getSingle(blockId).subscribe(res => {
      this.block = res;

      if (!this.action.id) {
        this.action.blockActionRestriction.allowExternalUsers = this.block.blockRestriction.allowExternalUsers;
        this.action.blockActionRestriction.allowOnlyStudentsOnWhiteList = this.block.blockRestriction.allowOnlyStudentsOnWhiteList;
      }

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
      blockActionRestriction: this.formBuilder.group({
        allowExternalUsers: [this.action.blockActionRestriction.allowExternalUsers, Validators.required],
        allowOnlyStudentsOnWhiteList: [this.action.blockActionRestriction.allowOnlyStudentsOnWhiteList, Validators.required],
        maxCapacity: [this.action.blockActionRestriction.maxCapacity, Validators.required],
      })
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
      this.router.navigateByUrl('admin/block/' + this.block.id);
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

  onStartDateChange(date: Date): void {
  
    if (this.previousStartDate) {
      this.changeDateSignInSignOffDate(this.dateService.getDifferenceInMilliseconds(date, this.previousStartDate));
    }

    this.previousStartDate = new Date(date.getTime());
  }

  changeDateSignInSignOffDate(millisecondsDifference: number): void {

    const attendanceAllowStartDate = this.form.get('attendanceAllowStartDate');
    const attendanceAllowEndDate = this.form.get('attendanceAllowEndDate');
    const attendanceSignOffEndDate = this.form.get('attendanceSignOffEndDate');

    this.addTimeToControl(attendanceAllowStartDate, millisecondsDifference);
    this.addTimeToControl(attendanceAllowEndDate, millisecondsDifference);
    this.addTimeToControl(attendanceSignOffEndDate, millisecondsDifference);

  }

  addTimeToControl(control: AbstractControl, millisecondsDifference: number): void {
    if (!control.value) {
      return;
    }
    control.setValue(this.dateService.appendTimeToDate(control.value, millisecondsDifference));
  }
}
