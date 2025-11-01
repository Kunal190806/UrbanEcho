
import type { LucideIcon } from 'lucide-react';
import { Home, Briefcase, Library, Bolt } from 'lucide-react';

export type FavoritePlace = {
  name: string;
  address: string;
  icon: LucideIcon;
  href: string;
};

export const favoritePlaces: FavoritePlace[] = [
  {
    name: 'Home',
    address: 'A-123, Lajpat Nagar, New Delhi',
    icon: Home,
    href: '/',
  },
  {
    name: 'Energy Hub',
    address: 'Your home energy dashboard',
    icon: Bolt,
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
