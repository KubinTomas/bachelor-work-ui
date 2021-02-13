import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockActionModel } from 'src/app/core/models/subject/block-action.model';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { ActionService } from 'src/app/core/services/subject/action.service';
import { AddActionParticipantModalComponent } from '../add-action-participant-modal/add-action-participant-modal.component';

@Component({
  selector: 'app-block-action-detail',
  templateUrl: './block-action-detail.component.html',
  styleUrls: ['./block-action-detail.component.scss']
})
export class BlockActionDetailComponent {

  @ViewChild(AddActionParticipantModalComponent) addParticipantModal: AddActionParticipantModalComponent;

  action: BlockActionModel;
  actionJoinQueue: BlockActionModel;

  loaded = false;

  constructor(
    private route: ActivatedRoute,
    private actionService: ActionService,
    private notificationToastrService: NotificationToastrService
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
      console.log(this.action);
    }, (error) => {
      this.loaded = true;
      this.notificationToastrService.showError('Akce neexistuje a nebo k ní nemáte přístup', '', 3000);
    });
  }

  onAddParticipantClick(): void {
    this.addParticipantModal.openModal(this.action.id);
  }


}
