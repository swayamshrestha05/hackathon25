import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { AnalyzeComponent } from '../analyze/analyze.component';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms'; // For ngModel
import { CommonModule } from '@angular/common'; // For *ngIf
import { TranscriptServiceService } from '../../services/transcript-service.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  imports: [AnalyzeComponent, FormsModule, CommonModule,],
  styleUrls: ['./record.component.css']
})

export class RecordComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  constructor(private audioService: AudioService, private apiService: ApiService, ) {}
  // analyzeComponent: AnalyzeComponent = inject(AnalyzeComponent);
  transcriptService: TranscriptServiceService = inject(TranscriptServiceService);
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
      // this.analyzeComponent.analyzeText(this.transcript);
      this.analyzeText(this.transcript);
      // this.transcriptService.uploadTranscript(this.transcript);
      this.recognition.onend = null; // Prevent auto-restart on stop
      this.recognition.stop();
      this.recognition = null;
      console.log('Speech recognition stopped manually.');
    }
  }

  userText: string = '';
  result: any = null;

  analyzeText(transcript: string) {
    console.log('Sending text to API:', transcript);
    this.apiService.analyzeText(transcript).subscribe(
      (response: string | any[]) => {
        console.log('API response:', response);


        if (Array.isArray(response) && response.length > 0) {
          this.result = {
            emotion: response[0].label,
            score: response[0].score,
          };
        this.transcriptService.uploadTranscript(this.transcript, this.result.emotion);

        } else {
          console.error('Unexpected API response format:', response);
        }
      },
      (error: any) => {
        console.error('Error analyzing text:', error); // Handle errors
      }
    );
  }

}


