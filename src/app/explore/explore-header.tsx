
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Map, Search } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ExploreHeaderProps = {
  onSearch: (city: string) => void;
};

export function ExploreHeader({ onSearch }: ExploreHeaderProps) {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'explore-hero');
  const [city, setCity] = useState('Mumbai');

  const handleSearchClick = () => {
    onSearch(city);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-lg">
      {heroImage ? (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
      ) : (
        <div className="w-full h-full bg-muted" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary-foreground shadow-2xl">
          Explore Your City
        </h1>
        <p className="mt-2 max-w-xl text-primary-foreground/90 shadow-2xl">
          Find top attractions, hidden gems, and things to do wherever you are.
        </p>
        <div className="mt-6 flex w-full max-w-md items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search any city, e.g., 'Mumbai'"
              className="pl-10 text-foreground"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button onClick={handleSearchClick}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
