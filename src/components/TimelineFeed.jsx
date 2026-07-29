import React from 'react';
import { Utensils, Coffee, Sun, Moon, Cookie, Droplet, Trash2, Plus } from 'lucide-react';

const CATEGORY_ICONS = {
  Breakfast: Coffee,
  Lunch: Sun,
  Dinner: Moon,
  Snacks: Cookie,
  Water: Droplet
};

export default function TimelineFeed({ 
  logs = [], 
  onDeleteLog, 
  onQuickAddCategory 
}) {
  if (logs.length === 0) {
    return (
      <div style={{ padding: '0 16px 20px 16px' }}>
        <h3 className="section-title" style={{ paddingLeft: 0 }}>Timeline</h3>
        <div 
          className="card" 
          style={{ 
            textAlign: 'center', 
            padding: '30px 20px', 
            background: '#ffffff',
            color: '#94a3b8'
          }}
        >
          <Utensils size={32} style={{ opacity: 0.4, marginBottom: '10px' }} />
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#64748b' }}>
            No meals logged yet today
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
            Tap the + button below to log your first meal!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 16px 20px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 className="section-title" style={{ paddingLeft: 0, margin: 0 }}>Timeline</h3>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>
          {logs.length} item{logs.length > 1 ? 's' : ''} logged
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {logs.map((log) => {
          const IconComp = CATEGORY_ICONS[log.category] || Utensils;

          return (
            <div 
              key={log.id}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '14px 16px',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                gap: '12px'
              }}
            >
              {/* Category Icon */}
              <div 
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '14px',
                  background: log.category === 'Water' ? '#e0f2fe' : '#f1f5f9',
                  color: log.category === 'Water' ? '#0284c7' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  flexShrink: 0
                }}
              >
                <IconComp size={20} />
              </div>

              {/* Title & Macros */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                    {log.name}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>
                    {log.calories} <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>kcal</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b' }}>
                    {log.category} • {log.time}
                  </span>
                  <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, background: '#f0f9ff', color: '#0284c7', padding: '2px 6px', borderRadius: '6px' }}>
                      P: {Math.round(log.protein)}g
                    </span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, background: '#f7fee7', color: '#65a30d', padding: '2px 6px', borderRadius: '6px' }}>
                      C: {Math.round(log.carbs)}g
                    </span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, background: '#fff7ed', color: '#ea580c', padding: '2px 6px', borderRadius: '6px' }}>
                      F: {Math.round(log.fat)}g
                    </span>
                  </div>
                </div>
              </div>

              {/* Delete button */}
              <button 
                onClick={() => onDeleteLog(log.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center'
                }}
                title="Remove item"
              >
                <Trash2 size={16} color="#94a3b8" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
