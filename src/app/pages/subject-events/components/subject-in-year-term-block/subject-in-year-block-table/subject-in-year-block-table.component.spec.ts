import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectInYearBlockTableComponent } from './subject-in-year-block-table.component';

describe('SubjectInYearBlockTableComponent', () => {
  let component: SubjectInYearBlockTableComponent;
  let fixture: ComponentFixture<SubjectInYearBlockTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectInYearBlockTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectInYearBlockTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
