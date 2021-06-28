import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCreatedResponseComponent } from './story-created-response.component';

describe('StoryCreatedResponseComponent', () => {
  let component: StoryCreatedResponseComponent;
  let fixture: ComponentFixture<StoryCreatedResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryCreatedResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCreatedResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
