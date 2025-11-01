
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Library, BookOpen, Search, Calendar, Star, BookKey } from "lucide-react";

export default function CityLibraryPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="items-center text-center">
            <Library className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl">City Library Hub</CardTitle>
          <CardDescription className="max-w-prose">
            Discover, access, and engage with public and private libraries across your city, making reading more accessible and modern.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="text-center">
                <p className="text-muted-foreground">This hub will blend education, technology, and community learning. Here are some of the features planned:</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-4 rounded-lg border p-4">
                    <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold">Live Library Data</h3>
                        <p className="text-sm text-muted-foreground">Check for available books, library timings, events, and new arrivals in real-time.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                    <Search className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold">AI-Powered Book Finder</h3>
                        <p className="text-sm text-muted-foreground">Search by title, author, or genre and get directions to the nearest library with the book.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                    <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold">Events & Reading Clubs</h3>
                        <p className="text-sm text-muted-foreground">Get updates on special programs, join reading clubs, and set reminders for events.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                    <Star className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold">Personalize Your Experience</h3>
                        <p className="text-sm text-muted-foreground">Save favorite libraries, book reading slots, and manage your membership options.</p>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
