"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  type Firestore,
} from "firebase/firestore";
import {
  getAuth,
  connectAuthEmulator,
  type Auth,
} from "firebase/auth";

import firebaseConfig from "./config";

type FirebaseContextType = {
  app: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
};

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [firestore, setFirestore] = useState<Firestore | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const app =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const firestoreInstance = getFirestore(app);
    const authInstance = getAuth(app);

    if (process.env.NEXT_PUBLIC_EMULATOR_HOST) {
        const host = process.env.NEXT_PUBLIC_EMULATOR_HOST;
        console.log(`Connecting to Firebase emulators on ${host}`);
        connectFirestoreEmulator(firestoreInstance, host, 8080);
        connectAuthEmulator(authInstance, `http://${host}:9099`, { disableWarnings: true });
    }

    setApp(app);
    setFirestore(firestoreInstance);
    setAuth(authInstance);

  }, []);

  const value = { app, firestore, auth };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

export const useFirebaseApp = () => useFirebase().app;
export const useFirestore = () => useFirebase().firestore;
export const useAuth = () => useFirebase().auth;