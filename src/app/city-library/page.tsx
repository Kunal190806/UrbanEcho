
'use client';

import { useState } from 'react';
import { CityLibraryHeader } from '@/components/city-library/city-library-header';
import { CityLibraryCard } from '@/components/city-library/city-library-card';
import { SavedPlaces } from '@/components/city-library/saved-places';
import { topAttractions, type Attraction } from '@/lib/data';
import { useSavedPlaces } from '@/hooks/use-saved-places';

export default function CityLibraryPage() {
  const [attractions, setAttractions] = useState<Attraction[]>(topAttractions.filter(attraction => attraction.city.toLowerCase() === 'delhi'));
  const { savedPlaces, toggleSave, isSaved } = useSavedPlaces();

  const handleSearch = (city: string) => {
    if (!city) {
      setAttractions(topAttractions.filter(attraction => attraction.city.toLowerCase() === 'delhi'));
      return;
    }

    const lowercasedCity = city.toLowerCase();
    const filteredAttractions = topAttractions.filter(
      (attraction) => attraction.city.toLowerCase() === lowercasedCity
    );
    setAttractions(filteredAttractions);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      <CityLibraryHeader onSearch={handleSearch} />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="grid gap-6 md:grid-cols-2">
            {attractions.length > 0 ? (
              attractions.map((attraction) => (
                <CityLibraryCard
                  key={attraction.id}
                  attraction={attraction}
                  isSaved={isSaved(attraction.id)}
                  onToggleSave={() => toggleSave(attraction)}
                />
              ))
            ) : (
              <div className="md:col-span-2 text-center text-muted-foreground py-12">
                <p className="text-lg">No attractions found for your search.</p>
                <p>Try searching for "Delhi" or "Mumbai" to see some examples.</p>
              </div>
            )}
          </div>
        </div>
        <div>
          <SavedPlaces savedPlaces={savedPlaces} onToggleSave={toggleSave} />
        </div>
      </div>
    </div>
  );
}
