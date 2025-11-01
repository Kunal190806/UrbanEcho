import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { upcomingMetros, nearbyStations, smartCityData } from "@/lib/data";
import { TramFront, Zap, Fuel, Wind, Dot } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function SmartWidgets() {
  const airQuality = smartCityData.find((d) => d.label === 'Air Quality');
  const metroImage = PlaceHolderImages.find((img) => img.id === 'metro-widget');
  const evImage = PlaceHolderImages.find((img) => img.id === 'ev-widget');

  return (
    <div className="mb-4">
       <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Smart Widgets</h2>
        <p className="text-sm text-muted-foreground">Real-time city insights</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TramFront className="h-5 w-5 text-primary" />
              <span>Upcoming Metros</span>
            </CardTitle>
            <CardDescription>Leave in 5 mins for your next train.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-3">
            {upcomingMetros.map((metro) => (
              <div key={metro.line} className="flex items-center">
                <span className={cn("h-2.5 w-2.5 rounded-full mr-3", metro.color)} />
                <div className="flex-grow">
                  <p className="font-semibold">{metro.line} to {metro.station}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{metro.arrival}</p>
                </div>
              </div>
            ))}
          </CardContent>
          {metroImage && (
             <div className="relative h-32 w-full overflow-hidden rounded-b-lg">
                <Image src={metroImage.imageUrl} alt={metroImage.description} fill className="object-cover" data-ai-hint={metroImage.imageHint} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             </div>
          )}
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Nearby Stations</span>
            </CardTitle>
             <CardDescription>EV charging and petrol pumps.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-3">
            {nearbyStations.map((station) => (
              <div key={station.name} className="flex items-center">
                {station.type === 'EV' ? <Zap className="h-5 w-5 mr-3 text-green-500" /> : <Fuel className="h-5 w-5 mr-3 text-orange-500" />}
                <div className="flex-grow">
                  <p className="font-semibold">{station.name}</p>
                  <p className="text-sm text-muted-foreground">{station.type} Station</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{station.distance}</p>
                </div>
              </div>
            ))}
          </CardContent>
          {evImage && (
             <div className="relative h-32 w-full overflow-hidden rounded-b-lg">
                <Image src={evImage.imageUrl} alt={evImage.description} fill className="object-cover" data-ai-hint={evImage.imageHint} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             </div>
          )}
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-primary" />
              <span>Air Quality</span>
            </CardTitle>
            <CardDescription>Current AQI and eco-impact.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col items-center justify-center text-center">
            {airQuality && (
              <>
                <p className="text-6xl font-bold text-primary">{airQuality.value}</p>
                <p className={cn("font-semibold mt-2", 
                    airQuality.status === "good" ? "text-green-500" :
                    airQuality.status === "moderate" ? "text-yellow-500" :
                    "text-red-500"
                )}>{airQuality.status.charAt(0).toUpperCase() + airQuality.status.slice(1)}</p>
                <p className="text-xs text-muted-foreground mt-2">Eco-impact: Low</p>
              </>
            )}
          </CardContent>
           <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Your sustainable choices today have saved an estimated 1.2kg of CO₂.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
