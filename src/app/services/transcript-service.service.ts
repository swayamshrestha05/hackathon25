import { inject, Injectable } from '@angular/core';
import { Firestore, Timestamp, collection, addDoc, orderBy, query, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranscriptServiceService {
  firestore: Firestore = inject(Firestore);

  constructor() { 
    console.log('this is transcript service')
  }

  async uploadTranscript(text: string) {
    const transcriptCollection = collection(this.firestore, 'transcripts');

    const data = {
      text: text,
      createdAt: Timestamp.now()
    };

    try {
      const docRef = await addDoc(transcriptCollection, data);
      console.log('Transcript uploaded with ID:', docRef.id);
    } catch (error) {
      console.error('Error uploading transcript:', error);
    }
  }

  getTranscripts(): Observable<any[]> {
    const transcriptCollection = collection(this.firestore, 'transcripts');
    const q = query(transcriptCollection, orderBy('createdAt', 'desc')); // Optional: Order by creation date
    return collectionData(q, { idField: 'id' }); // Include document ID in the result
  }
}
