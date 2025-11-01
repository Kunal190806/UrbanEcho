import Link from "next/link";
import { favoritePlaces } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

export function FavoritePlaces() {
  const activeItem = "Home"; // This would be dynamic in a real app

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
            className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeItem === place.name
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <place.icon className={`h-5 w-5 ${activeItem !== place.name && "text-muted-foreground group-hover:text-accent-foreground"}`} />
            <span>{place.name}</span>
          </Link>
        ))}
      </div>
      <Separator className="my-4" />
    </div>
  );
}
