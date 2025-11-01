'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getAIEnergyTips } from '@/app/actions';
import Image from 'next/image';
import { SmartWidgets } from '@/components/dashboard/smart-widgets';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, PieChart, Pie } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  energyAppliances,
  dailyUsageData,
  ecoChallenges,
  weeklyImpact,
} from '@/lib/energy-data';
import {
  Star,
  Zap,
  Power,
  PowerOff,
  Lightbulb,
  ShieldCheck,
  CheckCircle,
  Trophy,
  Sparkles,
  Loader2,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const chartConfig = {
  usage: {
    label: 'Usage (kWh)',
  },
  devices: {
    label: "Devices"
  },
  ...energyAppliances.reduce((acc, appliance) => {
    acc[appliance.name.toLowerCase().replace(/ /g, '')] = {
      label: appliance.name,
      color: appliance.color,
    };
    return acc;
  }, {} as any)
} satisfies ChartConfig;

const dailyChartData = dailyUsageData.map((day, index) => ({
  ...day,
  fill: `hsl(var(--chart-${(index % 5) + 1}))`,
}));

const applianceChartData = energyAppliances.map(appliance => ({
  name: appliance.name,
  value: appliance.usage,
  fill: `var(--color-${appliance.name.toLowerCase().replace(/ /g, '')})`
}));

const getRatingColor = (rating: number) => {
  if (rating >= 4) return 'text-green-500';
  if (rating >= 3) return 'text-yellow-500';
  return 'text-red-500';
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'On':
      return <Power className="h-4 w-4 text-green-500" />;
    case 'Off':
      return <PowerOff className="h-4 w-4 text-muted-foreground" />;
    case 'Standby':
      return <Zap className="h-4 w-4 text-yellow-500" />;
    default:
      return null;
  }
};

function AITipsButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full mt-4" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Generate Tips
    </Button>
  );
}


export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'smart-home');
  const initialState = { message: '', errors: {}, data: null };
  const [state, dispatch] = useActionState(getAIEnergyTips, initialState);

  const usageDataString = JSON.stringify(dailyUsageData);
  const appliancesString = JSON.stringify(energyAppliances);


  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="flex-1 text-xl font-semibold font-headline md:text-2xl">
          Your Home Energy Hub
        </h1>
      </div>
      <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-lg">
        {heroImage ? (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h2 className="text-2xl font-bold text-primary-foreground font-headline shadow-lg">
            A new standard for sustainable urban living.
          </h2>
          <p className="text-sm text-primary-foreground/90 max-w-md shadow-lg">
            Monitor consumption, gain insights, and build sustainable habits.
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="text-yellow-500" />
                    Daily Eco-Challenges
                </CardTitle>
                <CardDescription>Complete simple tasks to save energy and earn points.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {ecoChallenges.map((challenge, index) => (
                        <li key={index} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-4">
                                <ShieldCheck className={cn("h-6 w-6", challenge.completed ? "text-green-500" : "text-muted-foreground")} />
                                <div>
                                    <p className={cn("font-medium", challenge.completed && "line-through text-muted-foreground")}>{challenge.task}</p>
                                    <p className="text-xs text-muted-foreground">{challenge.reward}</p>
                                </div>
                            </div>
                            {!challenge.completed && (
                                <Button variant="outline" size="sm">
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Done
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Your Weekly Impact</CardTitle>
                <CardDescription>See the difference you're making.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-center">
                <div className="rounded-lg bg-green-100/50 dark:bg-green-900/20 p-4">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">CO₂ Saved</p>
                    <p className="text-3xl font-bold text-green-700 dark:text-green-300">{weeklyImpact.co2SavedKg}</p>
                    <p className="text-xs text-muted-foreground">kilograms</p>
                </div>
                <div className="rounded-lg bg-blue-100/50 dark:bg-blue-900/20 p-4">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Eco-Score</p>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{weeklyImpact.ecoScore}</p>
                    <p className="text-xs text-muted-foreground">points this week</p>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Weekly Energy Usage</CardTitle>
            <CardDescription>
              A summary of your household energy consumption over the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <BarChart accessibilityLayer data={dailyChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    label={{ value: 'kWh', angle: -90, position: 'insideLeft', offset: -0, style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' } }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="usage" radius={4}>
                    {dailyChartData.map((entry) => (
                        <Cell key={entry.day} fill={entry.fill} />
                    ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Consumption Breakdown</CardTitle>
                <CardDescription>Energy usage per appliance.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel hideIndicator />}
                        />
                        <Pie
                        data={applianceChartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        strokeWidth={5}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>

      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
            <CardTitle>Appliance Consumption</CardTitle>
            <CardDescription>
                Real-time energy usage and efficiency ratings of your devices.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="divide-y divide-border">
                {energyAppliances.map((appliance) => (
                <div
                    key={appliance.name}
                    className="flex items-center justify-between py-3"
                >
                    <div className="flex items-center gap-4">
                        {getStatusIcon(appliance.status)}
                        <span className="font-medium">{appliance.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1" title={`${appliance.energyRating}-star rating`}>
                        {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                            "h-4 w-4",
                            i < appliance.energyRating
                                ? getRatingColor(appliance.energyRating)
                                : "text-muted-foreground/30"
                            )}
                            fill="currentColor"
                        />
                        ))}
                    </div>
                    <Badge variant="secondary" className="w-24 justify-center">
                        {appliance.usage} kWh
                    </Badge>
                    </div>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="text-primary" />
                    AI Energy Tips
                </CardTitle>
                <CardDescription>
                    Get personalized tips based on your usage data.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={dispatch}>
                    <input type="hidden" name="usageData" value={usageDataString} />
                    <input type="hidden" name="appliances" value={appliancesString} />
                    
                    {state.message === "success" && state.data && (
                        <div className="space-y-4">
                            {state.data.tips.map((tip: string, index: number) => (
                                <Alert key={index} className="bg-card/50">
                                    <Lightbulb className="h-4 w-4" />
                                    <AlertTitle>Tip #{index + 1}</AlertTitle>
                                    <AlertDescription>{tip}</AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    )}

                    {state.message && state.message !== "success" && (
                        <Alert variant="destructive">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                        </Alert>
                    )}

                    {!state.data && (
                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-8 text-center">
                            <Lightbulb className="h-10 w-10 text-muted-foreground" />
                            <p className="mt-4 text-sm font-medium text-muted-foreground">
                                Click the button to generate personalized energy-saving tips from our AI.
                            </p>
                        </div>
                    )}
                    <AITipsButton />
                </form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
