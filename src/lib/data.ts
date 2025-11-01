
import type { LucideIcon } from 'lucide-react';
import { Home, Briefcase, Library, Map, Zap } from 'lucide-react';

export type FavoritePlace = {
  name: string;
  address: string;
  icon: LucideIcon;
  href: string;
};

export const favoritePlaces: FavoritePlace[] = [
  {
    name: 'Home',
    address: 'Monitor your home consumption',
    icon: Home,
    href: '/',
  },
  {
    name: 'Route Planner',
    address: 'Plan your daily commute',
    icon: Map,
    href: '/energy',
  },
  {
    name: 'Work',
    address: 'Cyber Hub, Gurugram',
    icon: Briefcase,
    href: '/work',
  },
  {
    name: 'City Library',
    address: 'Nehru Memorial Museum & Library',
    icon: Library,
    href: '/city-library',
  },
];

export type Status = 'good' | 'moderate' | 'poor';

export type SmartCityStatusItem = {
  label: string;
  value: string;
  status: Status;
};

export const smartCityData: SmartCityStatusItem[] = [
  {
    label: 'Traffic',
    value: 'Light',
    status: 'good',
  },
  {
    label: 'Public Transit',
    value: 'On Time',
    status: 'good',
  },
  {
    label: 'Air Quality',
    value: 'Moderate',
    status: 'moderate',
  },
  {
    label: 'Parking',
    value: 'Limited',
    status: 'poor',
  },
];

export type UpcomingMetro = {
  line: string;
  station: string;
  arrival: string;
  color: string;
};

export const upcomingMetros: UpcomingMetro[] = [
  {
    line: 'Yellow Line',
    station: 'Rajiv Chowk',
    arrival: '2 mins',
    color: 'bg-yellow-400',
  },
  {
    line: 'Blue Line',
    station: 'Mandi House',
    arrival: '5 mins',
    color: 'bg-blue-500',
  },
  {
    line: 'Violet Line',
    station: 'Kashmere Gate',
    arrival: '8 mins',
    color: 'bg-violet-500',
  },
];

export type NearbyStation = {
  name: string;
  distance: string;
  type: 'EV' | 'Petrol';
};

export const nearbyStations: NearbyStation[] = [
  {
    name: 'Tata Power EZ Charge',
    distance: '1.5 km',
    type: 'EV',
  },
  {
    name: 'Indian Oil Petrol Pump',
    distance: '2.1 km',
    type: 'Petrol',
  },
];

export type FeaturedLibrary = {
    name: string;
    location: string;
    status: "Open" | "Closed";
    timing: string;
    rating: number;
}

export const featuredLibraries: FeaturedLibrary[] = [
    {
        name: "Central City Library",
        location: "Connaught Place, Delhi",
        status: "Open",
        timing: "Closes 9 PM",
        rating: 4.9,
    },
    {
        name: "Nehru Memorial Museum & Library",
        location: "Teen Murti Marg, Delhi",
        status: "Open",
        timing: "Closes 5 PM",
        rating: 4.8,
    },
    {
        name: "The Community Bookshelf",
        location: "Sector 56, Gurugram",
        status: "Closed",
        timing: "Opens 10 AM",
        rating: 4.7,
    }
]

export type LibraryEvent = {
    title: string;
    library: string;
    date: string;
    time: string;
}

export const libraryEvents: LibraryEvent[] = [
    {
        title: "Author Meet & Greet with Anand Neelakantan",
        library: "Central City Library",
        date: "JUL 28",
        time: "6:00 PM - 7:00 PM",
    },
    {
        title: "Children's Storytelling Hour",
        library: "The Community Bookshelf",
        date: "AUG 02",
        time: "11:00 AM - 12:00 PM",
    }
]

export type NewBookArrival = {
    title: string;
    author: string;
    imageId: string;
}

export const newBookArrivals: NewBookArrival[] = [
    {
        title: "The Women",
        author: "Kristin Hannah",
        imageId: "book-1",
    },
    {
        title: "The Heaven & Earth Grocery Store",
        author: "James McBride",
        imageId: "book-2",
    },
    {
        title: "Knife",
        author: "Salman Rushdie",
        imageId: "book-3",
    }
]
