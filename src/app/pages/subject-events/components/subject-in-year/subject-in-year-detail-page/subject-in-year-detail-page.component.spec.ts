import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectInYearDetailPageComponent } from './subject-in-year-detail-page.component';

describe('SubjectInYearDetailPageComponent', () => {
  let component: SubjectInYearDetailPageComponent;
  let fixture: ComponentFixture<SubjectInYearDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectInYearDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectInYearDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
