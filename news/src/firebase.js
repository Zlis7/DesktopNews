import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

export const app = initializeApp({
  apiKey: 'AIzaSyDJrIzwUd7FIeCGGDRPUup-2kFgBK3At6o',
  authDomain: 'desktopnews-f7f75.firebaseapp.com',
  databaseURL: 'https://desktopnews-f7f75-default-rtdb.firebaseio.com',
  projectId: 'desktopnews-f7f75',
  storageBucket: 'desktopnews-f7f75.firebasestorage.app',
  messagingSenderId: '428006552543',
  appId: '1:428006552543:web:58c38b20f6980e38efca6a'
});

export const auth = getAuth(app);
export const database = getDatabase(app);