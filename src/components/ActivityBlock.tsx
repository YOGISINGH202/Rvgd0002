import React from 'react';
import { Activity } from '../types';
import { Clock, MapPin, Star, Plus, ArrowRight } from 'lucide-react';
import './ActivityBlock.css';

interface ActivityBlockProps {
  activity: Activity;
  onClick: () => void;
  onAddNearby: () => void;
}

const ActivityBlock: React.FC<ActivityBlockProps> = ({ activity, onClick, onAddNearby }) => {
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
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className={`activity-block activity-${activity.type}`} onClick={onClick}>
      <div className="activity-header">
        <div className="activity-icon">
          {getActivityIcon(activity.type)}
        </div>
        <div className="activity-info">
          <div className="activity-type">{getActivityTypeLabel(activity.type)}</div>
          <h3 className="activity-name">{activity.name}</h3>
        </div>
        <div className="activity-arrow">
          <ArrowRight size={20} />
        </div>
      </div>

      <div className="activity-content">
        <p className="activity-description">{activity.description}</p>
        
        <div className="activity-details">
          <div className="detail-item">
            <Clock size={14} />
            <span>{formatDuration(activity.duration)}</span>
          </div>
          <div className="detail-item">
            <MapPin size={14} />
            <span>{activity.location}</span>
          </div>
          <div className="detail-item">
            <Star size={14} />
            <span>{activity.rating}</span>
          </div>
          {activity.price && (
            <div className="detail-item">
              <span className="price">${activity.price}</span>
            </div>
          )}
        </div>

        {activity.distance && (
          <div className="distance-info">
            <span>📍 {activity.distance}km from previous activity</span>
          </div>
        )}

        <div className="activity-actions">
          <button 
            className="btn btn-outline add-nearby-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddNearby();
            }}
          >
            <Plus size={16} />
            Add Nearby
          </button>
        </div>
      </div>

      {activity.images && activity.images.length > 0 && (
        <div className="activity-image">
          <img 
            src={activity.images[0]} 
            alt={activity.name}
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.currentTarget.src = `https://via.placeholder.com/400x200/667eea/ffffff?text=${encodeURIComponent(activity.name)}`;
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ActivityBlock;