import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActionParticipantModalComponent } from './add-action-participant-modal.component';

describe('AddActionParticipantModalComponent', () => {
  let component: AddActionParticipantModalComponent;
  let fixture: ComponentFixture<AddActionParticipantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActionParticipantModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActionParticipantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
