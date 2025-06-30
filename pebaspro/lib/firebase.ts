// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCEufMrTiuc-8yP2XONLT9FqNaOI13Oz9s',
  authDomain: 'pebaspro-web.firebaseapp.com',
  projectId: 'pebaspro-web',
  storageBucket: 'pebaspro-web.firebasestorage.app',
  messagingSenderId: '956587567375',
  appId: '1:956587567375:web:3571ca250bc6772dbdb67a',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
