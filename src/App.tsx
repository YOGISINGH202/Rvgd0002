import React, { useState } from 'react';
import { Itinerary, UserPreferences, Activity } from './types';
import ItineraryPlannerHome from './components/ItineraryPlannerHome';
import AIGeneratedItinerary from './components/AIGeneratedItinerary';
import DetailedActivityView from './components/DetailedActivityView';
import FinalPlanSummary from './components/FinalPlanSummary';
import { sampleActivities } from './data/sampleData';
import './App.css';
import './components/ItineraryPlannerHome.css';
import './components/AIGeneratedItinerary.css';
import './components/DayTabs.css';
import './components/ActivityBlock.css';
import './components/DetailedActivityView.css';
import './components/FinalPlanSummary.css';

type AppScreen = 'home' | 'itinerary' | 'detail' | 'summary';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [currentItinerary, setCurrentItinerary] = useState<Itinerary | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const handleStartPlanning = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    // Generate AI itinerary based on preferences
    const itinerary = generateAIItinerary(preferences);
    setCurrentItinerary(itinerary);
    setCurrentScreen('itinerary');
  };

  const handleActivityClick = (activityId: string) => {
    setSelectedActivity(activityId);
    setCurrentScreen('detail');
  };

  const handleBackToItinerary = () => {
    setCurrentScreen('itinerary');
    setSelectedActivity(null);
  };

  const handleViewSummary = () => {
    setCurrentScreen('summary');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setUserPreferences(null);
    setCurrentItinerary(null);
    setSelectedActivity(null);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <ItineraryPlannerHome onStartPlanning={handleStartPlanning} />;
      case 'itinerary':
        return (
          <AIGeneratedItinerary
            itinerary={currentItinerary!}
            onActivityClick={handleActivityClick}
            onViewSummary={handleViewSummary}
            onBackToHome={handleBackToHome}
          />
        );
      case 'detail':
        return (
          <DetailedActivityView
            activityId={selectedActivity!}
            itinerary={currentItinerary!}
            onBack={handleBackToItinerary}
          />
        );
      case 'summary':
        return (
          <FinalPlanSummary
            itinerary={currentItinerary!}
            onBackToHome={handleBackToHome}
          />
        );
      default:
        return <ItineraryPlannerHome onStartPlanning={handleStartPlanning} />;
    }
  };

  return (
    <div className="app">
      {renderCurrentScreen()}
    </div>
  );
}

// Mock AI itinerary generation
function generateAIItinerary(preferences: UserPreferences): Itinerary {
  // This would typically call an AI service
  // For now, we'll generate a mock itinerary
  const days: any[] = [];
  const startDate = new Date(preferences.startDate);
  const endDate = new Date(preferences.endDate);
  const dayCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  for (let i = 0; i < dayCount; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    days.push({
      day: i + 1,
      date: currentDate,
      activities: generateDayActivities(i + 1, preferences)
    });
  }

  return {
    id: `itinerary-${Date.now()}`,
    userPreferences: preferences,
    days,
    totalCost: preferences.budget * 0.8, // Mock cost
    createdAt: new Date()
  };
}

function generateDayActivities(day: number, preferences: UserPreferences): Activity[] {
  const activities: Activity[] = [];
  
  // Get random activities for each time slot based on user interests
  const timeSlots: Array<keyof typeof sampleActivities> = ['morning', 'afternoon', 'evening', 'night'];
  
  timeSlots.forEach((timeSlot, index) => {
    const availableActivities = sampleActivities[timeSlot];
    const randomActivity = availableActivities[Math.floor(Math.random() * availableActivities.length)];
    
    // Create a unique activity for this day and time slot
    const activity: Activity = {
      ...randomActivity,
      id: `activity-${day}-${index + 1}`,
      location: preferences.destination,
      distance: index > 0 ? Math.random() * 3 + 0.5 : 0, // Random distance for non-first activities
      price: timeSlot === 'night' ? Math.floor(Math.random() * 150) + 50 : Math.floor(Math.random() * 30) + 5
    };
    
    // Adjust activities based on user interests
    if (preferences.interests.some(interest => interest.id === 'heritage') && timeSlot === 'morning') {
      activity.type = 'travel';
      activity.name = `Historic Site Visit - Day ${day}`;
    }
    
    if (preferences.interests.some(interest => interest.id === 'food') && timeSlot === 'afternoon') {
      activity.type = 'food';
      activity.name = `Local Food Experience - Day ${day}`;
    }
    
    if (preferences.interests.some(interest => interest.id === 'adventure') && timeSlot === 'evening') {
      activity.type = 'travel';
      activity.name = `Adventure Activity - Day ${day}`;
    }
    
    // Add hidden gems occasionally
    if (Math.random() < 0.3) {
      activity.type = 'hidden-gem';
      activity.isHiddenGem = true;
    }
    
    activities.push(activity);
  });

  return activities;
}

export default App;