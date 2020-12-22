import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectModel } from 'src/app/core/models/subject/subject.model';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements OnInit {

  @Input() subjects: SubjectModel[];
  @Input() dataLoading: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onRowClick(data: SubjectModel): void {
    this.goToSubjectDetail(data.id);
  }

  goToSubjectDetail(id: number): void {
    this.router.navigateByUrl('subjects/detail/' + id);
  }
}
