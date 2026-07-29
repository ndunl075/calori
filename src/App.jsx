import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import FoodLogModal from './components/FoodLogModal';

import HomeView from './views/HomeView';
import EnergyView from './views/EnergyView';
import RecoveryView from './views/RecoveryView';
import AnalyticsView from './views/AnalyticsView';

import { 
  loadAllLogs, 
  saveAllLogs, 
  loadTargets, 
  saveTargets, 
  getCloudSessionId, 
  syncWithCloudServer 
} from './services/cloudStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showLogModal, setShowLogModal] = useState(false);
  const [allLogs, setAllLogs] = useState({});
  const [targets, setTargets] = useState(loadTargets());
  const [cloudSynced, setCloudSynced] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  const sessionId = getCloudSessionId();

  // Load persistent logs on startup
  useEffect(() => {
    const logsData = loadAllLogs();
    setAllLogs(logsData);
  }, []);

  // Sync to Cloud whenever logs update
  useEffect(() => {
    if (Object.keys(allLogs).length > 0) {
      saveAllLogs(allLogs);
      setCloudSynced(true);
    }
  }, [allLogs]);

  // Current day logs list
  const currentLogs = useMemo(() => {
    return allLogs[selectedDate] || [];
  }, [allLogs, selectedDate]);

  // Calculate Daily Nutrient Totals
  const totals = useMemo(() => {
    return currentLogs.reduce(
      (acc, log) => {
        if (log.category === 'Water') {
          acc.water += log.calories || 250;
        } else {
          acc.calories += log.calories || 0;
          acc.protein += log.protein || 0;
          acc.carbs += log.carbs || 0;
          acc.fat += log.fat || 0;
        }
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, water: 1250 }
    );
  }, [currentLogs]);

  // Add Log Item
  const handleAddLog = (newLog) => {
    setAllLogs((prev) => {
      const existing = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: [newLog, ...existing]
      };
    });
  };

  // Delete Log Item
  const handleDeleteLog = (logId) => {
    setAllLogs((prev) => {
      const existing = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: existing.filter((item) => item.id !== logId)
      };
    });
  };

  // Update Targets
  const handleUpdateTargets = (newTargets) => {
    setTargets(newTargets);
    saveTargets(newTargets);
  };

  // Format date text e.g. "Today, July 29"
  const formattedDateText = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (selectedDate === todayStr) {
      const dateObj = new Date();
      const month = dateObj.toLocaleString('en-US', { month: 'long' });
      const day = dateObj.getDate();
      return `Today, ${month} ${day}`;
    } else {
      const dateObj = new Date(selectedDate + 'T00:00:00');
      const month = dateObj.toLocaleString('en-US', { month: 'short' });
      const day = dateObj.getDate();
      return `${month} ${day}`;
    }
  }, [selectedDate]);

  return (
    <div className="app-viewport-wrapper">
      {/* Top Mobile Header & Status Bar */}
      <Header 
        currentDateText={formattedDateText}
        onDateClick={() => {
          // Toggle date back and forth for testing past logs
          const todayStr = new Date().toISOString().split('T')[0];
          setSelectedDate((prev) => (prev === todayStr ? '2026-07-28' : todayStr));
        }}
        activeView={activeTab}
        onBack={() => setActiveTab('home')}
        cloudSynced={cloudSynced}
        sessionId={sessionId}
      />

      {/* Main Scrollable View Area */}
      <main className="app-content">
        {activeTab === 'home' && (
          <HomeView 
            totals={totals}
            targets={targets}
            logs={currentLogs}
            onDeleteLog={handleDeleteLog}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'energy' && (
          <EnergyView 
            totals={totals}
            targets={targets}
            logs={currentLogs}
            onDeleteLog={handleDeleteLog}
          />
        )}

        {activeTab === 'recovery' && (
          <RecoveryView 
            totals={totals}
            targets={targets}
            logs={currentLogs}
            onDeleteLog={handleDeleteLog}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView 
            totals={totals}
            targets={targets}
            onUpdateTargets={handleUpdateTargets}
          />
        )}
      </main>

      {/* Floating Glassmorphism Navigation Bar */}
      <BottomNav 
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onQuickAddClick={() => setShowLogModal(true)}
      />

      {/* Food & Macro Log Sheet Modal */}
      {showLogModal && (
        <FoodLogModal 
          onClose={() => setShowLogModal(false)}
          onAddLog={handleAddLog}
        />
      )}
    </div>
  );
}
