import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskDeleteResponseComponent } from './ask-delete-response.component';

describe('AskDeleteResponseComponent', () => {
  let component: AskDeleteResponseComponent;
  let fixture: ComponentFixture<AskDeleteResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskDeleteResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskDeleteResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
