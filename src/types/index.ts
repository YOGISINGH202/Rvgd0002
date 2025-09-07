export interface UserPreferences {
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  interests: Interest[];
}

export interface Interest {
  id: string;
  name: string;
  icon: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  type: ActivityType;
  duration: number; // in minutes
  timeSlot: TimeSlot;
  location: string;
  images: string[];
  rating: number;
  price?: number;
  distance?: number; // from previous activity
  isHiddenGem?: boolean;
}

export type ActivityType = 'travel' | 'food' | 'stay' | 'hidden-gem' | 'culture';

export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night';

export interface DayPlan {
  day: number;
  date: Date;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  userPreferences: UserPreferences;
  days: DayPlan[];
  totalCost: number;
  createdAt: Date;
}

export interface NearbyPlace {
  id: string;
  name: string;
  type: ActivityType;
  distance: number;
  rating: number;
  image: string;
}