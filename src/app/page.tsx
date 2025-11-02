'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getAIEnergyTips, getEnergyOptimization } from '@/app/actions';
import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, PieChart, Pie, AreaChart, Area } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  energyAppliances,
  dailyUsageData,
  ecoChallenges,
  weeklyImpact,
  seasonalTips,
  applianceSchedules,
  weatherForecast,
  timeOfDayTariffs,
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
  FileDown,
  CalendarDays,
  Clock,
  PlusCircle,
  Sun,
  Cloudy,
  Snowflake,
  BarChart as BarChartIcon,
  Save,
  Cpu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const chartConfig = {
  usage: {
    label: 'Usage (kWh)',
  },
  predictedUsage: {
      label: 'Predicted (kWh)',
      color: "hsl(var(--chart-2))",
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

const getStatusIcon = (status: "On" | "Off" | "Standby") => {
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

const getEfficiencyStatusBadge = (status: "Optimal" | "Inefficient" | "Needs Check") => {
    switch (status) {
        case 'Optimal':
            return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Optimal</Badge>;
        case 'Inefficient':
            return <Badge variant="destructive">Inefficient</Badge>;
        case 'Needs Check':
            return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">Needs Check</Badge>;
    }
}

const getSeasonIcon = (season: string) => {
    switch (season.toLowerCase()) {
        case 'summer': return <Sun className="h-5 w-5 text-yellow-500" />;
        case 'winter': return <Snowflake className="h-5 w-5 text-blue-400" />;
        case 'monsoon': return <Cloudy className="h-5 w-5 text-gray-500" />;
        default: return <CalendarDays className="h-5 w-5" />;
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

function AIOptimizationButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full mt-4" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Cpu className="mr-2 h-4 w-4" />}
            Run Optimization Engine
        </Button>
    );
}

export default function EnergyPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'smart-home');
  const tipsInitialState = { message: '', errors: {}, data: null };
  const [tipsState, tipsDispatch] = useActionState(getAIEnergyTips, tipsInitialState);

  const optimizationInitialState = { message: '', errors: {}, data: null };
  const [optimizationState, optimizationDispatch] = useActionState(getEnergyOptimization, optimizationInitialState);

  const usageDataString = JSON.stringify(dailyUsageData);
  const appliancesString = JSON.stringify(energyAppliances);
  const weatherForecastString = JSON.stringify(weatherForecast);
  const timeOfDayTariffsString = JSON.stringify(timeOfDayTariffs);

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
      
       <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Cpu className="text-primary" />
                    AI Energy Optimization Engine
                </CardTitle>
                <CardDescription>
                    Predict and minimize your household energy consumption in real time.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={optimizationDispatch}>
                    <input type="hidden" name="usageHistory" value={usageDataString} />
                    <input type="hidden" name="weatherForecast" value={weatherForecastString} />
                    <input type="hidden" name="appliances" value={appliancesString} />
                    <input type="hidden" name="timeOfDayTariffs" value={timeOfDayTariffsString} />

                    {optimizationState.message === "success" && optimizationState.data && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Next 24-Hour Energy Forecast</CardTitle>
                                    <CardDescription>
                                        Predicted consumption based on your patterns and weather. Potential Savings:
                                        <span className="font-bold text-green-600"> {optimizationState.data.potentialSavings}</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                        <AreaChart accessibilityLayer data={optimizationState.data.consumptionForecast}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                            <YAxis label={{ value: 'kWh', angle: -90, position: 'insideLeft', offset: -0, style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' } }} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Area dataKey="predictedUsage" type="natural" fill="var(--color-predictedUsage)" fillOpacity={0.4} stroke="var(--color-predictedUsage)" />
                                        </AreaChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>

                            <div>
                                <h3 className="font-semibold mb-2">Optimized Appliance Schedules</h3>
                                <div className="space-y-4">
                                {optimizationState.data.optimizedSchedules.map((schedule: any, index: number) => (
                                    <Alert key={index} className="bg-card/50">
                                        <Clock className="h-4 w-4" />
                                        <AlertTitle>{schedule.appliance}: Run at {schedule.recommendedTime}</AlertTitle>
                                        <AlertDescription>{schedule.reason}</AlertDescription>
                                    </Alert>
                                ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {optimizationState.message && optimizationState.message !== "success" && (
                        <Alert variant="destructive">
                            <Info className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{optimizationState.message}</AlertDescription>
                        </Alert>
                    )}

                    {!optimizationState.data && (
                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-8 text-center">
                            <Cpu className="h-10 w-10 text-muted-foreground" />
                            <p className="mt-4 text-sm font-medium text-muted-foreground">
                                Get a next-day energy forecast and optimized schedules for your appliances.
                            </p>
                        </div>
                    )}
                    <AIOptimizationButton />
                </form>
            </CardContent>
        </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Appliance Efficiency Audit</CardTitle>
                <CardDescription>Automated checks on your device performance.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {energyAppliances.map((appliance) => (
                    <div key={appliance.name} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                            {getStatusIcon(appliance.status)}
                            <div>
                                <p className="font-medium">{appliance.name}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground" title={`${appliance.energyRating}-star rating`}>
                                    {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn("h-3 w-3", i < appliance.energyRating ? getRatingColor(appliance.energyRating) : "text-muted-foreground/30")}
                                        fill="currentColor"
                                    />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {getEfficiencyStatusBadge(appliance.efficiencyStatus)}
                            <Badge variant="outline">{appliance.usage} kWh</Badge>
                        </div>
                    </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download Audit Report
                </Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="text-primary" />
                    AI Energy Insights
                </CardTitle>
                <CardDescription>
                    Smart scheduling and seasonal energy-saving tips.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="seasonal">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="seasonal"><CalendarDays className="mr-2 h-4 w-4" />Seasonal Tips</TabsTrigger>
                        <TabsTrigger value="scheduling"><Clock className="mr-2 h-4 w-4" />Scheduling</TabsTrigger>
                    </TabsList>
                    <TabsContent value="seasonal" className="mt-4">
                        <div className="space-y-4">
                            {seasonalTips.map((tip, index) => (
                                <Alert key={index} className="bg-card/50">
                                    {getSeasonIcon(tip.season)}
                                    <AlertTitle className="ml-1">{tip.season}</AlertTitle>
                                    <AlertDescription>{tip.tip}</AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="scheduling" className="mt-4">
                        <div className="space-y-4">
                            {applianceSchedules.map((schedule) => (
                                <div key={schedule.appliance} className="flex items-center justify-between rounded-lg border p-3">
                                    <div className="space-y-1">
                                        <p className="font-medium">{schedule.appliance}</p>
                                        <p className="text-sm text-muted-foreground">{schedule.time}</p>
                                    </div>
                                    <Switch checked={schedule.enabled} />
                                </div>
                            ))}
                            <Button variant="outline" className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add New Schedule
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
      </div>

       <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="text-primary" />
                    AI Usage Pattern Alerts
                </CardTitle>
                <CardDescription>
                    Get personalized alerts and tips based on your real-time usage data.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={tipsDispatch}>
                    <input type="hidden" name="usageData" value={usageDataString} />
                    <input type="hidden" name="appliances" value={appliancesString} />
                    
                    {tipsState.message === "success" && tipsState.data && (
                        <div className="space-y-4">
                            {tipsState.data.tips.map((tip: string, index: number) => (
                                <Alert key={index} className="bg-card/50">
                                    <Zap className="h-4 w-4" />
                                    <AlertTitle>Alert & Tip #{index + 1}</AlertTitle>
                                    <AlertDescription>{tip}</AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    )}

                    {tipsState.message && tipsState.message !== "success" && (
                        <Alert variant="destructive">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{tipsState.message}</AlertDescription>
                        </Alert>
                    )}

                    {!tipsState.data && (
                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-8 text-center">
                            <Lightbulb className="h-10 w-10 text-muted-foreground" />
                            <p className="mt-4 text-sm font-medium text-muted-foreground">
                                Click the button to check for unusual patterns and get smart alerts.
                            </p>
                        </div>
                    )}
                    <AITipsButton />
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
