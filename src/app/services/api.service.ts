import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Provided in the root injector
})
export class ApiService {
  private apiUrl = 'http://localhost:5000'; // Replace with your Flask API URL

  constructor(private http: HttpClient) {}

  analyzeText(text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/predict`, { text });
  }
}