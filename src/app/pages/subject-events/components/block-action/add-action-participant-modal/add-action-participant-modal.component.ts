import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() addParticipantEvent: EventEmitter<StudentModel> = new EventEmitter<StudentModel>();

  actionId: number;
  visible: boolean;

  student: StudentModel;

  studentOsCislo = '';

  processing = false;

  constructor(
    private personService: PersonService,
    private notificationToastrService: NotificationToastrService
  ) { }

  ngOnInit(): void {
  }

  openModal(actionId: number): void {
    this.actionId = actionId;
    this.visible = true;
    this.processing = false;
  }
  closeModal(): void {
    this.studentOsCislo = '';
    this.actionId = null;
    this.student = null;
    this.visible = false;
  }

  addParticipant(): void {
    if (!this.actionId || !this.student) {
      this.notificationToastrService.showError('Něco se nepovovedlo');
      return;
    }

    this.addParticipantEvent.emit(this.student);
  }

  findParticipant(): void {
    this.personService.findStudent(this.studentOsCislo).subscribe(person => {
      this.student = person;
      this.student.blockOrActionId = this.actionId;
    }, (error) => {
      this.student = null;
      this.notificationToastrService.showError('Student ' + this.studentOsCislo + ' nebyl nalezen');
    });
  }

}
