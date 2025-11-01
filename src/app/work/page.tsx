import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function WorkPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center">
            <Briefcase className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl">Work</CardTitle>
          <CardDescription>Your work location details.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-lg">This is the placeholder page for your work location.</p>
            <p className="text-muted-foreground mt-2">You can customize this page to show relevant information like commute times, nearby lunch spots, or meeting schedules.</p>
        </CardContent>
      </Card>
    </div>
  );
}
