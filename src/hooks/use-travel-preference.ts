"use client";

import { useState, useEffect, useCallback } from "react";

export type TravelPreference = "public" | "ev" | "fossil";

const PREFERENCE_KEY = "travel-preference";

export function useTravelPreference() {
  // We initialize with `null` to represent the "not yet loaded" state.
  const [preference, setPreference] = useState<TravelPreference | null | undefined>(undefined);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(PREFERENCE_KEY);
      if (item) {
        setPreference(item as TravelPreference);
      } else {
        setPreference(null); // Explicitly set to null if no preference is stored
      }
    } catch (error) {
      console.warn(`Error reading localStorage key “${PREFERENCE_KEY}”:`, error);
      setPreference(null);
    }
  }, []);

  const setStoredPreference = useCallback((newPreference: TravelPreference) => {
    try {
      window.localStorage.setItem(PREFERENCE_KEY, newPreference);
      setPreference(newPreference);
    } catch (error) {
      console.warn(`Error setting localStorage key “${PREFERENCE_KEY}”:`, error);
    }
  }, []);

  return { preference, setPreference: setStoredPreference };
}
