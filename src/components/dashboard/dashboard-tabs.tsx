"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PoiRecommender } from "@/components/dashboard/poi-recommender";
import { SustainableRoutes } from "@/components/dashboard/sustainable-routes";
import { Lightbulb, Leaf, BookHeart, Shield } from "lucide-react";
import { MemoryJournal } from "./memory-journal";
import { Safety } from "./safety";

export function DashboardTabs() {
  return (
    <Tabs defaultValue="discover" className="w-full">
      <TabsList className="grid w-full grid-cols-4 h-12">
        <TabsTrigger value="discover" className="text-sm">
          <Lightbulb className="mr-2 h-4 w-4" />
          Discover
        </TabsTrigger>
        <TabsTrigger value="eco" className="text-sm">
          <Leaf className="mr-2 h-4 w-4" />
          Eco-Routes
        </TabsTrigger>
        <TabsTrigger value="journal" className="text-sm">
          <BookHeart className="mr-2 h-4 w-4" />
          Journal
        </TabsTrigger>
        <TabsTrigger value="safety" className="text-sm">
          <Shield className="mr-2 h-4 w-4" />
          Safety
        </TabsTrigger>
      </TabsList>
      <TabsContent value="discover" className="mt-6">
        <PoiRecommender />
      </TabsContent>
      <TabsContent value="eco" className="mt-6">
        <SustainableRoutes />
      </TabsContent>
      <TabsContent value="journal" className="mt-6">
        <MemoryJournal />
      </TabsContent>
      <TabsContent value="safety" className="mt-6">
        <Safety />
      </TabsContent>
    </Tabs>
  );
}
