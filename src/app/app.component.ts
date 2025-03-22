import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecordComponent } from './components/record/record.component';
import { FormsModule } from '@angular/forms'; // For ngModel
import { CommonModule } from '@angular/common'; // For *ngIf
import { ApiService } from './services/api.service'; // Your API service
import { AnalyzeComponent } from './components/analyze/analyze.component';
import { TextToSpeechComponent } from "./components/text-to-speech/text-to-speech.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, RecordComponent, FormsModule, CommonModule, AnalyzeComponent, TextToSpeechComponent], // Add FormsModule and CommonModule

  styleUrls: ['./app.component.css'],
})
export class AppComponent {

}