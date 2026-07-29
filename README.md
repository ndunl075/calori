# Calori 🥗🔥

> **Open-Source, Mobile-First Calorie & Macro Tracker** inspired by WHOOP aesthetic and MyFitnessPal functionality.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React](https://img.shields.io/badge/React-18.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.1-purple.svg)
![Mobile First](https://img.shields.io/badge/Mobile-Optimized-green.svg)

---

## ✨ Features

- 🎯 **Triple Radial Progress Rings**: High-contrast, glowing radial gauges for **Calories** (Strain), **Protein** (Recovery), and **Carbs** (Energy).
- 🧠 **AI Nutrition Coach Banner**: Real-time context-aware feedback based on remaining daily macros and intake goals.
- ⚡ **Macro & Energy Balance Equalizer**: 24-segment progress meter with live intake vs target score readouts.
- 🎨 **Ambient Mesh Gradient Screens**:
  - **Sand/Orange Mesh (Strain View)**: Central 135px circular gauge, Duration, Total Energy (kJ), and Heart Rate burn zones.
  - **Teal Mountain Mesh (Recovery View)**: Resting HRV, Resting HR, and sleep/recovery timeline.
- 📱 **Floating Glassmorphism Nav Bar**: Mobile-docked bottom bar with elevated center `+ Quick Add` button.
- 🍎 **Food Search Library & Custom Add**: 20+ pre-seeded nutritious foods with portion multipliers (0.5x - 2x) and custom macro logger.
- ☁️ **Cloud Storage Persistence & JSON Backup**: Auto-generates persistent Cloud Session Keys (`CALORI-XXXXXX`) with export & restore capabilities.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- `npm` or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/calori.git

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

## 📂 Project Structure

```
Calori/
├── index.html
├── package.json
├── vite.config.js
├── LICENSE
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css                 # Design system, glassmorphism & mesh gradients
│   ├── services/
│   │   ├── cloudStorage.js       # Cloud session sync & LocalStorage fallback
│   │   └── foodDatabase.js       # Macro database & search engine
│   ├── components/
│   │   ├── Header.jsx            # Top status bar & cloud sync pill
│   │   ├── RingGauge.jsx         # SVG radial ring progress gauge
│   │   ├── CoachingCard.jsx      # AI nutrition insight banner
│   │   ├── EnergyBalance.jsx     # Macro equalizer balance widget
│   │   ├── TimelineFeed.jsx      # Logged meals timeline list
│   │   ├── FoodLogModal.jsx      # Bottom sheet search & quick-add modal
│   │   └── BottomNav.jsx         # Floating glassmorphism tab bar
│   └── views/
│       ├── HomeView.jsx          # Dashboard overview with triple rings
│       ├── EnergyView.jsx        # Sand mesh Strain & burn screen
│       ├── RecoveryView.jsx      # Teal mountain Recovery & health screen
│       └── AnalyticsView.jsx     # Weekly trends & cloud backup manager
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Contributions, forks, and pull requests are welcome!
