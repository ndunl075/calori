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
  const proteinPercent = Math.min(Math.round((totals.protein / targets.protein) * 100), 100);
  const carbsPercent = Math.min(Math.round((totals.carbs / targets.carbs) * 100), 100);

  // Dynamic AI coaching message logic based on logged intake
  const getCoachingMessage = () => {
    const remainingCal = targets.calories - totals.calories;
    if (remainingCal > 800) {
      return "Calorie deficit is high today. Focus on nutrient-dense meals with balanced protein and healthy fats for your remaining calories.";
    } else if (remainingCal > 200) {
      return `Solid energy intake! You have ${remainingCal} kcal remaining for dinner. Protein intake is on track for optimal recovery.`;
    } else {
      return "Great job meeting your daily calorie target! Keep hydrated with water for evening rest.";
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      {/* 3 Concentric Ring Cards matching Screenshot 1 */}
      <div className="rings-container">
        {/* Ring 1: Calorie Strain */}
        <div className="ring-card" onClick={() => onNavigate('energy')} style={{ cursor: 'pointer' }}>
          <RingGauge 
            percentage={calPercent}
            size={74}
            strokeWidth={8}
            gradientId="strainGrad"
            startColor="#ff7a00"
            endColor="#ffb800"
          />
          <span className="ring-label">Calories</span>
        </div>

        {/* Ring 2: Protein Recovery */}
        <div className="ring-card" onClick={() => onNavigate('recovery')} style={{ cursor: 'pointer' }}>
          <RingGauge 
            percentage={proteinPercent}
            size={74}
            strokeWidth={8}
            gradientId="recoveryGrad"
            startColor="#22c55e"
            endColor="#a3e635"
          />
          <span className="ring-label">Protein</span>
        </div>

        {/* Ring 3: Carbs Energy */}
        <div className="ring-card" onClick={() => onNavigate('analytics')} style={{ cursor: 'pointer' }}>
          <RingGauge 
            percentage={carbsPercent}
            size={74}
            strokeWidth={8}
            gradientId="sleepGrad"
            startColor="#6366f1"
            endColor="#8b5cf6"
          />
          <span className="ring-label">Carbs</span>
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
