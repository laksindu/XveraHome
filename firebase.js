// Firebase modular SDK (v9+) initialization with React Native persistence
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

// Create and export the Auth instance with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth, app };