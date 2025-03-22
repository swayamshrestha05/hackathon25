import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), provideFirebaseApp(() => initializeApp({ projectId: "moodapp-d92f4", appId: "1:86749189722:web:90400159b2e18a213cea63", storageBucket: "moodapp-d92f4.firebasestorage.app", apiKey: "AIzaSyCm-3R395CyBzyZMFfgWek_bBrAZgRGakQ", authDomain: "moodapp-d92f4.firebaseapp.com", messagingSenderId: "86749189722", measurementId: "G-ZCWW994B6B" })), provideFirestore(() => getFirestore()), // Configure HttpClient here
  ],
}).catch((err) => console.error(err));