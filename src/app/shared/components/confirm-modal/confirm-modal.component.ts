import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Output() modalClose: EventEmitter<boolean> = new EventEmitter();

  public isVisible = false;

  header: string;
  body: string;
  okBtnText: string;
  cancelBtnText: string;

  constructor() { }

  ngOnInit(): void {
  }


  showModal(header: string, body: string, okBtnText: string = 'Ano', cancelBtnText: string = 'Ne'): void {
    this.header = header;
    this.body = body;
    this.okBtnText = okBtnText;
    this.cancelBtnText = cancelBtnText;

    this.isVisible = true;
  }

  closeModal(result: boolean): void {
    this.modalClose.emit(true);
    this.isVisible = false;
  }

  handleOk(): void {
    this.closeModal(true);
  }

  handleCancel(): void {
    this.closeModal(false);
  }
}
