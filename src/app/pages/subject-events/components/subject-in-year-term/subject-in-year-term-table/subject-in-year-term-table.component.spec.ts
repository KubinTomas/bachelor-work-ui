import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectInYearTermTableComponent } from './subject-in-year-term-table.component';

describe('SubjectInYearTermTableComponent', () => {
  let component: SubjectInYearTermTableComponent;
  let fixture: ComponentFixture<SubjectInYearTermTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectInYearTermTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectInYearTermTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
