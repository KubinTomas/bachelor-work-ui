import { Component, Input, OnInit } from '@angular/core';
import { SubjectModel } from 'src/app/core/models/subject/subject.model';

@Component({
  selector: 'app-subject-list-single',
  templateUrl: './subject-list-single.component.html',
  styleUrls: ['./subject-list-single.component.scss']
})
export class SubjectListSingleComponent implements OnInit {

  @Input() subject: SubjectModel;

  constructor() { }

  ngOnInit(): void {
  }

}
