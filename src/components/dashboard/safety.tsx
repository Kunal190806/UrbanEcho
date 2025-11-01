"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Phone,
  Siren,
  Hospital,
  Shield,
  MapPin,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  helplines,
  safetyAlerts,
  nearbyServices,
  type SafetyAlert,
  type NearbyService,
} from "@/lib/safety-data";

const alertIcons: { [key in SafetyAlert["severity"]]: React.ElementType } = {
  High: AlertTriangle,
  Medium: AlertTriangle,
  Low: Shield,
};

const serviceIcons: { [key in NearbyService["type"]]: React.ElementType } = {
  Hospital: Hospital,
  "Police Station": Shield,
};

const alertColors: { [key in SafetyAlert["severity"]]: string } = {
  High: "bg-red-500/10 text-red-500 border-red-500/20",
  Medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  Low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export function Safety() {
  const { toast } = useToast();
  const pressTimer = useRef<NodeJS.Timeout>();
  const [isHolding, setIsHolding] = useState(false);

  const handleButtonPress = () => {
    setIsHolding(true);
    pressTimer.current = setTimeout(() => {
      toast({
        title: "Emergency Alert Sent",
        description: "Your emergency contacts have been notified.",
        variant: "destructive",
      });
      setIsHolding(false);
    }, 3000);
  };

  const handleButtonRelease = () => {
    setIsHolding(false);
    clearTimeout(pressTimer.current);
  };

  return (
    <div className="grid gap-6">
      <Card
        className={cn(
          "border-2 border-destructive/50 transition-colors",
          isHolding && "bg-destructive/20"
        )}
      >
        <CardContent className="pt-6">
          <Button
            variant="destructive"
            className="w-full h-24 text-lg"
            onMouseDown={handleButtonPress}
            onMouseUp={handleButtonRelease}
            onMouseLeave={handleButtonRelease}
            onTouchStart={handleButtonPress}
            onTouchEnd={handleButtonRelease}
          >
            <Siren className="mr-4 h-8 w-8" />
            <div className="text-left">
              <p className="font-bold">SOS</p>
              <p className="text-sm font-normal">
                Press and hold for 3 seconds to alert emergency contacts
              </p>
            </div>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Helplines</CardTitle>
            <CardDescription>
              Quick access to emergency numbers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {helplines.map((helpline) => (
                <div
                  key={helpline.name}
                  className="flex flex-col items-center justify-center rounded-lg border p-4"
                >
                  <p className="text-muted-foreground">{helpline.name}</p>
                  <p className="text-2xl font-bold">{helpline.number}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Safety Alerts</CardTitle>
            <CardDescription>Latest updates in your area.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {safetyAlerts.map((alert, index) => {
                const Icon = alertIcons[alert.severity];
                return (
                  <li
                    key={index}
                    className={cn(
                      "flex items-start gap-4 rounded-lg border p-4",
                      alertColors[alert.severity]
                    )}
                  >
                    <Icon className="mt-1 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{alert.title}</p>
                      <p className="text-sm opacity-80">
                        {alert.description}
                      </p>
                      <p className="text-xs opacity-60 mt-1">{alert.time}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nearby Services</CardTitle>
          <CardDescription>
            Find essential services near you.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {nearbyServices.map((service, index) => {
            const Icon = serviceIcons[service.type];
            return (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      {service.name}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {service.distance}
                    </span>
                  </CardTitle>
                  <CardDescription>{service.address}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <p>{service.status}</p>
                  </div>
                  {service.beds && (
                    <div className="flex items-center gap-2 text-sm">
                      <p>
                        Beds:{" "}
                        <span
                          className={cn("font-semibold", {
                            "text-green-600": service.beds === "Available",
                            "text-yellow-600": service.beds === "Limited",
                          })}
                        >
                          {service.beds}
                        </span>
                      </p>
                    </div>
                  )}
                </CardContent>
                <div className="grid grid-cols-2 gap-2 p-4 pt-0">
                  <Button variant="outline">
                    <MapPin className="mr-2 h-4 w-4" />
                    Navigate
                  </Button>
                  <Button>
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                </div>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
