"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Flame,
  Cloudy,
  Train,
  Wind,
  ParkingCircle,
  AlertTriangle,
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  upcomingMetros,
  nearbyStations,
  smartCityData,
} from "@/lib/data";
import { useTravelPreference } from "@/hooks/use-travel-preference";

const MetroWidget = () => {
  const metroImage = PlaceHolderImages.find((img) => img.id === "metro-widget");
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="p-0">
        {metroImage && (
          <Image
            src={metroImage.imageUrl}
            alt={metroImage.description}
            width={600}
            height={400}
            className="w-full h-24 object-cover"
            data-ai-hint={metroImage.imageHint}
          />
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">Upcoming Metros</h3>
        <ul className="space-y-3">
          {upcomingMetros.map((metro) => (
            <li key={metro.line} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full ${metro.color}`}
                  aria-hidden="true"
                />
                <span className="font-medium">{metro.line}</span>
                <span className="text-muted-foreground text-xs">
                  {metro.station}
                </span>
              </div>
              <Badge variant="secondary">{metro.arrival}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const StationsWidget = () => {
  const { preference } = useTravelPreference();

  const stations =
    preference === "ev"
      ? nearbyStations.filter((s) => s.type === "EV")
      : nearbyStations.filter((s) => s.type === "Petrol");

  const evImage = PlaceHolderImages.find((img) => img.id === "ev-widget");

  if (!preference) return null;

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="p-0">
        {evImage && (
          <Image
            src={evImage.imageUrl}
            alt={evImage.description}
            width={600}
            height={400}
            className="w-full h-24 object-cover"
            data-ai-hint={evImage.imageHint}
          />
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">Nearby Stations</h3>
        <ul className="space-y-3">
          {stations.map((station) => (
            <li
              key={station.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {station.type === "EV" ? (
                  <Zap className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Flame className="w-5 h-5 text-orange-500" />
                )}
                <div>
                  <p className="font-medium">{station.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {station.distance} away
                  </p>
                </div>
              </div>
              <Badge
                variant={station.type === "EV" ? "default" : "secondary"}
                className={
                  station.type === "EV"
                    ? "bg-green-100 text-green-800"
                    : "bg-orange-100 text-orange-800"
                }
              >
                {station.type}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const CityPulseWidget = () => {
  const statusIcons = {
    Traffic: Train,
    "Public Transit": Train,
    "Air Quality": Wind,
    Parking: ParkingCircle,
  };

  const getStatusColor = (status: string) => {
    if (status === "good") return "text-green-500";
    if (status === "moderate") return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>City Pulse</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {smartCityData.map((item) => {
            const Icon =
              statusIcons[item.label as keyof typeof statusIcons] ||
              AlertTriangle;
            return (
              <div key={item.label} className="flex items-start gap-3">
                <Icon
                  className={`w-6 h-6 mt-1 ${getStatusColor(item.status)}`}
                />
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-lg">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export function SmartWidgets() {
  const { preference } = useTravelPreference();

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <CityPulseWidget />
          </CarouselItem>
          {preference !== "fossil" && (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <MetroWidget />
            </CarouselItem>
          )}
          {preference && preference !== "public" && (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <StationsWidget />
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12" />
      </Carousel>
    </div>
  );
}
