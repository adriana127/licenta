import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowDetailsComponent } from './follow-details.component';

describe('FollowDetailsComponent', () => {
  let component: FollowDetailsComponent;
  let fixture: ComponentFixture<FollowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
