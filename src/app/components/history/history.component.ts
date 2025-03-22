import { Component, effect, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule or DatePipe
import { TranscriptServiceService } from '../../services/transcript-service.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule], // Or [DatePipe]
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  private transcriptService = inject(TranscriptServiceService);
  transcripts = toSignal(this.transcriptService.getTranscripts(), { initialValue: [] });

  constructor() {
    effect(() => {
      console.log('Fetched transcripts:', this.transcripts());
    });
  }
}