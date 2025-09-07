import { Activity, Interest } from '../types';

export const sampleInterests: Interest[] = [
  { id: 'heritage', name: 'Heritage', icon: '🏛️' },
  { id: 'culture', name: 'Culture', icon: '🎭' },
  { id: 'food', name: 'Foodie', icon: '🍽️' },
  { id: 'adventure', name: 'Adventure', icon: '🏔️' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
  { id: 'photography', name: 'Photography', icon: '📸' },
  { id: 'nightlife', name: 'Nightlife', icon: '🌃' }
];

export const sampleActivities: { [key: string]: Activity[] } = {
  'morning': [
    {
      id: 'morning-1',
      name: 'Historic Palace Tour',
      description: 'Explore the magnificent royal palace with its stunning architecture and rich history dating back centuries.',
      type: 'travel',
      duration: 120,
      timeSlot: 'morning',
      location: 'City Center',
      images: ['https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400'],
      rating: 4.7,
      price: 25,
      distance: 0
    },
    {
      id: 'morning-2',
      name: 'Ancient Temple Visit',
      description: 'Discover the spiritual heart of the city at this centuries-old temple with intricate carvings.',
      type: 'travel',
      duration: 90,
      timeSlot: 'morning',
      location: 'Old Town',
      images: ['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400'],
      rating: 4.5,
      price: 5,
      distance: 2.5
    },
    {
      id: 'morning-3',
      name: 'Local Market Exploration',
      description: 'Immerse yourself in the vibrant local culture at the bustling morning market.',
      type: 'hidden-gem',
      duration: 75,
      timeSlot: 'morning',
      location: 'Market District',
      images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'],
      rating: 4.3,
      price: 0,
      distance: 1.2
    }
  ],
  'afternoon': [
    {
      id: 'afternoon-1',
      name: 'Traditional Street Food Tour',
      description: 'Taste authentic local delicacies from the best street vendors in the city.',
      type: 'food',
      duration: 90,
      timeSlot: 'afternoon',
      location: 'Food Quarter',
      images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400'],
      rating: 4.6,
      price: 15,
      distance: 0.8
    },
    {
      id: 'afternoon-2',
      name: 'Cultural Museum Visit',
      description: 'Learn about the rich cultural heritage through interactive exhibits and artifacts.',
      type: 'travel',
      duration: 105,
      timeSlot: 'afternoon',
      location: 'Cultural District',
      images: ['https://images.unsplash.com/photo-1555529669-2269763671c0?w=400'],
      rating: 4.4,
      price: 12,
      distance: 1.5
    },
    {
      id: 'afternoon-3',
      name: 'Artisan Workshop Experience',
      description: 'Watch local craftsmen create beautiful handmade items and try your hand at traditional crafts.',
      type: 'hidden-gem',
      duration: 120,
      timeSlot: 'afternoon',
      location: 'Artisan Quarter',
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'],
      rating: 4.8,
      price: 20,
      distance: 2.1
    }
  ],
  'evening': [
    {
      id: 'evening-1',
      name: 'Sunset Viewpoint',
      description: 'Enjoy breathtaking panoramic views of the city as the sun sets over the horizon.',
      type: 'travel',
      duration: 60,
      timeSlot: 'evening',
      location: 'Hill Station',
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'],
      rating: 4.9,
      price: 8,
      distance: 3.2
    },
    {
      id: 'evening-2',
      name: 'Fine Dining Experience',
      description: 'Savor exquisite local cuisine in an elegant restaurant with traditional ambiance.',
      type: 'food',
      duration: 120,
      timeSlot: 'evening',
      location: 'Upscale District',
      images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'],
      rating: 4.7,
      price: 45,
      distance: 1.8
    },
    {
      id: 'evening-3',
      name: 'Traditional Performance',
      description: 'Watch an authentic cultural performance featuring local music and dance.',
      type: 'culture' as const,
      duration: 90,
      timeSlot: 'evening',
      location: 'Cultural Center',
      images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
      rating: 4.5,
      price: 18,
      distance: 0.5
    }
  ],
  'night': [
    {
      id: 'night-1',
      name: 'Boutique Heritage Hotel',
      description: 'Stay in a beautifully restored heritage building with modern amenities and local charm.',
      type: 'stay',
      duration: 480,
      timeSlot: 'night',
      location: 'Historic Quarter',
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'],
      rating: 4.6,
      price: 120,
      distance: 0.3
    },
    {
      id: 'night-2',
      name: 'Luxury Resort',
      description: 'Relax in a world-class resort with spa facilities and stunning city views.',
      type: 'stay',
      duration: 480,
      timeSlot: 'night',
      location: 'Resort District',
      images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400'],
      rating: 4.8,
      price: 200,
      distance: 4.5
    },
    {
      id: 'night-3',
      name: 'Cozy Homestay',
      description: 'Experience local hospitality in a charming family-run homestay with authentic meals.',
      type: 'stay',
      duration: 480,
      timeSlot: 'night',
      location: 'Residential Area',
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'],
      rating: 4.4,
      price: 60,
      distance: 2.8
    }
  ]
};

export const nearbyPlaces = [
  {
    id: 'nearby-1',
    name: 'Local Art Gallery',
    type: 'travel' as const,
    distance: 0.2,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200'
  },
  {
    id: 'nearby-2',
    name: 'Coffee Shop',
    type: 'food' as const,
    distance: 0.1,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200'
  },
  {
    id: 'nearby-3',
    name: 'Souvenir Shop',
    type: 'shopping' as const,
    distance: 0.3,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200'
  },
  {
    id: 'nearby-4',
    name: 'Hidden Garden',
    type: 'hidden-gem' as const,
    distance: 0.4,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200'
  }
];