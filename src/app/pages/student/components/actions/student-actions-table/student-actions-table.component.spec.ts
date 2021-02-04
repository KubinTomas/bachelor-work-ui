import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentActionsTableComponent } from './student-actions-table.component';

describe('StudentActionsTableComponent', () => {
  let component: StudentActionsTableComponent;
  let fixture: ComponentFixture<StudentActionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentActionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentActionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
