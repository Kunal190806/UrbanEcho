
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { energyWidgetData } from "@/lib/energy-data";
import { cn } from "@/lib/utils";
import { AlertTriangle, Zap, CheckCircle } from "lucide-react";

const alertIcons = {
  alert: <AlertTriangle className="h-5 w-5 text-destructive" />,
  tip: <Zap className="h-5 w-5 text-yellow-500" />,
  motivation: <CheckCircle className="h-5 w-5 text-green-500" />,
};

export function HomeEnergyWidget() {
  const widgetImage = PlaceHolderImages.find((img) => img.id === "energy-widget");
  const currentMessage = energyWidgetData.messages[0];
  const Icon = alertIcons[currentMessage.type];

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="p-0">
        {widgetImage && (
          <Image
            src={widgetImage.imageUrl}
            alt={widgetImage.description}
            width={600}
            height={400}
            className="w-full h-24 object-cover"
            data-ai-hint={widgetImage.imageHint}
          />
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">Today's Energy Snapshot</h3>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <p>
            Current:{" "}
            <span className="font-bold text-foreground">
              {energyWidgetData.currentUsage} kWh
            </span>
          </p>
          <p>
            Predicted:{" "}
            <span className="font-bold text-foreground">
              {energyWidgetData.predictedUsage} kWh
            </span>
          </p>
        </div>
        <div
          className={cn("flex items-start gap-3 rounded-lg p-3 text-sm", {
            "bg-red-500/10 text-destructive": currentMessage.type === "alert",
            "bg-yellow-500/10 text-yellow-600": currentMessage.type === "tip",
            "bg-green-500/10 text-green-600":
              currentMessage.type === "motivation",
          })}
        >
          <div className="mt-1">{Icon}</div>
          <p className="flex-1">{currentMessage.text}</p>
        </div>
      </CardContent>
    </Card>
  );
}
