import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFailedComponent } from './signup-failed.component';

describe('SignupFailedComponent', () => {
  let component: SignupFailedComponent;
  let fixture: ComponentFixture<SignupFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupFailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
