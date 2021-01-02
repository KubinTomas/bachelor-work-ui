import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermStagConnectionFormComponent } from './term-stag-connection-form.component';

describe('TermStagConnectionFormComponent', () => {
  let component: TermStagConnectionFormComponent;
  let fixture: ComponentFixture<TermStagConnectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermStagConnectionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermStagConnectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
