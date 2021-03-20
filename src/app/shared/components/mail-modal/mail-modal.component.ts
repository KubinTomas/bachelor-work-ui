import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { tinyMceApiKey } from 'src/app/core/models/constants';
import { Mail } from 'src/app/core/models/others/mail.model';
import { PersonMailTo } from 'src/app/core/models/others/person-mail-to.model';
import { BlockActionModel } from 'src/app/core/models/subject/block-action.model';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { ActionService } from 'src/app/core/services/subject/action.service';
import { DateService } from 'src/app/core/services/utils/date.service';

@Component({
  selector: 'app-mail-modal',
  templateUrl: './mail-modal.component.html',
  styleUrls: ['./mail-modal.component.scss']
})
export class MailModalComponent implements OnInit {

  tinyMceApiKey = tinyMceApiKey;
  // attendance id or  queue id
  listOfSelectedEntryId: PersonMailTo[] = [];
  mailOptions: PersonMailTo[] = [];

  visible = false;
  isLoading = false;

  subject = '';
  tinyMceContent = '';
  actionId: number;

  constructor(
    private actionService: ActionService,
    private notificationToastrService: NotificationToastrService,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
  }



  open(options: PersonMailTo[], action: BlockActionModel): void {
    this.actionId = action.id;

    console.log(action);
    this.tinyMceContent = 'Akce, ' + action.name + ', konající se ' + this.dateService.getDateFormatV1(new Date(action.startDate));
    // + this.datePipe.transform(action.startDate, 'd.M.yyyy HH:mm')
    this.isLoading = false;

    this.mailOptions = [...options];
    this.listOfSelectedEntryId = [...options];

    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }


  onOk(): void {
    // send mail
    const mailModel = new Mail(this.actionId, this.listOfSelectedEntryId.map(c => c.dbEntryId), this.tinyMceContent, this.subject, true);

    this.isLoading = true;
    this.actionService.sendMail(mailModel).subscribe(() => {
      this.notificationToastrService.showSuccess('Email odeslán');
      this.close();
    }, (error) => {
      this.isLoading = false;
    });
  }
}
