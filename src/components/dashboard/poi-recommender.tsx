"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { getPoiSuggestions } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Find New Places
    </Button>
  );
}

export function PoiRecommender() {
  const initialState = { message: "", errors: {}, data: null };
  const [state, dispatch] = useActionState(getPoiSuggestions, initialState);
  const placeholderImages = PlaceHolderImages.filter((img) =>
    img.id.startsWith("poi-")
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Place Recommendations</CardTitle>
        <CardDescription>
          Discover new points of interest based on your history and preferences.
        </CardDescription>
      </CardHeader>
      <form action={dispatch}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="travelHistory">Your Travel History</Label>
              <Textarea
                id="travelHistory"
                name="travelHistory"
                placeholder="Describe places you've visited recently..."
                defaultValue="Visited Lodhi Garden last weekend, and spent an afternoon at Hauz Khas Village."
                className="min-h-[100px]"
              />
              {state.errors?.travelHistory && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.travelHistory[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferences">Your Preferences</Label>
              <Textarea
                id="preferences"
                name="preferences"
                placeholder="What kind of places do you enjoy?"
                defaultValue="I enjoy historical places and monuments, and also love trying new cafes."
                className="min-h-[100px]"
              />
              {state.errors?.preferences && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.preferences[0]}
                </p>
              )}
            </div>
          </div>

          {state.message === "success" && state.data && (
            <Alert className="bg-card">
              <AlertTitle className="font-semibold">
                Here are some suggestions for you:
              </AlertTitle>
              <AlertDescription>
                <p className="mt-2 text-base">{state.data.suggestions}</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {placeholderImages.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={600}
                        height={400}
                        className="h-auto w-full object-cover transition-transform hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {state.message && state.message !== "success" && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
