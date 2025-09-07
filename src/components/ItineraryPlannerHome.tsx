import React, { useState } from 'react';
import { UserPreferences, Interest } from '../types';
import { MapPin, Calendar, DollarSign, Heart } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { sampleInterests } from '../data/sampleData';
import 'react-datepicker/dist/react-datepicker.css';

interface ItineraryPlannerHomeProps {
  onStartPlanning: (preferences: UserPreferences) => void;
}

const availableInterests = sampleInterests;

const ItineraryPlannerHome: React.FC<ItineraryPlannerHomeProps> = ({ onStartPlanning }) => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [budget, setBudget] = useState(1000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleStartPlanning = () => {
    if (!destination || !startDate || !endDate || selectedInterests.length === 0) {
      alert('Please fill in all required fields and select at least one interest.');
      return;
    }

    const preferences: UserPreferences = {
      destination,
      startDate,
      endDate,
      budget,
      interests: availableInterests.filter(interest => selectedInterests.includes(interest.id))
    };

    onStartPlanning(preferences);
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Plan Your Journey</h1>
        <p>Let AI create your perfect personalized travel itinerary</p>
      </div>

      <div className="home-content">
        <div className="input-card">
          <div className="input-section">
            <div className="input-group">
              <label htmlFor="destination">
                <MapPin size={20} />
                Destination
              </label>
              <input
                id="destination"
                type="text"
                className="input"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="date-group">
              <div className="input-group">
                <label htmlFor="start-date">
                  <Calendar size={20} />
                  Start Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select start date"
                  className="input"
                  dateFormat="MMM dd, yyyy"
                  minDate={new Date()}
                />
              </div>

              <div className="input-group">
                <label htmlFor="end-date">
                  <Calendar size={20} />
                  End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Select end date"
                  className="input"
                  dateFormat="MMM dd, yyyy"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="budget">
                <DollarSign size={20} />
                Budget Range: ${budget}
              </label>
              <input
                id="budget"
                type="range"
                min="200"
                max="5000"
                step="100"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="budget-slider"
              />
              <div className="budget-labels">
                <span>$200</span>
                <span>$5,000</span>
              </div>
            </div>

            <div className="interests-section">
              <label>
                <Heart size={20} />
                What interests you most?
              </label>
              <div className="interests-grid">
                {availableInterests.map((interest) => (
                  <button
                    key={interest.id}
                    className={`chip ${selectedInterests.includes(interest.id) ? 'selected' : ''}`}
                    onClick={() => handleInterestToggle(interest.id)}
                  >
                    <span>{interest.icon}</span>
                    {interest.name}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="btn btn-primary start-planning-btn"
              onClick={handleStartPlanning}
            >
              <span>Start Planning</span>
              <span>✨</span>
            </button>
          </div>
        </div>

        <div className="features-preview">
          <h3>What you'll get:</h3>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon activity-travel">🏰</div>
              <h4>Travel</h4>
              <p>Palaces, forts, temples, heritage sites</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon activity-food">🍲</div>
              <h4>Food</h4>
              <p>Street food, cultural dishes, fine dining</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon activity-stay">🏨</div>
              <h4>Stay</h4>
              <p>Hotels, homestays, boutique heritage stays</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon activity-hidden-gem">✨</div>
              <h4>Hidden Gems</h4>
              <p>Local secrets and off-the-beaten-path spots</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPlannerHome;