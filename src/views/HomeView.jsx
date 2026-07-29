import React from 'react';
import RingGauge from '../components/RingGauge';
import CoachingCard from '../components/CoachingCard';
import EnergyBalance from '../components/EnergyBalance';
import TimelineFeed from '../components/TimelineFeed';

export default function HomeView({ 
  totals, 
  targets, 
  logs, 
  onDeleteLog, 
  onNavigate 
}) {
  const calPercent = Math.min(Math.round((totals.calories / targets.calories) * 100), 100);
  const carbsPercent = Math.min(Math.round((totals.carbs / targets.carbs) * 100), 100);
  const fatPercent = Math.min(Math.round((totals.fat / targets.fat) * 100), 100);
  const proteinPercent = Math.min(Math.round((totals.protein / targets.protein) * 100), 100);

  const remainingCalories = Math.max(targets.calories - totals.calories, 0);

  // Dynamic AI coaching message logic based on logged intake
  const getCoachingMessage = () => {
    if (totals.calories === 0) {
      return "No food logged yet today. Tap + below to add your first meal and hit your daily macro goals!";
    }
    if (remainingCalories > 800) {
      return `You have ${remainingCalories} kcal remaining today. Focus on high-protein meals with complex carbs.`;
    } else if (remainingCalories > 0) {
      return `On track! You have ${remainingCalories} kcal remaining for dinner. Great macro balance.`;
    } else {
      return "Awesome job! You have hit 100% of your daily calorie target for today!";
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      {/* Top Rectangular Calorie Bar */}
      <div 
        className="card" 
        onClick={() => onNavigate('energy')} 
        style={{ cursor: 'pointer', marginBottom: '14px', background: 'linear-gradient(135deg, #ffffff 0%, #fffbf5 100%)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f97316', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Daily Calories
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
              {totals.calories} <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>/ {targets.calories} kcal</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#22c55e' }}>
              {remainingCalories}
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>
              Remaining
            </div>
          </div>
        </div>

        {/* Rectangular Progress Bar */}
        <div style={{ width: '100%', height: '14px', background: '#f1f5f9', borderRadius: '8px', overflow: 'hidden', margin: '10px 0 12px 0' }}>
          <div 
            style={{
              width: `${calPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #ff7a00 0%, #ffb800 100%)',
              borderRadius: '8px',
              transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </div>

        {/* Bottom Pill Summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', background: '#f8fafc', padding: '8px 12px', borderRadius: '10px' }}>
          <span>Logged: <strong style={{ color: '#0f172a' }}>{totals.calories} kcal</strong></span>
          <span>Target: <strong style={{ color: '#0f172a' }}>{targets.calories} kcal</strong></span>
          <span>Score: <strong style={{ color: '#ff7a00' }}>{calPercent}%</strong></span>
        </div>
      </div>

      {/* 3 Rings Below: Carbs, Fat, Protein */}
      <div className="rings-container">
        {/* Ring 1: Carbs */}
        <div className="ring-card" onClick={() => onNavigate('analytics')} style={{ cursor: 'pointer' }}>
          <RingGauge 
            percentage={carbsPercent}
            size={74}
            strokeWidth={8}
            gradientId="carbsGrad"
            startColor="#6366f1"
            endColor="#8b5cf6"
          />
          <span className="ring-label">Carbs</span>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>
            {Math.round(totals.carbs)} / {targets.carbs}g
          </span>
        </div>

        {/* Ring 2: Fat */}
        <div className="ring-card" onClick={() => onNavigate('analytics')} style={{ cursor: 'pointer' }}>
          <RingGauge 
            percentage={fatPercent}
            size={74}
            strokeWidth={8}
            gradientId="fatGrad"
            startColor="#f59e0b"
            endColor="#d97706"
          />
          <span className="ring-label">Fat</span>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>
            {Math.round(totals.fat)} / {targets.fat}g
          </span>
        </div>

        {/* Ring 3: Protein */}
        <div className="ring-card" onClick={() => onNavigate('recovery')} style={{ cursor: 'pointer' }}>
          <RingGauge 
            percentage={proteinPercent}
            size={74}
            strokeWidth={8}
            gradientId="proteinGrad"
            startColor="#22c55e"
            endColor="#a3e635"
          />
          <span className="ring-label">Protein</span>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>
            {Math.round(totals.protein)} / {targets.protein}g
          </span>
        </div>
      </div>

      {/* AI Coaching Card matching Screenshot 1 */}
      <CoachingCard 
        text={getCoachingMessage()}
      />

      {/* Stress & Energy / Macro Balance Widget matching Screenshot 1 */}
      <h3 className="section-title">Stress & Energy</h3>
      <EnergyBalance 
        totals={totals}
        targets={targets}
        onDetailClick={() => onNavigate('energy')}
      />

      {/* Health Monitor Summary Card */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>Health Monitor</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#22c55e' }}>● All Metrics Normal</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', textAlign: 'center' }}>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>WATER</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0284c7' }}>{totals.water || 1250} ml</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>FIBER</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#65a30d' }}>28 g</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>SODIUM</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#d97706' }}>1,840 mg</div>
          </div>
        </div>
      </div>

      {/* Meals Logged Timeline Feed */}
      <TimelineFeed 
        logs={logs}
        onDeleteLog={onDeleteLog}
      />
    </div>
  );
}
