import React from 'react';
import RingGauge from '../components/RingGauge';
import CoachingCard from '../components/CoachingCard';
import TimelineFeed from '../components/TimelineFeed';
import { Activity, Heart, Moon, ArrowRight } from 'lucide-react';

export default function RecoveryView({ totals, targets, logs, onDeleteLog }) {
  const recoveryPercent = Math.min(Math.round((totals.protein / targets.protein) * 100), 100);

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      {/* Teal Mountain Mesh Header matching Screenshot 3 */}
      <div className="mesh-header-teal">
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 20px 0' }}>
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '50%',
              padding: '16px',
              boxShadow: '0 16px 36px rgba(45, 212, 191, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}
          >
            <RingGauge 
              percentage={recoveryPercent > 0 ? recoveryPercent : 64}
              size={135}
              strokeWidth={13}
              gradientId="recoveryLargeGrad"
              startColor="#22c55e"
              endColor="#a3e635"
              sublabel="Recovered"
            />
          </div>
        </div>

        {/* Resting HRV & Resting HR Cards matching Screenshot 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="card" style={{ margin: 0, padding: '16px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700 }}>
              <Activity size={14} />
              <span>Resting HRV</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '8px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>107.8</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>ms</span>
            </div>
          </div>

          <div className="card" style={{ margin: 0, padding: '16px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700 }}>
              <Heart size={14} color="#ef4444" />
              <span>Resting HR</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '8px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>49.5</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>bpm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coaching Card with View Insights action matching Screenshot 3 */}
      <CoachingCard 
        text="Recovery is optimal today. Your high protein synthesis (64% target achieved) and stable Resting HRV (107.8 ms) indicate excellent muscle repair readiness."
        hasAction={true}
        actionText="View nutrition insights"
      />

      {/* Sleep & Rest Log Card matching Screenshot 3 */}
      <div style={{ padding: '0 16px 16px 16px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
          Rest & Sleep Log
        </h4>
        <div 
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '14px 16px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: '#e0e7ff',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justify: 'center'
              }}
            >
              <Moon size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                Primary sleep
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                7/29/26 at 2:01 AM • 7h 42m
              </div>
            </div>
          </div>
          <ArrowRight size={18} color="#94a3b8" />
        </div>
      </div>

      {/* Logged Meals Timeline */}
      <TimelineFeed 
        logs={logs}
        onDeleteLog={onDeleteLog}
      />
    </div>
  );
}
