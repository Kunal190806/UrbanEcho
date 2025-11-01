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
