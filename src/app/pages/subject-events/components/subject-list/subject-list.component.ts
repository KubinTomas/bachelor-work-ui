import { Component, Input, OnInit } from '@angular/core';
import { SubjectModel } from 'src/app/core/models/subject/subject.model';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectsListComponent implements OnInit {

  @Input() subjects: SubjectModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
