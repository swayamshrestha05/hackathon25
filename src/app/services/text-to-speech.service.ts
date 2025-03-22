import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.loadVoices();
  }

  private loadVoices(): void {
    // When voices are loaded, store them in the voices array
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;

      // Event listener to handle when voices are loaded
      synth.onvoiceschanged = () => {
        this.voices = synth.getVoices();
      };

      // Load voices initially if they're already available
      this.voices = synth.getVoices();
    } else {
      console.error('Speech synthesis not supported in this browser.');
    }
  }

  public speak(text: string): void {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;

      // Create a new SpeechSynthesisUtterance object
      const utterance = new SpeechSynthesisUtterance(text);

      // Find a female voice with a gentle tone (you can modify the voice name here)
      const selectedVoice = this.voices.find(voice => voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman'));

      if (selectedVoice) {
        utterance.voice = selectedVoice;  // Set the selected voice
      } else {
        console.warn('No suitable voice found. Using default voice.');
      }

      // Adjust rate and pitch to make the voice sound gentler
      utterance.rate = 0.9;  // Lower rate for gentler tone
      utterance.pitch = 1.3; // Higher pitch for a softer tone

      // Speak the text
      synth.speak(utterance);
    } else {
      console.error("Text-to-speech not supported in this browser.");
    }
  }

  public stop(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

