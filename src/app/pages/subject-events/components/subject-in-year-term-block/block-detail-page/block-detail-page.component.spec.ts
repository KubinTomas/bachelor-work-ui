import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDetailPageComponent } from './block-detail-page.component';

describe('BlockDetailPageComponent', () => {
  let component: BlockDetailPageComponent;
  let fixture: ComponentFixture<BlockDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
