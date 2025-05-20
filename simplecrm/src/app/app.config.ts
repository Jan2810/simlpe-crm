import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-7eb8a","appId":"1:20394669418:web:d2550f23e0317d0efc6113","storageBucket":"simple-crm-7eb8a.firebasestorage.app","apiKey":"AIzaSyAfyTNyVRkfyzHdEn5zBJVNxoLkHzU7YIk","authDomain":"simple-crm-7eb8a.firebaseapp.com","messagingSenderId":"20394669418"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
