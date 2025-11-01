"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTravelPreference, type TravelPreference } from "@/hooks/use-travel-preference";
import { Train, Zap, Flame } from "lucide-react";

export function TravelPreferenceModal() {
  const { preference, setPreference } = useTravelPreference();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // We check for `preference === null` which means loaded but not set.
    // `undefined` means it hasn't loaded from localStorage yet.
    if (preference === null) {
      setIsOpen(true);
    }
  }, [preference]);

  const handleSelect = (selectedPreference: TravelPreference) => {
    setPreference(selectedPreference);
    setIsOpen(false);
  };

  // We don't render the dialog on the server to avoid hydration mismatches,
  // and we only render it client-side if a preference hasn't been set.
  if (preference !== null) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton>
        <DialogHeader>
          <DialogTitle>How do you travel?</DialogTitle>
          <DialogDescription>
            Select your primary mode of daily transport to personalize your experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            size="lg"
            className="justify-start h-14 text-base"
            onClick={() => handleSelect("public")}
          >
            <Train className="mr-4 h-6 w-6 text-primary" />
            Public Transport
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="justify-start h-14 text-base"
            onClick={() => handleSelect("ev")}
          >
            <Zap className="mr-4 h-6 w-6 text-green-500" />
            Electric Vehicle (EV)
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="justify-start h-14 text-base"
            onClick={() => handleSelect("fossil")}
          >
            <Flame className="mr-4 h-6 w-6 text-orange-500" />
            Petrol/Diesel Vehicle
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
