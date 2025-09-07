# AI-Powered Itinerary Planner

A comprehensive travel planning application that uses AI to create personalized day-by-day travel itineraries covering Travel, Food, and Stay with smart sub-categories and color-coded visual plans.

## Features

### 🔹 Key Capabilities
1. **End-to-End Personalization**
   - User selects destination, travel dates, budget range, and preferences
   - AI generates complete day-wise itinerary with timings, places, meals, and stay options

2. **Categories Covered**
   - **Travel**: Palaces, forts, temples, adventure spots, heritage sites
   - **Food**: Street food, cultural dishes, fine dining, local specialties
   - **Stay**: Hotels, apartments, homestays, boutique heritage stays

3. **Nearby Integration**
   - "Add Nearby Places" button for quick attraction inclusion
   - Smart suggestions based on popularity and hidden gems

4. **Interactive Planner**
   - Color-coded activity blocks (Blue for Travel, Green for Food, Orange for Stay, Purple for Hidden Gems)
   - Tap on blocks to see details, photos, and reviews

5. **AI Optimization**
   - Automatically arranges itinerary by distance, travel time, and best visiting hours
   - Dynamic adjustment when users remove or add activities

6. **Export & Share**
   - Download itinerary as PDF
   - Share with friends or travel group

## Screens

### 1. Itinerary Planner Home Screen
- Header: "Plan Your Journey"
- Input Section with destination search, date picker, budget slider, and interest tags
- Main CTA: "Start Planning"

### 2. AI Generated Itinerary Screen
- Header: "Your Smart Plan"
- Day Tabs: Horizontal scroll (Day 1, Day 2, Day 3...)
- Timeline View with color-coded blocks for different time slots
- Floating Action Button for customization

### 3. Detailed Activity View
- Image carousel with photos
- Detailed description and information
- Distance & time from previous activity
- Save and replace options

### 4. Final Plan Summary Screen
- Visual chart with multi-color timeline
- Download & Share buttons
- Complete itinerary overview

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS3 with modern features (Grid, Flexbox, Gradients)
- **Icons**: Lucide React
- **Date Handling**: React DatePicker
- **PDF Export**: jsPDF with html2canvas
- **Build Tool**: Create React App

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── ItineraryPlannerHome.tsx      # Home screen with input form
│   ├── AIGeneratedItinerary.tsx      # Main itinerary display
│   ├── DayTabs.tsx                   # Day navigation tabs
│   ├── ActivityBlock.tsx             # Individual activity cards
│   ├── DetailedActivityView.tsx      # Activity detail modal
│   └── FinalPlanSummary.tsx          # Summary and export screen
├── types/
│   └── index.ts                      # TypeScript type definitions
├── App.tsx                           # Main application component
├── App.css                           # Global styles
└── index.tsx                         # Application entry point
```

## Design System

### Colors
- **Travel**: Blue gradient (#3b82f6 to #1d4ed8)
- **Food**: Green gradient (#10b981 to #059669)
- **Stay**: Orange gradient (#f59e0b to #d97706)
- **Hidden Gems**: Purple gradient (#8b5cf6 to #7c3aed)

### UI Theme
- Clean, modern, responsive design
- Professional pastel color scheme
- Minimal line icons
- Smooth animations and transitions

## Features in Detail

### Smart Itinerary Generation
The app generates realistic itineraries based on user preferences, including:
- Time-optimized scheduling
- Distance-based activity grouping
- Budget-aware recommendations
- Interest-based activity selection

### Interactive Elements
- Drag-and-drop activity reordering
- Real-time budget calculations
- Dynamic nearby place suggestions
- One-click activity replacement

### Export Capabilities
- PDF generation with full itinerary details
- Shareable links for collaboration
- Print-friendly layouts
- Mobile-optimized views

## Future Enhancements

- Real AI integration for dynamic recommendations
- User reviews and ratings system
- Social sharing and collaboration features
- Offline mode support
- Multi-language support
- Advanced filtering and search
- Integration with booking platforms

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.