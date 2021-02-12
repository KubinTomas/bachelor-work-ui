import { Component, Input, OnInit } from '@angular/core';
import { ActionPersonModel } from 'src/app/core/models/persons/action-person.model';

@Component({
  selector: 'app-action-signed-people',
  templateUrl: './action-signed-people.component.html',
  styleUrls: ['./action-signed-people.component.scss']
})
export class ActionSignedPeopleComponent implements OnInit {

  @Input() people: ActionPersonModel[];

  constructor() { }

  ngOnInit(): void {
  }

  setAttendanceFulfilled(attendanceId: boolean, fulfilled: boolean): void {
    console.log("asdasd");
  }
}
