import React from 'react';
import { DayPlan } from '../types';
import { Calendar } from 'lucide-react';
import './DayTabs.css';

interface DayTabsProps {
  days: DayPlan[];
  selectedDay: number;
  onDaySelect: (dayIndex: number) => void;
}

const DayTabs: React.FC<DayTabsProps> = ({ days, selectedDay, onDaySelect }) => {
  return (
    <div className="day-tabs-container">
      <div className="day-tabs">
        {days.map((day, index) => (
          <button
            key={day.day}
            className={`day-tab ${selectedDay === index ? 'active' : ''}`}
            onClick={() => onDaySelect(index)}
          >
            <div className="day-tab-content">
              <div className="day-number">Day {day.day}</div>
              <div className="day-date">
                <Calendar size={14} />
                {day.date.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
              <div className="day-activities-count">
                {day.activities.length} activities
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DayTabs;