import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreathingExerciseComponent } from './breathing-exercise.component';

describe('BreathingExerciseComponent', () => {
  let component: BreathingExerciseComponent;
  let fixture: ComponentFixture<BreathingExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreathingExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreathingExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});