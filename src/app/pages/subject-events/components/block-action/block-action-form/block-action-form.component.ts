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
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';

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

  actionId: number;

  edit = false;

  constructor(
    private route: ActivatedRoute,
    private blockService: BlockService,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private actionService: ActionService,
    private dateService: DateService,
    private toastrNotificationService: NotificationToastrService
  ) {

    this.route.params.subscribe(params => {
      this.form = null;

      const blockId = Number(params.blockId);

      this.edit = this.router.url.indexOf('/edit') > -1;

      if (params.actionId) {
        this.actionId = Number(params.actionId);
      }

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
      const action = this.form.getRawValue() as BlockActionModel;

      console.log(action);
      // action.id = this.action.id;
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
    action.id = this.actionId;
    
    this.actionService.update(action).subscribe(() => {
      this.back();
    });
  }

  create(action: BlockActionModel): void {
    this.actionService.create(action).subscribe(() => {
      this.back();
    });
  }

  getAction(actionId: number): void {
    this.actionService.getSingle(actionId).subscribe(res => {
      this.action = res;

      if (!this.edit) {
        this.action.id = null;
      }

      this.buildForm();
    }, (error) => {
      this.toastrNotificationService.showError('Nepodařilo se načíst akci');
    });
  }


  getBlock(blockId: number): void {
    this.blockService.getSingle(blockId).subscribe(res => {
      this.block = res;

      if (!this.action.id) {
        this.action.blockActionRestriction.allowExternalUsers = this.block.blockRestriction.allowExternalUsers;
        this.action.blockActionRestriction.allowOnlyStudentsOnWhiteList = this.block.blockRestriction.allowOnlyStudentsOnWhiteList;
      }

      if (this.actionId) {
        this.getAction(this.actionId);
      } else {
        this.buildForm();
      }


    });
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: [{ value: this.action.name, disabled: this.edit }, [Validators.required]],
      location: [this.action.location, []],
      description: [this.action.description, []],
      // startEndDate: [this.action.id ? [this.action.startDate, this.action.endDate] : [], [Validators.required]],
      startDate: [{ value: this.action.startDate, disabled: this.edit }, [Validators.required]],
      endDate: [{ value: this.action.endDate, disabled: this.edit }, [Validators.required]],
      attendanceAllowStartDate: [{ value: this.action.attendanceAllowStartDate, disabled: this.edit }, []],
      attendanceAllowEndDate: [{ value: this.action.attendanceAllowEndDate, disabled: this.edit }, []],
      attendanceSignOffEndDate: [{ value: this.action.attendanceSignOffEndDate, disabled: this.edit }, [Validators.required]],
      visible: [this.action.visible, [Validators.required]],
      blockActionRestriction: this.formBuilder.group({
        allowExternalUsers: [{ value: this.action.blockActionRestriction.allowExternalUsers, disabled: this.edit }, Validators.required],
        allowOnlyStudentsOnWhiteList: [{ value: this.action.blockActionRestriction.allowOnlyStudentsOnWhiteList, disabled: this.edit },
        Validators.required],
        maxCapacity: [{ value: this.action.blockActionRestriction.maxCapacity, disabled: this.edit }, Validators.required],
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
