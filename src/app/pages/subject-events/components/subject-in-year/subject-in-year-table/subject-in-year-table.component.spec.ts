import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectInYearTableComponent } from './subject-in-year-table.component';

describe('SubjectInYearTableComponent', () => {
  let component: SubjectInYearTableComponent;
  let fixture: ComponentFixture<SubjectInYearTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectInYearTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectInYearTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
