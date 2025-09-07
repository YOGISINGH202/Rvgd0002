import React, { useState } from 'react';
import { Itinerary, Activity } from '../types';
import { ArrowLeft, Plus, Download, Share2, Clock, MapPin, Star } from 'lucide-react';
import ActivityBlock from './ActivityBlock';
import DayTabs from './DayTabs';
import { nearbyPlaces } from '../data/sampleData';
import './AIGeneratedItinerary.css';

interface AIGeneratedItineraryProps {
  itinerary: Itinerary;
  onActivityClick: (activityId: string) => void;
  onViewSummary: () => void;
  onBackToHome: () => void;
}

const AIGeneratedItinerary: React.FC<AIGeneratedItineraryProps> = ({
  itinerary,
  onActivityClick,
  onViewSummary,
  onBackToHome
}) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [showAddNearby, setShowAddNearby] = useState<string | null>(null);

  const currentDay = itinerary.days[selectedDay];
  const totalDays = itinerary.days.length;

  const getTimeSlotLabel = (timeSlot: string) => {
    switch (timeSlot) {
      case 'morning': return 'Morning';
      case 'afternoon': return 'Afternoon';
      case 'evening': return 'Evening';
      case 'night': return 'Night';
      default: return timeSlot;
    }
  };

  const getTimeSlotIcon = (timeSlot: string) => {
    switch (timeSlot) {
      case 'morning': return '🌅';
      case 'afternoon': return '☀️';
      case 'evening': return '🌆';
      case 'night': return '🌙';
      default: return '⏰';
    }
  };

  const groupActivitiesByTimeSlot = (activities: Activity[]) => {
    const grouped: { [key: string]: Activity[] } = {
      morning: [],
      afternoon: [],
      evening: [],
      night: []
    };

    activities.forEach(activity => {
      if (grouped[activity.timeSlot]) {
        grouped[activity.timeSlot].push(activity);
      }
    });

    return grouped;
  };

  const groupedActivities = groupActivitiesByTimeSlot(currentDay.activities);

  return (
    <div className="itinerary-container">
      <div className="itinerary-header">
        <div className="header-top">
          <button className="btn btn-outline" onClick={onBackToHome}>
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <Share2 size={20} />
              Share
            </button>
            <button className="btn btn-secondary">
              <Download size={20} />
              Export
            </button>
          </div>
        </div>
        
        <div className="header-content">
          <h1>Your Smart Plan</h1>
          <div className="trip-info">
            <div className="info-item">
              <MapPin size={16} />
              <span>{itinerary.userPreferences.destination}</span>
            </div>
            <div className="info-item">
              <Clock size={16} />
              <span>{totalDays} days</span>
            </div>
            <div className="info-item">
              <Star size={16} />
              <span>AI Optimized</span>
            </div>
          </div>
        </div>
      </div>

      <div className="itinerary-content">
        <DayTabs
          days={itinerary.days}
          selectedDay={selectedDay}
          onDaySelect={setSelectedDay}
        />

        <div className="timeline-container">
          <div className="timeline-header">
            <h2>Day {selectedDay + 1} - {currentDay.date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}</h2>
            <button 
              className="btn btn-primary customize-btn"
              onClick={onViewSummary}
            >
              <Plus size={20} />
              Customize
            </button>
          </div>

          <div className="timeline">
            {Object.entries(groupedActivities).map(([timeSlot, activities]) => (
              <div key={timeSlot} className="time-slot">
                <div className="time-slot-header">
                  <div className="time-slot-icon">
                    {getTimeSlotIcon(timeSlot)}
                  </div>
                  <h3>{getTimeSlotLabel(timeSlot)}</h3>
                  <div className="time-slot-line"></div>
                </div>
                
                <div className="activities-list">
                  {activities.map((activity) => (
                    <div key={activity.id} className="activity-wrapper">
                      <ActivityBlock
                        activity={activity}
                        onClick={() => onActivityClick(activity.id)}
                        onAddNearby={() => setShowAddNearby(activity.id)}
                      />
                      {showAddNearby === activity.id && (
                        <div className="nearby-places">
                          <h4>Nearby Places</h4>
                          <div className="nearby-list">
                            {nearbyPlaces.slice(0, 3).map((place) => (
                              <div key={place.id} className="nearby-item">
                                <div className={`nearby-icon activity-${place.type}`}>
                                  {place.type === 'travel' ? '🏛️' : 
                                   place.type === 'food' ? '🍜' : 
                                   place.type === 'shopping' ? '🛍️' : '✨'}
                                </div>
                                <div className="nearby-info">
                                  <h5>{place.name}</h5>
                                  <p>{place.distance} km • {place.rating}★</p>
                                </div>
                                <button className="btn btn-outline">Add</button>
                              </div>
                            ))}
                          </div>
                          <button 
                            className="btn btn-outline"
                            onClick={() => setShowAddNearby(null)}
                          >
                            Close
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="floating-actions">
        <button className="fab customize-fab" onClick={onViewSummary}>
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default AIGeneratedItinerary;