import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermStagConnectionTableComponent } from './term-stag-connection-table.component';

describe('TermStagConnectionTableComponent', () => {
  let component: TermStagConnectionTableComponent;
  let fixture: ComponentFixture<TermStagConnectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermStagConnectionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermStagConnectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
