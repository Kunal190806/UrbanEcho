import { Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { FavoritePlaces } from '@/components/dashboard/favorite-places';
import { SmartCityStatus } from '@/components/dashboard/smart-city-status';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { DashboardTabs } from '@/components/dashboard/dashboard-tabs';
import { FirebaseProvider } from '@/firebase/provider';
import { UserMenu } from '@/components/auth/user-menu';
import { TravelPreferenceModal } from '@/components/dashboard/travel-preference-modal';
import { SmartWidgets } from '@/components/dashboard/smart-widgets';


export default function Home() {
  return (
    <FirebaseProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <aside className="hidden border-r bg-card/50 lg:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-16 items-center border-b px-6">
                <div className="flex items-center gap-3 font-semibold font-headline">
                  <Logo className="h-8 w-8 text-primary" />
                  <span className="text-lg">UrbanEcho</span>
                </div>
              </div>
              <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <FavoritePlaces />
                </nav>
              </div>
              <div className="mt-auto p-4">
                <SmartCityStatus />
              </div>
            </div>
          </aside>
          <div className="flex flex-col">
            <header className="flex h-16 items-center gap-4 border-b bg-card/50 px-6 sticky top-0 z-30">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 lg:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <div className="flex h-16 items-center border-b px-6">
                    <div className="flex items-center gap-3 font-semibold font-headline">
                      <Logo className="h-8 w-8 text-primary" />
                      <span className="text-lg text-foreground">UrbanEcho</span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto py-4">
                    <nav className="grid auto-rows-max items-start gap-2 px-4 text-sm font-medium">
                      <FavoritePlaces />
                    </nav>
                  </div>
                  <div className="mt-auto p-4">
                    <SmartCityStatus />
                  </div>
                </SheetContent>
              </Sheet>
              <h1 className="flex-1 text-xl font-semibold font-headline md:text-2xl">
                Smart City Navigator
              </h1>
              <UserMenu />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
              <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-lg md:h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1717700299581-c2fc3fad4ee8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjaXR5JTIwbWFwfGVufDB8fHx8MTc2MTkxMTUzM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="A stylized map of a city showing streets and districts."
                  fill
                  className="object-cover"
                  data-ai-hint="city map"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground font-headline shadow-2xl">
                    Travel Smarter, Cleaner, and More Sustainably
                  </h2>
                </div>
              </div>
              <SmartWidgets />
              <DashboardTabs />
            </main>
          </div>
        </div>
      </div>
      <TravelPreferenceModal />
    </FirebaseProvider>
  );
}
