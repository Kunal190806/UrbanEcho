
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Briefcase, Wifi, Clock, Users, MapPin, Filter } from "lucide-react";

export default function WorkPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="items-center text-center">
            <Briefcase className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl">City Work & Co-Working Spaces</CardTitle>
          <CardDescription className="max-w-prose">
            Connect to nearby work hubs, study cafés, and co-working spaces optimized for freelancers, students, and professionals.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="text-center">
                <p className="text-muted-foreground">This hub makes the urban workforce more productive and helps map tech-enabled work clusters.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-4 rounded-lg border p-4">
                    <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold">Real-Time Availability</h3>
                        <p className="text-sm text-muted-foreground">Check seat availability, pricing, and amenities like Wi-Fi and power in real-time.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                    <Filter className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold">Smart Filters</h3>
                        <p className="text-sm text-muted-foreground">Filter by “quiet study zones,” “meeting-friendly,” or “open 24/7” to find the perfect spot.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold">Integrated Map View</h3>
                        <p className="text-sm text-muted-foreground">Visualize workspaces near metro stations, colleges, or residential areas.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                    <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold">Direct Booking</h3>
                        <p className="text-sm text-muted-foreground">Reserve desks, meeting rooms, or café spots directly through the app.</p>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
