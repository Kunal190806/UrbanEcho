
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Attraction } from '@/lib/data';

const SAVED_PLACES_KEY = 'saved-city-places';

export function useSavedPlaces() {
  const [savedPlaces, setSavedPlaces] = useState<Attraction[]>([]);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(SAVED_PLACES_KEY);
      if (item) {
        setSavedPlaces(JSON.parse(item));
      }
    } catch (error) {
      console.warn(
        `Error reading localStorage key “${SAVED_PLACES_KEY}”:`,
        error
      );
    }
  }, []);

  const isSaved = useCallback(
    (id: string) => {
      return savedPlaces.some((p) => p.id === id);
    },
    [savedPlaces]
  );

  const toggleSave = useCallback(
    (attraction: Attraction) => {
      const currentlySaved = isSaved(attraction.id);
      let updatedPlaces;

      if (currentlySaved) {
        updatedPlaces = savedPlaces.filter((p) => p.id !== attraction.id);
      } else {
        updatedPlaces = [...savedPlaces, attraction];
      }

      setSavedPlaces(updatedPlaces);
      try {
        window.localStorage.setItem(
          SAVED_PLACES_KEY,
          JSON.stringify(updatedPlaces)
        );
      } catch (error) {
        console.warn(
          `Error setting localStorage key “${SAVED_PLACES_KEY}”:`,
          error
        );
      }
    },
    [savedPlaces, isSaved]
  );

  return { savedPlaces, toggleSave, isSaved };
}
