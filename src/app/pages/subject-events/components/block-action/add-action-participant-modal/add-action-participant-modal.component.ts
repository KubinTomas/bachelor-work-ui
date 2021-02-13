import { Component, OnInit } from '@angular/core';
import { ActionPersonModel } from 'src/app/core/models/persons/action-person.model';
import { StudentModel } from 'src/app/core/models/persons/student.model';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { PersonService } from 'src/app/core/services/person/person.service';

@Component({
  selector: 'app-add-action-participant-modal',
  templateUrl: './add-action-participant-modal.component.html',
  styleUrls: ['./add-action-participant-modal.component.scss']
})
export class AddActionParticipantModalComponent implements OnInit {

  actionId: number;
  visible: boolean;

  student: StudentModel;

  studentOsCislo = '';

  constructor(
    private personService: PersonService,
    private notificationToastrService: NotificationToastrService
  ) { }

  ngOnInit(): void {
  }

  openModal(actionId: number): void {
    this.actionId = actionId;
    this.visible = true;
  }
  closeModal(): void {
    this.actionId = null;
    this.visible = false;
  }

  addParticipant(): void {
    if (!this.actionId) {
      return;
    }
  }

  findParticipant(): void {
    this.personService.findStudent(this.studentOsCislo).subscribe(person => {
      this.student = person;
    }, (error) => {
      this.student = null;
      this.notificationToastrService.showError('Student ' + this.studentOsCislo + ' nebyl nalezen');
    });
  }

}
