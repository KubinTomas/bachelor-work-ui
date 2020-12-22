import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectInYearBlockFormComponent } from './subject-in-year-block-form.component';

describe('SubjectInYearBlockFormComponent', () => {
  let component: SubjectInYearBlockFormComponent;
  let fixture: ComponentFixture<SubjectInYearBlockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectInYearBlockFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectInYearBlockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
