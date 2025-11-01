"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RoutePlanner } from "@/components/dashboard/route-planner";
import { PoiRecommender } from "@/components/dashboard/poi-recommender";
import { SustainableRoutes } from "@/components/dashboard/sustainable-routes";
import { Map, Lightbulb, Leaf, BookHeart, Siren, Home } from "lucide-react";
import { MemoryJournal } from "./memory-journal";
import { Safety } from "./safety";
import { HomeEnergy } from "./home-energy";

export function DashboardTabs() {
  return (
    <Tabs defaultValue="planner" className="w-full">
      <TabsList className="grid w-full grid-cols-6 h-12">
        <TabsTrigger value="planner" className="text-sm">
          <Map className="mr-2 h-4 w-4" />
          Route Planner
        </TabsTrigger>
        <TabsTrigger value="discover" className="text-sm">
          <Lightbulb className="mr-2 h-4 w-4" />
          Discover
        </TabsTrigger>
        <TabsTrigger value="eco" className="text-sm">
          <Leaf className="mr-2 h-4 w-4" />
          Eco-Routes
        </TabsTrigger>
        <TabsTrigger value="energy" className="text-sm">
          <Home className="mr-2 h-4 w-4" />
          Energy
        </TabsTrigger>
        <TabsTrigger value="journal" className="text-sm">
          <BookHeart className="mr-2 h-4 w-4" />
          Journal
        </TabsTrigger>
        <TabsTrigger value="safety" className="text-sm">
          <Siren className="mr-2 h-4 w-4" />
          Safety
        </TabsTrigger>
      </TabsList>
      <TabsContent value="planner" className="mt-6">
        <RoutePlanner />
      </TabsContent>
      <TabsContent value="discover" className="mt-6">
        <PoiRecommender />
      </TabsContent>
      <TabsContent value="eco" className="mt-6">
        <SustainableRoutes />
      </TabsContent>
      <TabsContent value="energy" className="mt-6">
        <HomeEnergy />
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
