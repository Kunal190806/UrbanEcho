import type { LucideIcon } from 'lucide-react';
import { Home, Briefcase, Library, Coffee } from 'lucide-react';

export type FavoritePlace = {
  name: string;
  address: string;
  icon: LucideIcon;
};

export const favoritePlaces: FavoritePlace[] = [
  {
    name: 'Home',
    address: '123 Solitude Street, Apt 4B',
    icon: Home,
  },
  {
    name: 'Work',
    address: '456 Innovation Avenue',
    icon: Briefcase,
  },
  {
    name: 'City Library',
    address: '789 Knowledge Blvd',
    icon: Library,
  },
  {
    name: 'The Daily Grind',
    address: '101 Caffeine Corner',
    icon: Coffee,
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
    line: 'Red Line',
    station: 'Central Station',
    arrival: '2 mins',
    color: 'bg-red-500',
  },
  {
    line: 'Blue Line',
    station: 'Uptown Station',
    arrival: '5 mins',
    color: 'bg-blue-500',
  },
  {
    line: 'Green Line',
    station: 'Tech Park',
    arrival: '8 mins',
    color: 'bg-green-500',
  },
];

export type NearbyStation = {
  name: string;
  distance: string;
  type: 'EV' | 'Petrol';
};

export const nearbyStations: NearbyStation[] = [
  {
    name: 'ChargePoint Center',
    distance: '0.8 mi',
    type: 'EV',
  },
  {
    name: 'City Gas & Go',
    distance: '1.2 mi',
    type: 'Petrol',
  },
];
