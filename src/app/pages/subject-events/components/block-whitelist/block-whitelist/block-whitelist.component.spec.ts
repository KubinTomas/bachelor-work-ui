import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockWhitelistComponent } from './block-whitelist.component';

describe('BlockWhitelistComponent', () => {
  let component: BlockWhitelistComponent;
  let fixture: ComponentFixture<BlockWhitelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockWhitelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockWhitelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
