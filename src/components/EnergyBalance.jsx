import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

export default function EnergyBalance({ 
  totals, 
  targets, 
  onDetailClick 
}) {
  const calPercent = Math.min(Math.round((totals.calories / targets.calories) * 100), 100);
  
  return (
    <div className="card" onClick={onDetailClick} style={{ cursor: 'pointer' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
              Today's Energy Balance
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px', display: 'block' }}>
            Last updated just now
          </span>
        </div>
        <ArrowRight size={18} color="#94a3b8" />
      </div>

      {/* Grid of 4 Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444' }}>
              {totals.calories}
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8' }}>
              Logged (kcal)
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0ea5e9' }}>
              {Math.round(totals.protein)}g
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8' }}>
              Protein
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#84cc16' }}>
              {Math.round(totals.carbs)}g
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8' }}>
              Carbs
            </div>
          </div>
        </div>

        {/* Circular Med/Balance score widget matching screenshot with SVG mathematical dead-center alignment */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{ width: '68px', height: '68px', position: 'relative' }}>
            <svg width="68" height="68" viewBox="0 0 68 68" style={{ display: 'block' }}>
              {/* Background filled circle */}
              <circle cx="34" cy="34" r="31" fill="#fffbe6" />
              {/* Dashed track */}
              <circle 
                cx="34" 
                cy="34" 
                r="31" 
                fill="none" 
                stroke="#fbbf24" 
                strokeWidth="3" 
                strokeDasharray="5 3" 
              />
              {/* Dead-Center Percentage Text */}
              <text
                x="50%"
                y="42%"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#d97706"
                fontSize="16"
                fontWeight="800"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                {calPercent}%
              </text>
              {/* Dead-Center Target Label */}
              <text
                x="50%"
                y="66%"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#b45309"
                fontSize="9"
                fontWeight="700"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                Target
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Segmented Equalizer Progress Bar matching screenshot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '10px 14px', borderRadius: '14px' }}>
        <Zap size={16} color="#22c55e" fill="#22c55e" />
        
        <div style={{ flex: 1, display: 'flex', gap: '3px' }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const threshold = (i / 24) * 100;
            const isFilled = calPercent >= threshold;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: '14px',
                  borderRadius: '3px',
                  background: isFilled 
                    ? i < 14 ? '#22c55e' : i < 20 ? '#eab308' : '#ef4444'
                    : '#e2e8f0',
                  transition: 'background 0.3s ease'
                }}
              />
            );
          })}
        </div>

        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>
          {calPercent}%
        </span>
      </div>
    </div>
  );
}
