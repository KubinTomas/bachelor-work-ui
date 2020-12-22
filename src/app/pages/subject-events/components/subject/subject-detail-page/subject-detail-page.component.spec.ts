import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDetailPageComponent } from './subject-detail-page.component';

describe('SubjectDetailPageComponent', () => {
  let component: SubjectDetailPageComponent;
  let fixture: ComponentFixture<SubjectDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
