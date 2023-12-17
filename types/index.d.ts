import type { ReactNode } from 'react';

export type LayoutProps = {
  children: ReactNode;
  classNames?: string;
};

export interface CreateUserProps {
  id: string;
  email: string;
  name: string;
  phone?:string;
  type?: 'worker' | 'company';
}

export interface SignUpProps {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  phone?:string;
  type?: 'worker' | 'company';
}

export type UpdateUserProps = Optional<CreateUserProps> & {
  company?: Record<string, string>;
  worker?: Record<string, string>;
};

export interface Day {
  date: Date;
  isActive: boolean;
  key: string;
  propKey: string;
}

export type CalendarRange = {
  days: Array<Day>;
  start: Date;
  end: Date;
};

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Geometry {
  location: Location;
}

export interface GoogleMapAddress {
  address_components: AddressComponent[];
  formatted_address: string;
  place_id: string;
  geometry: Geometry;
}

export interface Address {
  address: string;
  placeId: string;
  city?: string;
  country?: string;
  streetName?: string;
  streetNumber?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
}

export interface Config {
  search: boolean;
}

export interface ScheduleLocation {
  id: string;
  address: string;
}

export interface ScheduleMember {
  id: string;
  name: string;
}

export interface ChooseDatesState {
  location: ScheduleLocation;
  workers: ScheduleMember[];
}

export interface SelectedDate {
  date: Date;
  key: string;
}
