import { Component, Input, OnInit } from '@angular/core';
import { ActionPersonModel } from 'src/app/core/models/persons/action-person.model';

@Component({
  selector: 'app-action-queue-signed-people',
  templateUrl: './action-queue-signed-people.component.html',
  styleUrls: ['./action-queue-signed-people.component.scss']
})
export class ActionQueueSignedPeopleComponent implements OnInit {

  @Input() people: ActionPersonModel[];

  constructor() { }

  ngOnInit(): void {
  }

  kickUser(id: number): void {

  }

}
