import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { FavoritePlaces } from '@/components/dashboard/favorite-places';
import { SmartCityStatus } from '@/components/dashboard/smart-city-status';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { FirebaseProvider } from '@/firebase/provider';
import { UserMenu } from '@/components/auth/user-menu';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'UrbanEcho: Smart City Navigator',
  description: 'Your Smart City Memory Companion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
                      <SheetContent side="left" className="flex flex-col p-0">
                        <SheetHeader className="p-6">
                          <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
                        </SheetHeader>
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
                    <div className="flex-1" />
                    <ThemeToggle />
                    <UserMenu />
                  </header>
                  <main className="flex flex-1 flex-col">
                    {children}
                  </main>
                </div>
              </div>
            </div>
          </FirebaseProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
