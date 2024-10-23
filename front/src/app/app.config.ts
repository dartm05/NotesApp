import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync("noop"),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "tasks-app-b53c1",
        appId: "1:837347397183:web:7459af4a625032b543b28a",
        storageBucket: "tasks-app-b53c1.appspot.com",
        apiKey: "AIzaSyBVKECxc5lOkJLBl_Siv7MjBY7TiwFMeu0",
        authDomain: "tasks-app-b53c1.firebaseapp.com",
        messagingSenderId: "837347397183",
        measurementId: "G-TYQ8Z7H17C",
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
  ],
};
