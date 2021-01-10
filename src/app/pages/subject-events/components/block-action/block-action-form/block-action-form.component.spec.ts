import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockActionFormComponent } from './block-action-form.component';

describe('BlockActionFormComponent', () => {
  let component: BlockActionFormComponent;
  let fixture: ComponentFixture<BlockActionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockActionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
