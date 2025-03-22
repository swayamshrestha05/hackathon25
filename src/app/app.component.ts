import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecordComponent } from './components/record/record.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'moodapp';
}
