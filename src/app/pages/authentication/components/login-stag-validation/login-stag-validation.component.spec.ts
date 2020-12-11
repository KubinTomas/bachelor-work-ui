import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStagValidationComponent } from './login-stag-validation.component';

describe('LoginStagValidationComponent', () => {
  let component: LoginStagValidationComponent;
  let fixture: ComponentFixture<LoginStagValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginStagValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStagValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
