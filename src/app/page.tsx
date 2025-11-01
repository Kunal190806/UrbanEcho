import { Menu, Map, Lightbulb, Leaf, BookHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { FavoritePlaces } from '@/components/dashboard/favorite-places';
import { SmartCityStatus } from '@/components/dashboard/smart-city-status';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserMenu } from '@/components/auth/user-menu';
import { FirebaseProvider } from '@/firebase/provider';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const QuickAction = ({ icon, title, href, className }: { icon: React.ReactNode, title: string, href: string, className?: string }) => (
  <Link href={href}>
    <Card className="hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center text-center h-full">
      <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${className}`}>
        {icon}
      </div>
      <p className="font-semibold text-sm text-foreground">{title}</p>
    </Card>
  </Link>
);


export default function Home() {
  return (
    <FirebaseProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <aside className="hidden border-r bg-card lg:block">
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
            <header className="flex h-16 items-center gap-4 border-b bg-card px-6 sticky top-0 z-30">
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
                <SheetContent side="left" className="flex flex-col p-0">
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
                  <div className="mt-auto p-4 border-t">
                    <SmartCityStatus />
                  </div>
                </SheetContent>
              </Sheet>
              <div className="flex-1" />
              <UserMenu />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
              <div className="relative flex items-center justify-start p-8 h-48 w-full overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg">
                 <div className='text-white'>
                   <h1 className='text-sm font-medium bg-white/20 px-2 py-1 rounded-md inline-block mb-2'>Smart Cities India</h1>
                   <h2 className="text-3xl font-bold text-white font-headline">Urban Travel Made Easy</h2>
                   <p className='text-white/90 mt-1'>Plan, book, and track your journey across India's smart cities</p>
                 </div>
              </div>

               <div>
                 <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <QuickAction 
                      href="/#planner"
                      icon={<Map className="w-8 h-8 text-white" />}
                      title="Plan Route"
                      className="bg-gradient-to-br from-red-500 to-orange-400"
                    />
                    <QuickAction 
                      href="/#discover"
                      icon={<Lightbulb className="w-8 h-8 text-white" />}
                      title="Discover"
                      className="bg-gradient-to-br from-blue-500 to-cyan-400"
                    />
                    <QuickAction 
                      href="/#eco"
                      icon={<Leaf className="w-8 h-8 text-white" />}
                      title="Eco-Routes"
                      className="bg-gradient-to-br from-purple-500 to-violet-400"
                    />
                     <QuickAction 
                      href="/#journal"
                      icon={<BookHeart className="w-8 h-8 text-white" />}
                      title="Memory Journal"
                      className="bg-gradient-to-br from-pink-500 to-rose-400"
                    />
                 </div>
               </div>
            </main>
          </div>
        </div>
      </div>
    </FirebaseProvider>
  );
}
