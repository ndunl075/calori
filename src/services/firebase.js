// Firebase SDK Integration for Calori Cloud Persistence
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Replace with your Firebase Project Config credentials (from Firebase Console)
// Or define them in a .env file as VITE_FIREBASE_API_KEY, etc.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "calori-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "calori-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "calori-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

let app = null;
let db = null;

// Initialize Firebase if valid API key is present
try {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("🔥 Firebase initialized successfully!");
  } else {
    console.log("ℹ️ Firebase credentials not set yet. App running in resilient Local & Session Cloud mode.");
  }
} catch (err) {
  console.warn("Firebase initialization skipped:", err.message);
}

// Push user logs directly to Firebase Firestore cloud database
export const saveUserLogsToFirebase = async (sessionId, logs, targets) => {
  if (!db) return { success: false, mode: 'local' };

  try {
    const docRef = doc(db, "users", sessionId);
    await setDoc(docRef, {
      sessionId,
      logs,
      targets,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return { success: true, mode: 'firebase' };
  } catch (err) {
    console.error("Firebase save error:", err);
    return { success: false, error: err.message };
  }
};

// Fetch user logs directly from Firebase Firestore cloud database
export const loadUserLogsFromFirebase = async (sessionId) => {
  if (!db) return null;

  try {
    const docRef = doc(db, "users", sessionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (err) {
    console.error("Firebase load error:", err);
    return null;
  }
};

export { app, db };
