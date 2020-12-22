import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectInYearFormComponent } from './subject-in-year-form.component';

describe('SubjectInYearFormComponent', () => {
  let component: SubjectInYearFormComponent;
  let fixture: ComponentFixture<SubjectInYearFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectInYearFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectInYearFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
