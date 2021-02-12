import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionQueueSignedPeopleComponent } from './action-queue-signed-people.component';

describe('ActionQueueSignedPeopleComponent', () => {
  let component: ActionQueueSignedPeopleComponent;
  let fixture: ComponentFixture<ActionQueueSignedPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionQueueSignedPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionQueueSignedPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
