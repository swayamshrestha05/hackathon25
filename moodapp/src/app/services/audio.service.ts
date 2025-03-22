import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AudioService {
  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];
  
  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      console.log("Microphone access granted!");
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };
    })
    .catch(err => {
      console.error("Microphone access denied! womp womp", err);
    });
  }

  stopRecording(): Promise<Blob> {
    return new Promise(resolve => {
      this.mediaRecorder.stop();
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        resolve(audioBlob);
      };
   });
  }
}