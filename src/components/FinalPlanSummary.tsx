import React, { useRef } from 'react';
import { Itinerary, Activity } from '../types';
import { ArrowLeft, Download, Share2, Calendar, MapPin, DollarSign, Clock, Star } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './FinalPlanSummary.css';

interface FinalPlanSummaryProps {
  itinerary: Itinerary;
  onBackToHome: () => void;
}

const FinalPlanSummary: React.FC<FinalPlanSummaryProps> = ({ itinerary, onBackToHome }) => {
  const summaryRef = useRef<HTMLDivElement>(null);

  const getActivityTypeCount = (type: string) => {
    return itinerary.days
      .flatMap(day => day.activities)
      .filter(activity => activity.type === type).length;
  };

  const getTotalDuration = () => {
    const totalMinutes = itinerary.days
      .flatMap(day => day.activities)
      .reduce((sum, activity) => sum + activity.duration, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'travel': return '#3b82f6';
      case 'food': return '#10b981';
      case 'stay': return '#f59e0b';
      case 'hidden-gem': return '#8b5cf6';
      case 'culture': return '#ec4899';
      default: return '#64748b';
    }
  };

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'travel': return 'Travel';
      case 'food': return 'Food';
      case 'stay': return 'Stay';
      case 'hidden-gem': return 'Hidden Gems';
      case 'culture': return 'Culture';
      default: return 'Activities';
    }
  };

  const exportToPDF = async () => {
    if (!summaryRef.current) return;

    try {
      const canvas = await html2canvas(summaryRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`itinerary-${itinerary.userPreferences.destination}-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const shareItinerary = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My ${itinerary.userPreferences.destination} Itinerary`,
          text: `Check out my AI-generated travel itinerary for ${itinerary.userPreferences.destination}!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      const text = `My ${itinerary.userPreferences.destination} Itinerary\n\n${itinerary.days.map(day => 
        `Day ${day.day} (${day.date.toLocaleDateString()}):\n${day.activities.map(activity => 
          `- ${activity.name} (${activity.type})`
        ).join('\n')}`
      ).join('\n\n')}`;
      
      navigator.clipboard.writeText(text).then(() => {
        alert('Itinerary copied to clipboard!');
      });
    }
  };

  const totalDuration = getTotalDuration();

  return (
    <div className="summary-container">
      <div className="summary-header">
        <button className="btn btn-outline" onClick={onBackToHome}>
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={shareItinerary}>
            <Share2 size={20} />
            Share
          </button>
          <button className="btn btn-primary" onClick={exportToPDF}>
            <Download size={20} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="summary-content" ref={summaryRef}>
        <div className="summary-title">
          <h1>Your Complete Itinerary</h1>
          <p>{itinerary.userPreferences.destination} • {itinerary.days.length} days</p>
        </div>

        <div className="summary-stats">
          <div className="stat-card">
            <Calendar size={24} />
            <div className="stat-content">
              <span className="stat-value">{itinerary.days.length}</span>
              <span className="stat-label">Days</span>
            </div>
          </div>
          <div className="stat-card">
            <MapPin size={24} />
            <div className="stat-content">
              <span className="stat-value">{itinerary.days.flatMap(day => day.activities).length}</span>
              <span className="stat-label">Activities</span>
            </div>
          </div>
          <div className="stat-card">
            <Clock size={24} />
            <div className="stat-content">
              <span className="stat-value">{totalDuration.hours}h {totalDuration.minutes}m</span>
              <span className="stat-label">Total Time</span>
            </div>
          </div>
          <div className="stat-card">
            <DollarSign size={24} />
            <div className="stat-content">
              <span className="stat-value">${itinerary.totalCost}</span>
              <span className="stat-label">Estimated Cost</span>
            </div>
          </div>
        </div>

        <div className="activity-breakdown">
          <h2>Activity Breakdown</h2>
          <div className="breakdown-chart">
            {['travel', 'food', 'stay', 'hidden-gem', 'culture'].map(type => {
              const count = getActivityTypeCount(type);
              const percentage = itinerary.days.flatMap(day => day.activities).length > 0 
                ? (count / itinerary.days.flatMap(day => day.activities).length) * 100 
                : 0;
              
              return (
                <div key={type} className="breakdown-item">
                  <div className="breakdown-label">
                    <div 
                      className="breakdown-color" 
                      style={{ backgroundColor: getActivityTypeColor(type) }}
                    />
                    <span>{getActivityTypeLabel(type)}</span>
                  </div>
                  <div className="breakdown-bar">
                    <div 
                      className="breakdown-fill"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: getActivityTypeColor(type)
                      }}
                    />
                  </div>
                  <span className="breakdown-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="daily-timeline">
          <h2>Daily Timeline</h2>
          <div className="timeline-visual">
            {itinerary.days.map((day, dayIndex) => (
              <div key={day.day} className="day-timeline">
                <div className="day-header">
                  <h3>Day {day.day}</h3>
                  <span className="day-date">{day.date.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="day-activities">
                  {day.activities.map((activity, activityIndex) => (
                    <div 
                      key={activity.id}
                      className="timeline-activity"
                      style={{ 
                        backgroundColor: getActivityTypeColor(activity.type),
                        width: `${(activity.duration / 480) * 100}%` // Assuming 8 hours max per day
                      }}
                    >
                      <span className="activity-name">{activity.name}</span>
                      <span className="activity-duration">{Math.floor(activity.duration / 60)}h {activity.duration % 60}m</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detailed-schedule">
          <h2>Detailed Schedule</h2>
          {itinerary.days.map(day => (
            <div key={day.day} className="day-schedule">
              <h3>Day {day.day} - {day.date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}</h3>
              <div className="schedule-activities">
                {day.activities.map(activity => (
                  <div key={activity.id} className="schedule-activity">
                    <div 
                      className="activity-type-indicator"
                      style={{ backgroundColor: getActivityTypeColor(activity.type) }}
                    />
                    <div className="activity-details">
                      <h4>{activity.name}</h4>
                      <p>{activity.description}</p>
                      <div className="activity-meta">
                        <span className="activity-location">{activity.location}</span>
                        <span className="activity-duration">{Math.floor(activity.duration / 60)}h {activity.duration % 60}m</span>
                        {activity.price && <span className="activity-price">${activity.price}</span>}
                        <span className="activity-rating">
                          <Star size={14} />
                          {activity.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalPlanSummary;