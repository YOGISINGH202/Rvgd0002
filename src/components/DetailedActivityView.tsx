import React, { useState } from 'react';
import { Itinerary, Activity } from '../types';
import { ArrowLeft, Clock, MapPin, Star, DollarSign, Heart, Share2, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import './DetailedActivityView.css';

interface DetailedActivityViewProps {
  activityId: string;
  itinerary: Itinerary;
  onBack: () => void;
}

const DetailedActivityView: React.FC<DetailedActivityViewProps> = ({
  activityId,
  itinerary,
  onBack
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Find the activity across all days
  const activity = itinerary.days
    .flatMap(day => day.activities)
    .find(act => act.id === activityId);

  if (!activity) {
    return (
      <div className="detailed-view-container">
        <div className="error-state">
          <h2>Activity not found</h2>
          <button className="btn btn-primary" onClick={onBack}>
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'travel': return '🏰';
      case 'food': return '🍲';
      case 'stay': return '🏨';
      case 'hidden-gem': return '✨';
      case 'culture': return '🎭';
      default: return '📍';
    }
  };

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'travel': return 'Travel';
      case 'food': return 'Food';
      case 'stay': return 'Stay';
      case 'hidden-gem': return 'Hidden Gem';
      case 'culture': return 'Culture';
      default: return 'Activity';
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours} hours ${remainingMinutes} minutes` : `${hours} hours`;
  };

  const nextImage = () => {
    if (activity.images && activity.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === activity.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (activity.images && activity.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? activity.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="detailed-view-container">
      <div className="detailed-header">
        <button className="btn btn-outline" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Itinerary
        </button>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <Heart size={20} />
            Save
          </button>
          <button className="btn btn-secondary">
            <Share2 size={20} />
            Share
          </button>
        </div>
      </div>

      <div className="detailed-content">
        <div className="activity-gallery">
          {activity.images && activity.images.length > 0 ? (
            <div className="image-carousel">
              <img 
                src={activity.images[currentImageIndex]} 
                alt={activity.name}
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/600x400/667eea/ffffff?text=${encodeURIComponent(activity.name)}`;
                }}
              />
              {activity.images.length > 1 && (
                <>
                  <button className="carousel-btn prev" onClick={prevImage}>
                    <ChevronLeft size={24} />
                  </button>
                  <button className="carousel-btn next" onClick={nextImage}>
                    <ChevronRight size={24} />
                  </button>
                  <div className="carousel-indicators">
                    {activity.images.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="placeholder-image">
              <div className="placeholder-icon">
                {getActivityIcon(activity.type)}
              </div>
            </div>
          )}
        </div>

        <div className="activity-details">
          <div className="activity-header">
            <div className="activity-type-badge">
              <span className="type-icon">{getActivityIcon(activity.type)}</span>
              <span className="type-label">{getActivityTypeLabel(activity.type)}</span>
            </div>
            <h1 className="activity-title">{activity.name}</h1>
            <div className="activity-rating">
              <Star size={20} className="star-icon" />
              <span className="rating-value">{activity.rating}</span>
              <span className="rating-text">Excellent</span>
            </div>
          </div>

          <div className="activity-info-grid">
            <div className="info-item">
              <Clock size={20} />
              <div className="info-content">
                <span className="info-label">Duration</span>
                <span className="info-value">{formatDuration(activity.duration)}</span>
              </div>
            </div>
            <div className="info-item">
              <MapPin size={20} />
              <div className="info-content">
                <span className="info-label">Location</span>
                <span className="info-value">{activity.location}</span>
              </div>
            </div>
            {activity.price && (
              <div className="info-item">
                <DollarSign size={20} />
                <div className="info-content">
                  <span className="info-label">Price</span>
                  <span className="info-value">${activity.price}</span>
                </div>
              </div>
            )}
            {activity.distance && (
              <div className="info-item">
                <MapPin size={20} />
                <div className="info-content">
                  <span className="info-label">Distance</span>
                  <span className="info-value">{activity.distance}km from previous</span>
                </div>
              </div>
            )}
          </div>

          <div className="activity-description">
            <h3>About this place</h3>
            <p>{activity.description}</p>
            {activity.isHiddenGem && (
              <div className="hidden-gem-badge">
                <span>✨ Hidden Gem</span>
                <p>This is a local favorite that many tourists miss!</p>
              </div>
            )}
          </div>

          <div className="activity-actions">
            <button className="btn btn-primary">
              <Heart size={20} />
              Save for Later
            </button>
            <button className="btn btn-secondary">
              Replace in Plan
            </button>
            <button className="btn btn-outline">
              <Download size={20} />
              Download Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedActivityView;