import { Component, ViewChild, ElementRef } from '@angular/core';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})

export class RecordComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  constructor(private audioService: AudioService) {}

  startRecording() {
    this.audioService.startRecording();
  }

  async stopRecording() {
    const audioBlob = await this.audioService.stopRecording();
    const audioURL = URL.createObjectURL(audioBlob);
    this.audioPlayer.nativeElement.src = audioURL;
 }

  recognition: any;
  transcript: string = '';
  uniqueSentences: Set<string> = new Set();

  startSpeechRecognition() {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true;
    this.recognition.continuos = true;
    this.recognition.start()
    this.recognition.onresult = (event: any) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) { // ✅ Only take finalized speech
          let newText = event.results[i][0].transcript.trim();
          
          // ✅ Avoid duplication by checking the Set
          if (!this.uniqueSentences.has(newText)) {
            this.uniqueSentences.add(newText);
            finalTranscript += ' ' + newText;
          }
        }
      }

      this.transcript += finalTranscript; // ✅ Append only new unique sentences
      console.log('Recognized text:', this.transcript);
    };

    this.recognition.onspeechend = () => {
      console.log('Speech ended. Restarting recognition...');
      setTimeout(() => this.recognition.start(), 200);
    };

  }

  stopSpeechRecognition() {
    if (this.recognition) {
      this.recognition.onend = null; // Prevent auto-restart on stop
      this.recognition.stop();
      this.recognition = null;
      console.log('Speech recognition stopped manually.');
    }
  }

}