import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectEventsCalendarComponent } from './subject-events-calendar.component';

describe('SubjectEventsCalendarComponent', () => {
  let component: SubjectEventsCalendarComponent;
  let fixture: ComponentFixture<SubjectEventsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectEventsCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectEventsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
