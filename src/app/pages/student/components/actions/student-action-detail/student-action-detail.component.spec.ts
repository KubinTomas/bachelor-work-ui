import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentActionDetailComponent } from './student-action-detail.component';

describe('StudentActionDetailComponent', () => {
  let component: StudentActionDetailComponent;
  let fixture: ComponentFixture<StudentActionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentActionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentActionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
