import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-breathing-exercise',
  templateUrl: './breathing-exercise.component.html',
  styleUrls: ['./breathing-exercise.component.css'],
  imports: [NgClass]
})
export class BreathingExerciseComponent implements OnInit, OnDestroy {
  timeLeft: number = 120; // 2 minutes in seconds
  formattedTime: string = '02:00';
  isInhaling: boolean = true;
  isHoldingExpanded: boolean = false;
  isExhaling: boolean = false;
  isHoldingReduced: boolean = false;
  private interval: any;
  private breathingInterval: any;
  private breathingPhaseDuration: number = 4; // 4 seconds for each phase

  ngOnInit(): void {
    this.startTimer();
    this.startBreathingCycle();
  }

  ngOnDestroy(): void {
    this.stopTimer();
    this.stopBreathingCycle();
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.formattedTime = this.formatTime(this.timeLeft);
      } else {
        this.stopTimer();
        this.stopBreathingCycle();
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startBreathingCycle(): void {
    this.breathingInterval = setInterval(() => {
      if (this.isInhaling) {
        this.isInhaling = false;
        this.isHoldingExpanded = true;
      } else if (this.isHoldingExpanded) {
        this.isHoldingExpanded = false;
        this.isExhaling = true;
      } else if (this.isExhaling) {
        this.isExhaling = false;
        this.isHoldingReduced = true;
      } else if (this.isHoldingReduced) {
        this.isHoldingReduced = false;
        this.isInhaling = true;
      }
    }, this.breathingPhaseDuration * 1000); // Update every 4 seconds
  }

  stopBreathingCycle(): void {
    if (this.breathingInterval) {
      clearInterval(this.breathingInterval);
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${this.padTime(minutes)}:${this.padTime(secs)}`;
  }

  padTime(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}