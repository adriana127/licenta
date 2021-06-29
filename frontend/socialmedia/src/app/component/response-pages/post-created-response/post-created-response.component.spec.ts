import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreatedResponseComponent } from './post-created-response.component';

describe('PostCreatedResponseComponent', () => {
  let component: PostCreatedResponseComponent;
  let fixture: ComponentFixture<PostCreatedResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCreatedResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreatedResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
