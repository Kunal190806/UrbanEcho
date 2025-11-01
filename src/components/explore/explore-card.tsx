
'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, MapPin, Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Attraction } from '@/lib/data';

type ExploreCardProps = {
  attraction: Attraction;
  isSaved: boolean;
  onToggleSave: (attraction: Attraction) => void;
};

export function ExploreCard({
  attraction,
  isSaved,
  onToggleSave,
}: ExploreCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === attraction.imageId);

  return (
    <Card className="flex flex-col overflow-hidden">
      {image && (
        <div className="relative h-40 w-full">
          <Image
            src={image.imageUrl}
            alt={attraction.name}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{attraction.name}</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
            {attraction.rating}
          </Badge>
        </CardTitle>
        <CardDescription>{attraction.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{attraction.distance} away</p>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="outline">
          <MapPin className="mr-2 h-4 w-4" />
          Map
        </Button>
        <Button variant={isSaved ? 'default' : 'secondary'} onClick={() => onToggleSave(attraction)}>
          <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          {isSaved ? 'Saved' : 'Save'}
        </Button>
      </CardFooter>
    </Card>
  );
}
