
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Library } from "lucide-react";

export default function CityLibraryPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center">
            <Library className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl">City Library</CardTitle>
          <CardDescription>Your favorite library's details.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-lg">This is the placeholder page for the City Library.</p>
            <p className="text-muted-foreground mt-2">You could use this page to check for available books, opening hours, or upcoming events.</p>
        </CardContent>
      </Card>
    </div>
  );
}
