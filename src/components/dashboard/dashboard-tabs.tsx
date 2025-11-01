import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoutePlanner } from "./route-planner";
import { PoiRecommender } from "./poi-recommender";
import { SustainableRoutes } from "./sustainable-routes";
import { Map, Lightbulb, Leaf, BookHeart } from "lucide-react";
import { MemoryJournal } from "./memory-journal";

export function DashboardTabs() {
  return (
    <Tabs defaultValue="planner" className="w-full">
      <TabsList className="grid w-full grid-cols-4 h-12">
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
        <TabsTrigger value="journal" className="text-sm">
          <BookHeart className="mr-2 h-4 w-4" />
          Memory Journal
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
      <TabsContent value="journal" className="mt-6">
        <MemoryJournal />
      </TabsContent>
    </Tabs>
  );
}
