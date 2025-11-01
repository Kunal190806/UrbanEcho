import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Coffee } from "lucide-react";

export default function CoffeePage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center">
            <Coffee className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl">Blue Tokai Coffee</CardTitle>
          <CardDescription>Your favorite coffee spot.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-lg">This is the placeholder page for your favorite coffee shop.</p>
            <p className="text-muted-foreground mt-2">Imagine seeing their daily specials, your loyalty points, or even placing an order right from here!</p>
        </CardContent>
      </Card>
    </div>
  );
}
