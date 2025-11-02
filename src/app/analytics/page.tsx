
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';
import {
    ArrowUp,
    ArrowDown,
    Building2,
    TrendingUp,
    TrendingDown,
    Zap,
    Home,
    Clock,
    Flame
} from 'lucide-react';
import {
    cityMetrics,
    monthlyConsumption,
    neighborhoodLeaderboard,
    peakUsageHeatmapData,
    consumptionByZone
} from '@/lib/analytics-data';
import { cn } from '@/lib/utils';

const chartConfig: ChartConfig = {
  consumption: {
    label: 'Consumption (MWh)',
    color: 'hsl(var(--chart-1))',
  },
  zone: {
    label: 'Zone',
  },
};

const getHeatmapColor = (value: number) => {
    if (value > 90) return 'bg-red-600/90';
    if (value > 75) return 'bg-orange-500/80';
    if (value > 50) return 'bg-yellow-400/70';
    if (value > 25) return 'bg-green-500/60';
    return 'bg-blue-500/50';
};

export default function AnalyticsPage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 bg-muted/20">
        <div className="flex items-center justify-between">
            <div className='space-y-1'>
                <h1 className="flex items-center gap-3 text-2xl font-semibold font-headline md:text-3xl">
                    <Building2 className="h-8 w-8 text-primary" />
                    City Energy Analytics
                </h1>
                <p className='text-muted-foreground'>Aggregated insights for urban planning and administration.</p>
            </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cityMetrics.map((metric) => (
                <Card key={metric.label}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                        {metric.label === "Total Consumption" && <Zap className="h-4 w-4 text-muted-foreground" />}
                        {metric.label === "Avg. Household" && <Home className="h-4 w-4 text-muted-foreground" />}
                        {metric.label === "Peak Hour" && <Clock className="h-4 w-4 text-muted-foreground" />}
                        {metric.label === "Carbon Intensity" && <Flame className="h-4 w-4 text-muted-foreground" />}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            {metric.changeType === 'increase' ? 
                                <span className="flex items-center text-red-500"><ArrowUp className="h-3 w-3 mr-1" /> {metric.change}</span> :
                                <span className="flex items-center text-green-500"><ArrowDown className="h-3 w-3 mr-1" /> {metric.change}</span>
                            }
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Monthly Consumption Trend</CardTitle>
                    <CardDescription>City-wide energy usage over the current month (in GWh).</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                        <AreaChart data={monthlyConsumption} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                            <YAxis
                                label={{ value: 'GWh', angle: -90, position: 'insideLeft', offset: 10, style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' } }}
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area dataKey="consumption" type="monotone" fill="hsl(var(--chart-1))" fillOpacity={0.4} stroke="hsl(var(--chart-1))" />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Efficiency Leaderboard</CardTitle>
                    <CardDescription>Top energy-efficient neighborhoods.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Rank</TableHead>
                                <TableHead>Zone</TableHead>
                                <TableHead className="text-right">Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {neighborhoodLeaderboard.map((item) => (
                                <TableRow key={item.zone}>
                                    <TableCell className="font-medium">{item.rank}</TableCell>
                                    <TableCell>{item.zone}</TableCell>
                                    <TableCell className="text-right flex items-center justify-end gap-2">
                                        {item.efficiencyScore}
                                        {item.change > 0 && <TrendingUp className="h-4 w-4 text-green-500" />}
                                        {item.change < 0 && <TrendingDown className="h-4 w-4 text-red-500" />}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Peak Usage Heatmap</CardTitle>
                    <CardDescription>Weekly grid load intensity by hour and day.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-xs">
                        {/* Y-Axis Labels (Days) */}
                        <div></div>
                        <div className="grid grid-cols-12">
                            {Array.from({length: 12}).map((_, i) => <div key={i} className="text-center text-muted-foreground text-[10px]">{i * 2}:00</div>)}
                        </div>
                        {days.map((day, dayIndex) => (
                            <React.Fragment key={day}>
                                <div className="text-right text-muted-foreground pt-1">{day}</div>
                                <div className="grid grid-cols-24 gap-1">
                                {hours.map((hour) => {
                                    const dataPoint = peakUsageHeatmapData.find(d => d.day === dayIndex && d.hour === hour);
                                    const value = dataPoint ? dataPoint.value : 0;
                                    return (
                                        <div key={hour} className="h-6 w-full rounded-[2px]" title={`${day}, ${hour}:00 - Intensity: ${value}`}>
                                            <div className={cn("h-full w-full rounded-[2px]", getHeatmapColor(value))} style={{ opacity: value / 100 }} />
                                        </div>
                                    );
                                })}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Consumption by Zone</CardTitle>
                    <CardDescription>Energy usage distribution across city zones.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                        <BarChart layout="vertical" data={consumptionByZone} margin={{ right: 20 }}>
                            <CartesianGrid horizontal={false} />
                            <YAxis dataKey="zone" type="category" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} label={{ value: 'MWh', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' } }} />
                            <ChartTooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                            <Bar dataKey="consumption" fill="hsl(var(--chart-1))" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
