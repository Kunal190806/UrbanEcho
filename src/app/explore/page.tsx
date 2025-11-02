
'use client';

import { useState } from 'react';
import { ExploreHeader } from './explore-header';
import { ExploreCard } from './explore-card';
import { SavedPlaces } from './saved-places';
import { topAttractions, type Attraction } from '@/lib/data';
import { useSavedPlaces } from '@/hooks/use-saved-places';

export default function ExplorePage() {
  const [attractions, setAttractions] = useState<Attraction[]>(topAttractions);
  const { savedPlaces, toggleSave, isSaved } = useSavedPlaces();

  const handleSearch = (city: string) => {
    // In a real app, you would fetch data for the searched city.
    // For now, we'll just log it and show the default attractions.
    console.log(`Searching for attractions in: ${city}`);
    // You could potentially filter or fetch new `topAttractions` here.
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      <ExploreHeader onSearch={handleSearch} />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="grid gap-6 md:grid-cols-2">
            {attractions.map((attraction) => (
              <ExploreCard
                key={attraction.id}
                attraction={attraction}
                isSaved={isSaved(attraction.id)}
                onToggleSave={() => toggleSave(attraction)}
              />
            ))}
          </div>
        </div>
        <div>
          <SavedPlaces savedPlaces={savedPlaces} onToggleSave={toggleSave} />
        </div>
      </div>
    </div>
  );
}
