import React from 'react';
import { Home, BookOpen, Plus, Flame, HeartPulse, LineChart } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, onQuickAddClick }) {
  return (
    <div className="bottom-nav-container">
      {/* Home Tab */}
      <button 
        className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      {/* Energy / Strain Tab */}
      <button 
        className={`nav-tab ${activeTab === 'energy' ? 'active' : ''}`}
        onClick={() => onTabChange('energy')}
      >
        <Flame size={20} />
        <span>Strain</span>
      </button>

      {/* Floating Center (+) Quick Add Button */}
      <button 
        className="nav-tab-plus"
        onClick={onQuickAddClick}
        title="Quick Log Food / Water"
      >
        <Plus size={26} strokeWidth={2.5} />
      </button>

      {/* Recovery / Nutrition Tab */}
      <button 
        className={`nav-tab ${activeTab === 'recovery' ? 'active' : ''}`}
        onClick={() => onTabChange('recovery')}
      >
        <HeartPulse size={20} />
        <span>Recovery</span>
      </button>

      {/* Analytics / Trends Tab */}
      <button 
        className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
        onClick={() => onTabChange('analytics')}
      >
        <LineChart size={20} />
        <span>Trends</span>
      </button>
    </div>
  );
}
