import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideFirebaseApp(() => initializeApp({ projectId: "moodapp-d92f4", appId: "1:86749189722:web:90400159b2e18a213cea63", storageBucket: "moodapp-d92f4.firebasestorage.app", apiKey: "AIzaSyCm-3R395CyBzyZMFfgWek_bBrAZgRGakQ", authDomain: "moodapp-d92f4.firebaseapp.com", messagingSenderId: "86749189722", measurementId: "G-ZCWW994B6B" })), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "moodapp-d92f4", appId: "1:86749189722:web:90400159b2e18a213cea63", storageBucket: "moodapp-d92f4.firebasestorage.app", apiKey: "AIzaSyCm-3R395CyBzyZMFfgWek_bBrAZgRGakQ", authDomain: "moodapp-d92f4.firebaseapp.com", messagingSenderId: "86749189722", measurementId: "G-ZCWW994B6B" })), provideFirestore(() => getFirestore())]
};
