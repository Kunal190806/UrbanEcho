
import Image from 'next/image';
import { DashboardTabs } from '@/components/dashboard/dashboard-tabs';
import { TravelPreferenceModal } from '@/components/dashboard/travel-preference-modal';
import { SmartWidgets } from '@/components/dashboard/smart-widgets';
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'map');

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="flex-1 text-xl font-semibold font-headline md:text-2xl">
            Smart Living + Smart Moving
          </h1>
        </div>
        <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-lg md:h-[400px]">
          {heroImage ? (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground font-headline shadow-2xl">
              A new standard for sustainable urban living.
            </h2>
          </div>
        </div>
        <SmartWidgets />
        <DashboardTabs />
      </div>
      <TravelPreferenceModal />
    </>
  );
}
