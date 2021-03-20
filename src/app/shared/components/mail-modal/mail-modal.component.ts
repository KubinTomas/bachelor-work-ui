import { Component, OnInit } from '@angular/core';
import { PersonMailTo } from 'src/app/core/models/others/person-mail-to.model';

@Component({
  selector: 'app-mail-modal',
  templateUrl: './mail-modal.component.html',
  styleUrls: ['./mail-modal.component.scss']
})
export class MailModalComponent implements OnInit {

  // attendance id or  queue id
  listOfSelectedEntryId: PersonMailTo[] = [];
  mailOptions: PersonMailTo[] = [];

  visible = false;
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

  open(options: PersonMailTo[]): void {
    this.mailOptions = [...options];
    this.listOfSelectedEntryId = [...options];

    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }


  onOk(): void {
    // send mail

    this.close();
  }
}
