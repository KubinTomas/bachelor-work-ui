import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActionLinkComponent } from './add-action-link.component';

describe('AddActionLinkComponent', () => {
  let component: AddActionLinkComponent;
  let fixture: ComponentFixture<AddActionLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActionLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActionLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
