import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockAssignedStudentsTableComponent } from './block-assigned-students-table.component';

describe('BlockAssignedStudentsTableComponent', () => {
  let component: BlockAssignedStudentsTableComponent;
  let fixture: ComponentFixture<BlockAssignedStudentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockAssignedStudentsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockAssignedStudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
