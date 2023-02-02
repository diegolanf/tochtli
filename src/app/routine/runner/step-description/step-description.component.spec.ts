import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDescriptionComponent } from './step-description.component';

describe('StepDescriptionComponent', () => {
  let component: StepDescriptionComponent;
  let fixture: ComponentFixture<StepDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
