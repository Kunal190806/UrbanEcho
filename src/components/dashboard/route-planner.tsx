"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { getPersonalizedRoute } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Car, TramFront, Bus, Footprints, Zap, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const transportOptions = [
  { id: "walking", label: "Walking", icon: Footprints },
  { id: "bus", label: "Bus", icon: Bus },
  { id: "metro", label: "Metro", icon: TramFront },
  { id: "ev", label: "EV", icon: Zap },
  { id: "auto", label: "Auto", icon: Car },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Plan My Route
    </Button>
  );
}

export function RoutePlanner() {
  const initialState = { message: "", errors: {}, data: null };
  const [state, dispatch] = useActionState(getPersonalizedRoute, initialState);

  const startLocation = state.input?.startLocation;
  const endLocation = state.input?.endLocation;

  const googleMapsUrl =
    startLocation && endLocation
      ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
          startLocation
        )}&destination=${encodeURIComponent(endLocation)}`
      : "";


  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Route Planning</CardTitle>
        <CardDescription>
          Find the best route based on your preferences.
        </CardDescription>
      </CardHeader>
      <form action={dispatch}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startLocation">Start Location</Label>
              <Input
                id="startLocation"
                name="startLocation"
                placeholder="e.g., Central Park"
                required
                defaultValue="City Hall"
              />
              {state.errors?.startLocation && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.startLocation[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endLocation">End Location</Label>
              <Input
                id="endLocation"
                name="endLocation"
                placeholder="e.g., Empire State Building"
                required
                defaultValue="Grand Museum"
              />
              {state.errors?.endLocation && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.endLocation[0]}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Preferred Transport</Label>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg border p-4 sm:grid-cols-3 md:grid-cols-5">
              {transportOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    name="preferredModes"
                    value={option.id}
                    defaultChecked={["metro", "walking"].includes(option.id)}
                  />
                  <Label
                    htmlFor={option.id}
                    className="flex cursor-pointer items-center gap-2 font-normal"
                  >
                    <option.icon className="h-5 w-5 text-muted-foreground" />
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {state.errors?.preferredModes && (
              <p className="text-sm font-medium text-destructive">
                {state.errors.preferredModes[0]}
              </p>
            )}
          </div>

          {state.message === "success" && state.data && (
            <Alert className="bg-card">
              <AlertTitle className="font-semibold">
                Your Personalized Route
              </AlertTitle>
              <AlertDescription>
                <div className="mt-2 text-base whitespace-pre-line">{state.data.plan}</div>
                {googleMapsUrl && (
                  <Button asChild variant="outline" className="mt-4">
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on Google Maps
                    </a>
                  </Button>
                )}
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
