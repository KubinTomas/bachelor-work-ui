import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSignedPeopleComponent } from './action-signed-people.component';

describe('ActionSignedPeopleComponent', () => {
  let component: ActionSignedPeopleComponent;
  let fixture: ComponentFixture<ActionSignedPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionSignedPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSignedPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
