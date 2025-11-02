
import type { LucideIcon } from 'lucide-react';
import { Home, Map, Briefcase, Library, Zap, LayoutDashboard } from 'lucide-react';

export type FavoritePlace = {
  name: string;
  address: string;
  icon: LucideIcon;
  href: string;
};

export const favoritePlaces: FavoritePlace[] = [
  {
    name: 'Energy Hub',
    address: 'Monitor your home consumption',
    icon: Zap,
    href: '/',
  },
  {
    name: 'Dashboard',
    address: 'Your city companion',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    name: 'Work',
    address: 'Cyber Hub, Gurugram',
    icon: Briefcase,
    href: '/work',
  },
  {
    name: 'City Library',
    address: 'Discover new places',
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
];

export type Attraction = {
  id: string;
  name: string;
  description: string;
  rating: number;
  distance: string;
  imageId: string;
  city: string;
};

export const topAttractions: Attraction[] = [
  {
    id: "attr-1",
    name: "India Gate",
    description: "War memorial standing tall in the heart of Delhi.",
    rating: 4.8,
    distance: "2.5 km",
    imageId: "explore-1",
    city: "Delhi",
  },
  {
    id: "attr-2",
    name: "Hauz Khas Village",
    description: "A perfect blend of history, art, and urban culture.",
    rating: 4.6,
    distance: "8.1 km",
    imageId: "explore-2",
    city: "Delhi",
  },
  {
    id: "attr-3",
    name: "Qutub Minar",
    description: "A towering minaret and UNESCO World Heritage Site.",
    rating: 4.7,
    distance: "10.3 km",
    imageId: "explore-3",
    city: "Delhi",
  },
  {
    id: "attr-4",
    name: "Gateway of India",
    description: "An arch-monument built in the early 20th century.",
    rating: 4.7,
    distance: "N/A",
    imageId: "poi-1",
    city: "Mumbai",
  },
  {
    id: "attr-5",
    name: "Marine Drive",
    description: "A 3.6-kilometre-long boulevard in South Mumbai.",
    rating: 4.8,
    distance: "N/A",
    imageId: "poi-2",
    city: "Mumbai",
  },
  {
    id: "attr-6",
    name: "Elephanta Caves",
    description: "A network of sculpted caves on Elephanta Island.",
    rating: 4.5,
    distance: "N/A",
    imageId: "poi-3",
    city: "Mumbai",
  },
  {
    id: "attr-7",
    name: "Sanjay Gandhi National Park",
    description: "A large protected area in the northern part of Mumbai.",
    rating: 4.4,
    distance: "N/A",
    imageId: "poi-4",
    city: "Mumbai",
  },
];
