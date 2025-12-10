// Firebase modular SDK (v9+) initialization
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiCNX5d7p-ZhGsHp61QBzrUlve_ecmJNs",
  authDomain: "xveraiot.firebaseapp.com",
  projectId: "xveraiot",
  storageBucket: "xveraiot.firebasestorage.app",
  messagingSenderId: "618199670436",
  appId: "1:618199670436:web:8da9ec7ae9a5d5b3405031"
};

// Initialize Firebase app (avoid re-initializing)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Create and export the Auth instance using the modular API
const auth = getAuth(app);

export { auth, app };