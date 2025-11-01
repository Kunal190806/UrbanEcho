"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { getSustainableRoutes } from "@/app/actions";
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
import { Loader2, Leaf, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Find Eco-Friendly Routes
    </Button>
  );
}

export function SustainableRoutes() {
  const initialState = { message: "", errors: {}, data: null };
  const [state, dispatch] = useActionState(getSustainableRoutes, initialState);

  const chartData =
    state.data?.routes.map((route, index) => ({
      name: `Route ${index + 1}`,
      carbonFootprint: route.carbonFootprint,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`,
    })) || [];

  const chartConfig = {
    carbonFootprint: {
      label: "Carbon Footprint (kg CO₂)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainable Route Options</CardTitle>
        <CardDescription>
          Find routes that minimize your carbon footprint.
        </CardDescription>
      </CardHeader>
      <form action={dispatch}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startLocation-eco">Start Location</Label>
              <Input
                id="startLocation-eco"
                name="startLocation"
                placeholder="e.g., Downtown Market"
                required
                defaultValue="Tech Hub"
              />
              {state.errors?.startLocation && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.startLocation[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endLocation-eco">End Location</Label>
              <Input
                id="endLocation-eco"
                name="endLocation"
                placeholder="e.g., Riverside Walk"
                required
                defaultValue="City Library"
              />
              {state.errors?.endLocation && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.endLocation[0]}
                </p>
              )}
            </div>
          </div>

          {state.message === "success" && state.data && (
            <div className="space-y-4 pt-4">
              <Alert>
                <Leaf className="h-4 w-4" />
                <AlertTitle className="font-semibold">Eco-Route Suggestions</AlertTitle>
                <AlertDescription>
                  We found {state.data.routes.length} sustainable routes for
                  you. The chart below visualizes their carbon footprint.
                </AlertDescription>
              </Alert>

              {chartData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Carbon Footprint Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={chartConfig}
                      className="min-h-[200px] w-full"
                    >
                      <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft', offset: -10, style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' } }}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="carbonFootprint" radius={4}>
                          {chartData.map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {state.data.routes.map((route, index) => (
                  <Card key={index} className="flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base font-medium">
                        Route {index + 1}
                      </CardTitle>
                      <span className="font-bold text-primary">
                        {route.carbonFootprint} kg CO₂
                      </span>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">
                        {route.routeDescription}
                      </p>
                      <p className="text-xs mt-2 font-medium">
                        Modes: {route.transportModesUsed.join(", ")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {state.message && state.message !== "success" && (
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
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
