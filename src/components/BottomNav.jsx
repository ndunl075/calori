import React from 'react';
import { Home, BookOpen, Plus, LineChart, Target } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, onQuickAddClick }) {
  return (
    <nav className="bottom-nav-container" aria-label="Bottom Navigation">
      {/* 1. Home Tab */}
      <button 
        className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      {/* 2. Journal / Meals Tab */}
      <button 
        className={`nav-tab ${activeTab === 'journal' ? 'active' : ''}`}
        onClick={() => onTabChange('journal')}
      >
        <BookOpen size={20} />
        <span>Journal</span>
      </button>

      {/* 3. Dead-Center Floating (+) Quick Add Button */}
      <button 
        className="nav-tab-plus"
        onClick={onQuickAddClick}
        title="Quick Log Food / Water"
      >
        <Plus size={26} strokeWidth={2.5} />
      </button>

      {/* 4. Trends & Insights Tab */}
      <button 
        className={`nav-tab ${activeTab === 'trends' ? 'active' : ''}`}
        onClick={() => onTabChange('trends')}
      >
        <LineChart size={20} />
        <span>Trends</span>
      </button>

      {/* 5. Targets & Goals Tab */}
      <button 
        className={`nav-tab ${activeTab === 'targets' ? 'active' : ''}`}
        onClick={() => onTabChange('targets')}
      >
        <Target size={20} />
        <span>Goals</span>
      </button>
    </nav>
  );
}
