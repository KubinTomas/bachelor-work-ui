import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectInYearTermDetailPageComponent } from './subject-in-year-term-detail-page.component';

describe('SubjectInYearTermDetailPageComponent', () => {
  let component: SubjectInYearTermDetailPageComponent;
  let fixture: ComponentFixture<SubjectInYearTermDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectInYearTermDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectInYearTermDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
