import React from 'react';
import { Home, Plus, LineChart, Target } from 'lucide-react';

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

      {/* Floating Center (+) Quick Add Button */}
      <button 
        className="nav-tab-plus"
        onClick={onQuickAddClick}
        title="Quick Log Food / Water"
      >
        <Plus size={26} strokeWidth={2.5} />
      </button>

      {/* Trends & Insights Tab */}
      <button 
        className={`nav-tab ${activeTab === 'trends' ? 'active' : ''}`}
        onClick={() => onTabChange('trends')}
      >
        <LineChart size={20} />
        <span>Trends</span>
      </button>

      {/* Targets & Goals Tab */}
      <button 
        className={`nav-tab ${activeTab === 'targets' ? 'active' : ''}`}
        onClick={() => onTabChange('targets')}
      >
        <Target size={20} />
        <span>Goals</span>
      </button>
    </div>
  );
}
