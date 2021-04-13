import { Component, Input, OnInit } from '@angular/core';
import { ActionPersonModel } from 'src/app/core/models/persons/action-person.model';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { ActionService } from 'src/app/core/services/subject/action.service';

@Component({
  selector: 'app-action-queue-signed-people',
  templateUrl: './action-queue-signed-people.component.html',
  styleUrls: ['./action-queue-signed-people.component.scss']
})
export class ActionQueueSignedPeopleComponent implements OnInit {

  @Input() people: ActionPersonModel[];
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
      compare: (a: ActionPersonModel, b: ActionPersonModel) =>a.fakultaSp && b.fakultaSp ? a.fakultaSp.localeCompare(b.fakultaSp) : false,
      priority: 4,
    },
    {
      title: 'Pořadí',
      compare: (a: ActionPersonModel, b: ActionPersonModel) => a.queueOrder - b.queueOrder,
      priority: 5,
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

  kickUser(id: number): void {
    this.actionService.queueKick(id).subscribe(() => {
      this.people = this.people.filter(c => c.id !== id);

      this.notificationToastrService.showSuccess('Uživatel byl vyhozen z fronty');
    });
  }


  onSearchChange(value: string): void {

    if (!this.listOfPeople) {
      this.listOfPeople = [...this.people];
    }

    if (!value) {
      this.people = [...this.listOfPeople];
      return;
    }

    this.people = this.listOfPeople.filter(c => c.fullname.toLowerCase().indexOf(value.toLowerCase()) > -1
     || (c.fullname && c.fullname.toLowerCase().indexOf(value.toLowerCase()) > -1)
     || (c.rocnik && c.rocnik.toLowerCase().indexOf(value.toLowerCase()) > -1)
     || (c.fakultaSp && c.fakultaSp.toLowerCase().indexOf(value.toLowerCase()) > -1)
     || (c.studentOsCislo && c.studentOsCislo.toLowerCase().indexOf(value.toLowerCase()) > -1)
    );
  }
}
