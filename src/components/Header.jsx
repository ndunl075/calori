import React from 'react';
import { ChevronDown, ChevronLeft, Info, Cloud, CloudOff, Check } from 'lucide-react';

export default function Header({ 
  currentDateText, 
  onDateClick, 
  activeView, 
  onBack, 
  cloudSynced, 
  sessionId 
}) {
  const isDetailView = activeView === 'energy' || activeView === 'recovery';

  return (
    <header className="header-container">
      {/* Mobile Top Status Bar */}
      <div className="status-bar">
        <span>12:19</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.72rem', opacity: 0.8 }}>5G</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>79%</span>
        </div>
      </div>

      {/* View Header */}
      <div className="top-header">
        {isDetailView ? (
          <>
            <button 
              onClick={onBack}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              aria-label="Back"
            >
              <ChevronLeft size={24} color="#0f172a" />
            </button>

            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                {activeView === 'energy' ? 'Strain' : 'Recovery'}
              </h2>
              <button 
                onClick={onDateClick} 
                className="date-selector"
                style={{ fontSize: '0.85rem', color: '#64748b', justifyContent: 'center' }}
              >
                <span>{currentDateText}</span>
                <ChevronDown size={14} />
              </button>
            </div>

            <button 
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              aria-label="Information"
            >
              <Info size={20} color="#94a3b8" />
            </button>
          </>
        ) : (
          <>
            <button onClick={onDateClick} className="date-selector">
              <span>{currentDateText}</span>
              <ChevronDown size={18} color="#0f172a" />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Cloud Sync Status Indicator */}
              <div 
                title={`Cloud Synced: Session ${sessionId}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: cloudSynced ? '#f0fdf4' : '#fff1f2',
                  border: `1px solid ${cloudSynced ? '#bbf7d0' : '#fecdd3'}`,
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: cloudSynced ? '#15803d' : '#be123c'
                }}
              >
                {cloudSynced ? <Cloud size={14} /> : <CloudOff size={14} />}
                <span>Cloud</span>
              </div>

              {/* Profile Avatar Badge matching image "BS" */}
              <div className="profile-avatar">
                BS
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
