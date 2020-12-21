import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectListSingleComponent } from './subject-list-single.component';

describe('SubjectListSingleComponent', () => {
  let component: SubjectListSingleComponent;
  let fixture: ComponentFixture<SubjectListSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectListSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectListSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
