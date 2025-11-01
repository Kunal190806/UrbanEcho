
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Library, Search, Calendar, Star, MapPin, Bookmark } from "lucide-react";
import { featuredLibraries, libraryEvents, newBookArrivals } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function CityLibraryPage() {
  const libraryImage = PlaceHolderImages.find(img => img.id === 'library-hero');

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
            {libraryImage && (
                <Image
                    src={libraryImage.imageUrl}
                    alt={libraryImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={libraryImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
            <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-3xl font-bold text-white font-headline">City Library Hub</h1>
                <p className="text-white/90 max-w-2xl mt-2">Discover, access, and engage with public and private libraries across your city.</p>
            </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Search /> AI-Powered Book Finder</CardTitle>
          <CardDescription>Search by title, author, or genre and get directions to the nearest library with the book.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex gap-2">
                <Input placeholder="Search for 'The Midnight Library'..." />
                <Button>Search</Button>
            </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold font-headline mb-4">Featured Libraries</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredLibraries.map((library) => (
            <Card key={library.name} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{library.name}</span>
                    <Badge variant={library.status === "Open" ? "default" : "secondary"} className={library.status === "Open" ? "bg-green-100 text-green-800" : ""}>{library.status}</Badge>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1"><MapPin className="h-4 w-4" /> {library.location}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <p>{library.timing}</p>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                        <span>{library.rating}</span>
                    </div>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2">
                <Button variant="outline"><MapPin className="mr-2 h-4 w-4" /> Directions</Button>
                <Button><Bookmark className="mr-2 h-4 w-4" /> Save</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
            <h2 className="text-2xl font-semibold font-headline mb-4">Upcoming Events & Reading Clubs</h2>
            <div className="space-y-4">
            {libraryEvents.map((event) => (
                <Card key={event.title}>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                            <span className="text-xs font-bold uppercase">{event.date.split(' ')[0]}</span>
                            <span className="text-2xl font-bold">{event.date.split(' ')[1]}</span>
                        </div>
                        <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription>{event.library} &bull; {event.time}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardFooter>
                        <Button variant="outline" className="w-full"><Calendar className="mr-2" /> Set Reminder</Button>
                    </CardFooter>
                </Card>
            ))}
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-semibold font-headline mb-4">New Arrivals</h2>
            <div className="space-y-2">
            {newBookArrivals.map((book) => {
                const bookImage = PlaceHolderImages.find(img => img.id === book.imageId);
                return (
                <Card key={book.title} className="flex items-center gap-4 p-4">
                    {bookImage && (
                        <Image src={bookImage.imageUrl} alt={book.title} width={60} height={90} className="rounded-md object-cover" data-ai-hint={bookImage.imageHint}/>
                    )}
                    <div className="flex-grow">
                        <p className="font-semibold">{book.title}</p>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                    <Button variant="ghost" size="icon"><Bookmark/></Button>
                </Card>
            )})}
            </div>
        </div>
      </div>

    </div>
  );
}
