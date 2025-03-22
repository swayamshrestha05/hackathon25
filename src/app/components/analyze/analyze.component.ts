import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms'; // For ngModel
import { CommonModule } from '@angular/common'; // For *ngIf

@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './analyze.component.html',
  styleUrl: './analyze.component.css'
})
export class AnalyzeComponent {
  userText: string = '';
  result: any = null;

  constructor(private apiService: ApiService) {}

  
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
