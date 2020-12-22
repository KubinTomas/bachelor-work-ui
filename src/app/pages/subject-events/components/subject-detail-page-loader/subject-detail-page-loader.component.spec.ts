import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDetailPageLoaderComponent } from './subject-detail-page-loader.component';

describe('SubjectDetailPageLoaderComponent', () => {
  let component: SubjectDetailPageLoaderComponent;
  let fixture: ComponentFixture<SubjectDetailPageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectDetailPageLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDetailPageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
