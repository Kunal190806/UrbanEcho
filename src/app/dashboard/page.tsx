
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { RoutePlanner } from '@/components/dashboard/route-planner';
import { DashboardTabs } from '@/components/dashboard/dashboard-tabs';
import { SmartWidgets } from '@/components/dashboard/smart-widgets';
import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";


export default function DashboardPage() {
    const heroImage = PlaceHolderImages.find((img) => img.id === 'explore-hero');
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className='space-y-1'>
            <h1 className="text-2xl font-semibold font-headline md:text-3xl">
            Your City Dashboard
            </h1>
            <p className='text-muted-foreground'>A smart city companion for your daily urban life.</p>
        </div>
      </div>
      <div className="grid gap-6">
        <SmartWidgets />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <RoutePlanner />
          </div>
        </div>
        <DashboardTabs />
      </div>
    </div>
  );
}
