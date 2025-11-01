import { smartCityData } from "@/lib/data";
import type { Status } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const StatusIndicator = ({ status }: { status: Status }) => (
  <span
    aria-label={`${status} status`}
    className={cn("h-2.5 w-2.5 rounded-full", {
      "bg-[hsl(var(--chart-2))]": status === "good",
      "bg-[hsl(var(--chart-4))]": status === "moderate",
      "bg-destructive": status === "poor",
    })}
  />
);

export function SmartCityStatus() {
  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardHeader className="p-0 px-3 mb-3">
        <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
          City Pulse
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="space-y-3 px-3">
          {smartCityData.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-3">
                <StatusIndicator status={item.status} />
                <span className="text-muted-foreground">{item.label}</span>
              </div>
              <span className="font-medium">{item.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
