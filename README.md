# Calori

> **Open-Source, Mobile-First Calorie & Macro Tracker** inspired by WHOOP aesthetic and MyFitnessPal functionality.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React](https://img.shields.io/badge/React-18.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.1-purple.svg)
![Mobile First](https://img.shields.io/badge/Mobile-Optimized-green.svg)

---

## Features

- **Daily Calorie Target Bar**: Prominent top rectangular progress bar displaying logged intake vs target goal with real-time remaining calorie readouts.
- **Triple Macro Ring Gauges**: High-contrast, SVG radial progress gauges for **Carbs**, **Fat**, and **Protein** with exact center percentage alignment.
- **AI Nutrition Coach Banner**: Dynamic, context-aware feedback based on remaining daily macros and intake goals.
- **Macro & Energy Balance Equalizer**: 24-segment progress meter with live intake vs target score readouts.
- **Floating Glassmorphism Nav Bar**: Mobile-docked bottom navigation bar with elevated center `+ Quick Add` button.
- **Food Search Library & Persistent Custom Food Add**: Pre-seeded food database with portion multipliers (0.5x - 2x) and custom food auto-saving library.
- **Logged Data Trends & Insights**: Automatically extracts real-time averages, most frequently logged foods, peak intake days, and streak counts.
- **Cloud Storage Persistence & Firebase Integration**: Auto-generates persistent Cloud Session Keys (`CALORI-XXXXXX`) with Firebase Firestore sync and JSON export/import backup capabilities.

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- `npm` or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/ndunl075/calori.git

# Navigate to project directory
cd calori

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To access on a mobile device on your local WiFi network, navigate to `http://<YOUR_LOCAL_IP>:3000`.

---

## Project Structure

```
Calori/
├── index.html
├── package.json
├── vite.config.js
├── LICENSE
├── README.md
├── .env.example                  # Environment configuration template
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css                 # Design system & glassmorphism tokens
│   ├── services/
│   │   ├── cloudStorage.js       # Cloud session sync & LocalStorage fallback
│   │   ├── firebase.js           # Firebase Firestore database service
│   │   └── foodDatabase.js       # Macro database & search engine
│   ├── components/
│   │   ├── Header.jsx            # Top status bar & cloud sync indicator
│   │   ├── RingGauge.jsx         # SVG radial ring progress gauge
│   │   ├── CoachingCard.jsx      # AI nutrition insight banner
│   │   ├── EnergyBalance.jsx     # Macro equalizer balance widget
│   │   ├── TimelineFeed.jsx      # Logged meals timeline list
│   │   ├── FoodLogModal.jsx      # Bottom sheet search & quick-add modal
│   │   └── BottomNav.jsx         # Floating glassmorphism tab bar
│   └── views/
│       ├── HomeView.jsx          # Dashboard overview with calorie bar & macro rings
│       └── AnalyticsView.jsx     # Weekly trends, real log insights & target manager
```

---

## License

This project is licensed under the [MIT License](LICENSE). Contributions, forks, and pull requests are welcome!
