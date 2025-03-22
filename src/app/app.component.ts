import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecordComponent } from './components/record/record.component';
import { FormsModule } from '@angular/forms'; // For ngModel
import { CommonModule } from '@angular/common'; // For *ngIf
import { ApiService } from './services/api.service';
import { TextToSpeechComponent } from "./components/text-to-speech/text-to-speech.component"; // Your API service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, RecordComponent, FormsModule, CommonModule, TextToSpeechComponent], // Add FormsModule and CommonModule

  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userText: string = ''; // Holds the user's input
  result: any = null; // Holds the API response

  constructor(private apiService: ApiService) {}

  // Function to call the API and analyze the text
  analyzeText() {
    console.log('Sending text to API:', this.userText); // Debug log
    this.apiService.analyzeText(this.userText).subscribe(
      (response) => {
        console.log('API response:', response); // Debug log

        // Extract the first item from the array
        if (Array.isArray(response) && response.length > 0) {
          this.result = {
            emotion: response[0].label, // Use "label" as "emotion"
            score: response[0].score, // Use "score" as is
          };
        } else {
          console.error('Unexpected API response format:', response);
        }
      },
      (error) => {
        console.error('Error analyzing text:', error); // Handle errors
      }
    );
  }
}