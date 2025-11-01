import Link from "next/link";
import { favoritePlaces } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

export function FavoritePlaces() {
  return (
    <div className="space-y-2">
      <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
        Favorites
      </h3>
      <div className="grid gap-1">
        {favoritePlaces.map((place) => (
          <Link
            key={place.name}
            href="#"
            className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/50 hover:text-accent-foreground"
          >
            <place.icon className="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground" />
            <span>{place.name}</span>
          </Link>
        ))}
      </div>
      <Separator className="my-4" />
    </div>
  );
}
