import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentModel } from 'src/app/core/models/persons/student.model';
import { BlockActionModel } from 'src/app/core/models/subject/block-action.model';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { ActionService } from 'src/app/core/services/subject/action.service';
import { ActionSignedPeopleComponent } from '../action-signed-people/action-signed-people.component';
import { AddActionParticipantModalComponent } from '../add-action-participant-modal/add-action-participant-modal.component';

@Component({
  selector: 'app-block-action-detail',
  templateUrl: './block-action-detail.component.html',
  styleUrls: ['./block-action-detail.component.scss']
})
export class BlockActionDetailComponent {

  @ViewChild(AddActionParticipantModalComponent) addParticipantModal: AddActionParticipantModalComponent;
  @ViewChild(ActionSignedPeopleComponent) actionSignedPeopleComponent: ActionSignedPeopleComponent;

  action: BlockActionModel;
  actionJoinQueue: BlockActionModel;

  loaded = false;

  constructor(
    private route: ActivatedRoute,
    private actionService: ActionService,
    private notificationToastrService: NotificationToastrService,
    private cdr: ChangeDetectorRef
  ) {

    this.route.params.subscribe(params => {
      this.loaded = false;
      this.action = null;

      const actionId = params.actionId;

      if (actionId != null) {
        this.getAction(actionId);
      }

    });

  }

  reloadAction(): void {
    this.getAction(this.action.id);
  }

  getAction(actionId: number): void {
    this.actionService.getSingle(actionId).subscribe(action => {
      this.action = action;
      this.loaded = true;
    }, (error) => {
      this.loaded = true;
      this.notificationToastrService.showError('Akce neexistuje a nebo k ní nemáte přístup', '', 3000);
    });
  }

  onAddParticipantClick(): void {
    this.addParticipantModal.openModal(this.action.id);
  }

  addParticipant(student: StudentModel): void {
    this.addParticipantModal.processing = true;
    this.actionService.addStudent(student).subscribe(res => {

      this.action.signedUsers.push(res);

      this.action.signedUsers = [...this.action.signedUsers];

      this.notificationToastrService.showSuccess('Student byl přidán do akce', '', 3000);

      this.addParticipantModal.closeModal();

    }, (error) => {
      if (error && error.error) {
        this.notificationToastrService.showError(error.error, '', 3000);
      }
      this.addParticipantModal.processing = false;

    });
  }

}
