import { Component } from '@angular/core';
import { TextToSpeechService } from '../../services/text-to-speech.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  imports: [FormsModule],
  styleUrls: ['./text-to-speech.component.css']
})
export class TextToSpeechComponent {
  textToSpeak: string = '';

  constructor(private textToSpeechService: TextToSpeechService) {}

  speak(): void {
    if (this.textToSpeak.trim()) {
      this.textToSpeechService.speak(this.textToSpeak);
    }
  }

  onStop(): void {
    this.textToSpeechService.stop();
  }
}


