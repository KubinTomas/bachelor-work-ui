import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockActionDetailComponent } from './block-action-detail.component';

describe('BlockActionDetailComponent', () => {
  let component: BlockActionDetailComponent;
  let fixture: ComponentFixture<BlockActionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockActionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockActionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
