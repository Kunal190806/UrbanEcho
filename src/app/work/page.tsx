
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Wifi, Clock, Users, MapPin, Filter, Search, Book, Star } from "lucide-react";

const coWorkingSpaces = [
  {
    name: "InnovateHub",
    location: "Cyber City, Gurugram",
    availability: "Available",
    amenities: ["Wi-Fi", "Coffee", "Meeting Room"],
    rating: 4.8,
  },
  {
    name: "Creator's Den",
    location: "Sector 29, Gurugram",
    availability: "Limited",
    amenities: ["Wi-Fi", "Quiet Zone"],
    rating: 4.5,
  },
  {
    name: "The Work Pad",
    location: "Udyog Vihar, Gurugram",
    availability: "Available",
    amenities: ["24/7 Access", "Wi-Fi", "Parking"],
    rating: 4.7,
  },
  {
    name: "Student Study Spot",
    location: "Near DU, Delhi",
    availability: "Available",
    amenities: ["Wi-Fi", "Quiet Zone", "Library Access"],
    rating: 4.9,
  },
  {
    name: "Freelancer's Nook",
    location: "Hauz Khas Village, Delhi",
    availability: "Full",
    amenities: ["Wi-Fi", "Coffee", "Art Gallery"],
    rating: 4.6,
  },
  {
    name: "CorpConnect",
    location: "Connaught Place, Delhi",
    availability: "Available",
    amenities: ["Wi-Fi", "Meeting Room", "Valet"],
    rating: 4.8,
  },
  {
    name: "WeWork BKC",
    location: "Bandra Kurla Complex, Mumbai",
    availability: "Available",
    amenities: ["Wi-Fi", "Coffee", "Networking Events"],
    rating: 4.9,
  },
  {
    name: "91springboard",
    location: "Andheri East, Mumbai",
    availability: "Limited",
    amenities: ["Wi-Fi", "Gaming Zone", "Free Snacks"],
    rating: 4.7,
  },
  {
    name: "BHIVE Workspace",
    location: "Koramangala, Bangalore",
    availability: "Available",
    amenities: ["Wi-Fi", "Mentorship", "Rooftop Cafe"],
    rating: 4.8,
  },
  {
    name: "CoWrks",
    location: "Whitefield, Bangalore",
    availability: "Available",
    amenities: ["Wi-Fi", "Gym Access", "Creche"],
    rating: 4.9,
  },
];

export default function WorkPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
            <h1 className="flex-1 text-2xl font-semibold font-headline md:text-3xl flex items-center gap-3"><Briefcase className="h-8 w-8 text-primary" /> City Work & Co-Working Spaces</h1>
            <p className="text-muted-foreground max-w-2xl">Connect to nearby work hubs, study cafés, and co-working spaces optimized for freelancers, students, and professionals.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by name or location..." className="pl-10" />
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline"><Filter className="mr-2" /> Smart Filters</Button>
            <Button variant="outline"><MapPin className="mr-2" /> Map View</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coWorkingSpaces.map((space) => (
          <Card key={space.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{space.name}</span>
                <Badge 
                  variant={space.availability === "Available" ? "default" : "secondary"}
                  className={space.availability === "Available" ? "bg-green-100 text-green-800" : space.availability === "Limited" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}
                >{space.availability}</Badge>
              </CardTitle>
              <CardDescription>{space.location}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div className="flex items-center justify-end text-lg font-bold text-primary">
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400" fill="currentColor"/>
                        <span>{space.rating}</span>
                    </div>
                </div>
              <div className="flex flex-wrap gap-2">
                {space.amenities.map(amenity => <Badge key={amenity} variant="outline">{amenity}</Badge>)}
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
              <Button variant="outline"><MapPin className="mr-2 h-4 w-4" />Directions</Button>
              <Button><Book className="mr-2 h-4 w-4" />Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

    </div>
  );
}
