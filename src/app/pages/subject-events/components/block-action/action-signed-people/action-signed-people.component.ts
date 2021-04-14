import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { PersonMailTo } from 'src/app/core/models/others/person-mail-to.model';
import { ActionPersonModel } from 'src/app/core/models/persons/action-person.model';
import { BlockActionModel } from 'src/app/core/models/subject/block-action.model';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { ActionService } from 'src/app/core/services/subject/action.service';
import { MailModalComponent } from 'src/app/shared/components/mail-modal/mail-modal.component';

@Component({
  selector: 'app-action-signed-people',
  templateUrl: './action-signed-people.component.html',
  styleUrls: ['./action-signed-people.component.scss']
})
export class ActionSignedPeopleComponent implements OnInit {

  @ViewChild(MailModalComponent) mailModalComponent: MailModalComponent;
  @ViewChild(NzTableComponent) table: NzTableComponent;
  @ViewChild('searchInput') searchInput;

  @Output() addUser: EventEmitter<any> = new EventEmitter();

  @Input() action: BlockActionModel;

  visible = false;
  isLoading = false;
  attendance = 1;

  listOfPeople: ActionPersonModel[];

  listOfColumn = [
    {
      title: '',
      width: "25"
    },
    {
      title: 'Číslo',
      compare: (a: ActionPersonModel, b: ActionPersonModel) => a.studentOsCislo.localeCompare(b.studentOsCislo),
      priority: 2,
      width: "150"
    },
    {
      title: 'Jméno',
      compare: (a: ActionPersonModel, b: ActionPersonModel) => a.fullname.localeCompare(b.fullname),
      priority: 1,
      width: "250"
    },
    {
      title: 'Ročník',
      compare: (a: ActionPersonModel, b: ActionPersonModel) => a.rocnik && b.rocnik ? a.rocnik.localeCompare(b.rocnik) : false,
      priority: 3,
      width: "50"
    },
    {
      title: 'Fakulta',
      compare: (a: ActionPersonModel, b: ActionPersonModel) => a.fakultaSp && b.fakultaSp ? a.fakultaSp.localeCompare(b.fakultaSp) : false,
      priority: 4,
    },
    {
      title: 'Docházka',
      compare: (a: ActionPersonModel, b: ActionPersonModel) => a.evaluationDate ? a.fulfilled : false,
      priority: 5,
    },
    {
      title: 'Změna stavu docházky',
    },
    {
      title: 'Datum vyhodnocení',
      compare: (a: ActionPersonModel, b: ActionPersonModel) => a.evaluationDate ? a.fulfilled : false,
      priority: 6,
    },
    {
      title: 'Datum zápisu',
      compare: (a: ActionPersonModel, b: ActionPersonModel) => new Date(a.dateIn).getTime() - new Date(b.dateIn).getTime(),
      priority: 7,
      width: "200"
    },
    {
      title: 'Akce',
      width: "150"
    },
  ];

  constructor(
    private actionService: ActionService,
    private notificationToastrService: NotificationToastrService,
  ) { }

  ngOnInit(): void {
  }

  onAddParticipantClick(): void {
    this.addUser.emit();
  }

  setAttendanceFulfilled(actionPersonModel: ActionPersonModel, fulfilled: boolean): void {

    this.actionService.attendanceFulfilled(actionPersonModel.id, fulfilled).subscribe(person => {

      actionPersonModel.fulfilled = person.fulfilled;
      actionPersonModel.evaluationDate = person.evaluationDate;

      if (fulfilled) {
        this.notificationToastrService.showSuccess('Označeno jako splněno', '', 1500);
      } else {
        this.notificationToastrService.showWarning('Označeno jako nesplněno', '', 1500);
      }

    });
  }

  kickUser(id: number): void {


    this.actionService.attendanceKick(id).subscribe(() => {
      this.action.signedUsers = this.action.signedUsers.filter(c => c.id !== id);

      if (this.listOfPeople) {
        this.listOfPeople = this.listOfPeople.filter(c => c.id !== id);
      }

      this.notificationToastrService.showSuccess('Uživatel byl vyhozen');
    });
  }


  onSearchChange(value: string): void {

    if (!this.listOfPeople) {
      this.listOfPeople = [...this.action.signedUsers];
    }

    if (!value) {
      this.action.signedUsers = [...this.listOfPeople];
      return;
    }

    this.action.signedUsers = this.listOfPeople.filter(c => c.fullname.toLowerCase().indexOf(value.toLowerCase()) > -1
      || (c.fullname && c.fullname.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (c.rocnik && c.rocnik.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (c.fakultaSp && c.fakultaSp.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (c.studentOsCislo && c.studentOsCislo.toLowerCase().indexOf(value.toLowerCase()) > -1)
    );
  }

  pushToListOfData(person: ActionPersonModel): void {
    if (this.listOfPeople) {
      this.listOfPeople.push(person);
    }

    this.onSearchChange(this.searchInput.nativeElement.value);
  }

  onSendEmail(): void {
    const options = this.action.signedUsers
      .map(c => new PersonMailTo(c.id, c.isStagStudent, c.studentOsCislo, c.fullname, c.rocnik, c.fakultaSp));

    this.openSendMailModal(options);
  }

  onSendSingleEmail(c: ActionPersonModel): void {
    const option = new PersonMailTo(c.id, c.isStagStudent, c.studentOsCislo, c.fullname, c.rocnik, c.fakultaSp);

    this.openSendMailModal([option]);
  }

  openSendMailModal(options: PersonMailTo[]): void {
    this.mailModalComponent.open(options, this.action);
  }

  onChangeAttendanceClick(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }


  onOk(): void {

    this.isLoading = true;
    this.actionService.changeAttendanceClick(this.action.id, this.attendance).subscribe(res => {

      if (!this.listOfPeople) {
        this.listOfPeople = [...this.action.signedUsers];
      }

      this.action.signedUsers.forEach(c => {
        c.fulfilled = res.fulfilled;
        c.evaluationDate = res.date;
      });

      this.listOfPeople.forEach(c => {
        c.fulfilled = res.fulfilled;
        c.evaluationDate = res.date;
      });

      if (res.fulfilled) {
        this.notificationToastrService.showSuccess('Označeno jako splněno', '', 1500);
      } else {
        this.notificationToastrService.showWarning('Označeno jako nesplněno', '', 1500);
      }

      this.isLoading = false;
      this.close();
    }, (error) => {
      this.notificationToastrService.showWarning('Došlo k neočekávané chybě', '', 1500);
      this.isLoading = false;
    });
  }

  onDownloadExcel(): void {
    this.actionService.downloadActionAttendanceExcelViaUrl(this.action.id);
  }
}
