import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectInYearTermFormComponent } from './subject-in-year-term-form.component';

describe('SubjectInYearTermFormComponent', () => {
  let component: SubjectInYearTermFormComponent;
  let fixture: ComponentFixture<SubjectInYearTermFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectInYearTermFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectInYearTermFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
