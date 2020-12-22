import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeIn } from 'src/app/core/animations/fade-in.animation';
import { SubjectModel } from 'src/app/core/models/subject/subject.model';
import { SubjectService } from 'src/app/core/services/subject/subject.service';

@Component({
  selector: 'app-subject-detail-page',
  templateUrl: './subject-detail-page.component.html',
  styleUrls: ['./subject-detail-page.component.scss'],
  animations: [fadeIn]
})
export class SubjectDetailPageComponent implements OnInit {

  subject: SubjectModel;
  subjectInYearDataLoading = true;

  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      const subjectId = params.subjectId;

      this.getSubject(subjectId);
    });
  }

  ngOnInit(): void {
  }

  getSubject(subjectId: number): void {
    this.subjectService.getSingle(subjectId).subscribe(res => {
      this.subject = res;
    });
  }

}
