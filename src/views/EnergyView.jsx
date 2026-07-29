import React from 'react';
import RingGauge from '../components/RingGauge';
import CoachingCard from '../components/CoachingCard';
import TimelineFeed from '../components/TimelineFeed';
import { Flame, Clock, Zap, ChevronDown } from 'lucide-react';

export default function EnergyView({ totals, targets, logs, onDeleteLog }) {
  const strainPercent = Math.min(Math.round((totals.calories / targets.calories) * 100), 100);
  const totalKJ = Math.round(totals.calories * 4.184);

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      {/* Sand Mesh Header with Large Circular Gauge matching Screenshot 2 */}
      <div className="mesh-header-sand">
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 20px 0' }}>
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '50%',
              padding: '16px',
              boxShadow: '0 16px 36px rgba(251, 146, 60, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}
          >
            <RingGauge 
              percentage={strainPercent}
              size={135}
              strokeWidth={13}
              gradientId="strainLargeGrad"
              startColor="#ff7a00"
              endColor="#ffb800"
              sublabel="Strain"
            />
          </div>
        </div>

        {/* Duration & Total Energy Cards matching Screenshot 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="card" style={{ margin: 0, padding: '16px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700 }}>
              <Clock size={14} />
              <span>Logged Meals</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '8px' }}>
              {logs.length} item{logs.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="card" style={{ margin: 0, padding: '16px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700 }}>
              <Zap size={14} />
              <span>Total Energy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '8px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                {totalKJ.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>kJ</span>
              <ChevronDown size={14} color="#f97316" style={{ marginLeft: 'auto' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Coaching Card matching Screenshot 2 */}
      <CoachingCard 
        text={
          totals.calories === 0 
            ? "No food logged yet today. Tap + below to add your first meal and start tracking your strain!"
            : `You have logged ${totals.calories} kcal (${totalKJ.toLocaleString()} kJ). Aim for 50% - 81% Calorie Strain for optimal energy balance.`
        }
      />

      {/* Heart Rate & Macro Zones */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
          Heart Rate & Burn Zones
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
              <span>Zone 3: Aerobic (135 - 152 bpm)</span>
              <span>28 mins</span>
            </div>
            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '65%', height: '100%', background: '#ff7a00', borderRadius: '4px' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
              <span>Zone 2: Fat Burn (118 - 134 bpm)</span>
              <span>17 mins</span>
            </div>
            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '40%', height: '100%', background: '#f59e0b', borderRadius: '4px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Logged Timeline Feed */}
      <TimelineFeed 
        logs={logs}
        onDeleteLog={onDeleteLog}
      />
    </div>
  );
}
