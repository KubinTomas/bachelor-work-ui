import { Component, OnInit } from '@angular/core';
import { SubjectModel } from 'src/app/core/models/subject/subject.model';
import { SubjectService } from 'src/app/core/services/subject/subject.service';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.scss']
})
export class SubjectPageComponent implements OnInit {

  subjects: SubjectModel[] = [];
  dataLoading = true;

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.subjectService.get().subscribe(res => {
      this.subjects = res;
      this.dataLoading = false;
    });
  }

}
