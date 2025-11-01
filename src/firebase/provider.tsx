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
  onAuthStateChanged,
  type Auth,
  type User,
} from "firebase/auth";

import firebaseConfig from "./config";

type FirebaseContextType = {
  app: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
  user: User | null;
  isLoading: boolean;
};

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [firestore, setFirestore] = useState<Firestore | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

    const unsubscribe = onAuthStateChanged(
      authInstance,
      (user) => {
        setUser(user);
        setIsLoading(false);
      },
      (error) => {
        console.error("Auth state change error:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const value = { app, firestore, auth, user, isLoading };

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
export const useUser = () => {
    const { user, isLoading } = useFirebase();
    return { user, isLoading };
};

export const useCollection = (query: any) => {
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore || !query) {
        setData([]);
        setIsLoading(false);
        return;
    };
    
    const { onSnapshot } = require("firebase/firestore");
    
    const unsubscribe = onSnapshot(query, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(docs);
      setIsLoading(false);
    }, (err) => {
      setError(err);
      setIsLoading(false);
      console.error(err);
    });

    return () => unsubscribe();
  }, [firestore, query]);

  return { data, isLoading, error };
};
