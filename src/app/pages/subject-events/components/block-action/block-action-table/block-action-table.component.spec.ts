import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockActionTableComponent } from './block-action-table.component';

describe('BlockActionTableComponent', () => {
  let component: BlockActionTableComponent;
  let fixture: ComponentFixture<BlockActionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockActionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockActionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
