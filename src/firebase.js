// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB7NKBmdhLkit_gfx18Apb3mY8sxwoJcrk",
    authDomain: "olympic-game-app.firebaseapp.com",
    projectId: "olympic-game-app",
    storageBucket: "olympic-game-app.appspot.com",
    messagingSenderId: "833031452286",
    appId: "1:833031452286:web:414c4fea44bebbf6a64a2f",
    measurementId: "G-QZLWR1WTTQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
