"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTravelPreference, type TravelPreference } from "@/hooks/use-travel-preference";
import { TramFront, Zap, Fuel } from "lucide-react";

const preferences: {
  id: TravelPreference;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "public", label: "Public Transport", icon: TramFront },
  { id: "ev", label: "Electric Vehicle", icon: Zap },
  { id: "fossil", label: "Fossil Fuel Vehicle", icon: Fuel },
];

export function PreferenceModal() {
  const { preference, setPreference } = useTravelPreference();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TravelPreference | null>(null);

  useEffect(() => {
    // Only open the modal if the preference has not been set yet.
    // The `useTravelPreference` hook returns null initially if nothing is in localStorage.
    if (preference === null) {
      setIsOpen(true);
    }
  }, [preference]);

  const handleSave = () => {
    if (selected) {
      setPreference(selected);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton>
        <DialogHeader>
          <DialogTitle>Personalize Your Experience</DialogTitle>
          <DialogDescription>
            How do you prefer to travel daily? This will help us tailor the app
            for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {preferences.map((pref) => (
            <Button
              key={pref.id}
              variant={selected === pref.id ? "default" : "outline"}
              className="w-full justify-start h-14 text-left"
              onClick={() => setSelected(pref.id)}
            >
              <pref.icon className="mr-4 h-6 w-6" />
              <span className="text-base font-medium">{pref.label}</span>
            </Button>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={!selected}>
            Save Preference
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

declare module "@/components/ui/dialog" {
    interface DialogContentProps {
      hideCloseButton?: boolean;
    }
}
