
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, MapPin } from 'lucide-react';
import type { Attraction } from '@/lib/data';
import { ScrollArea } from '../ui/scroll-area';

type SavedPlacesProps = {
  savedPlaces: Attraction[];
  onToggleSave: (attraction: Attraction) => void;
};

export function SavedPlaces({ savedPlaces, onToggleSave }: SavedPlacesProps) {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>My Saved Places</CardTitle>
        <CardDescription>Your favorite spots at a glance.</CardDescription>
      </CardHeader>
      <CardContent>
        {savedPlaces.length > 0 ? (
          <ScrollArea className="h-96">
            <ul className="space-y-4">
              {savedPlaces.map((place) => (
                <li
                  key={place.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{place.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {place.distance} away
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onToggleSave(place)}
                  >
                    <Bookmark className="h-5 w-5 text-primary fill-current" />
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-8 text-center">
            <Bookmark className="h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              You haven't saved any places yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
