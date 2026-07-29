import React, { useState } from 'react';
import { Settings, Pencil, Check, X } from 'lucide-react';
import RingGauge from '../components/RingGauge';
import CoachingCard from '../components/CoachingCard';
import EnergyBalance from '../components/EnergyBalance';
import TimelineFeed from '../components/TimelineFeed';

export default function HomeView({ 
  totals, 
  targets, 
  logs, 
  onDeleteLog, 
  onNavigate,
  onUpdateTargets
}) {
  const [showTargetEdit, setShowTargetEdit] = useState(false);
  const [tempTargets, setTempTargets] = useState({ ...targets });

  const calPercent = Math.min(Math.round((totals.calories / targets.calories) * 100), 100);
  const carbsPercent = Math.min(Math.round((totals.carbs / targets.carbs) * 100), 100);
  const fatPercent = Math.min(Math.round((totals.fat / targets.fat) * 100), 100);
  const proteinPercent = Math.min(Math.round((totals.protein / targets.protein) * 100), 100);

  const remainingCalories = Math.max(targets.calories - totals.calories, 0);

  const handleSaveQuickTargets = (e) => {
    e.preventDefault();
    onUpdateTargets({
      calories: parseInt(tempTargets.calories) || 2000,
      protein: parseInt(tempTargets.protein) || 150,
      carbs: parseInt(tempTargets.carbs) || 200,
      fat: parseInt(tempTargets.fat) || 70,
      water: parseInt(tempTargets.water) || 2500
    });
    setShowTargetEdit(false);
  };

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
        style={{ marginBottom: '14px', background: 'linear-gradient(135deg, #ffffff 0%, #fffbf5 100%)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f97316', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Daily Calories
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTempTargets({ ...targets });
                  setShowTargetEdit(true);
                }}
                style={{
                  background: '#fff7ed',
                  border: '1px solid #ffedd5',
                  borderRadius: '8px',
                  padding: '2px 8px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#ea580c',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Pencil size={11} />
                <span>Edit Target</span>
              </button>
            </div>

            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginTop: '2px' }}>
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
        <div className="ring-card" onClick={() => onNavigate('trends')} style={{ cursor: 'pointer' }}>
          <RingGauge 
            percentage={carbsPercent}
            size={76}
            strokeWidth={8}
            gradientId="carbsGrad"
            startColor="#6366f1"
            midColor="#8b5cf6"
            endColor="#d946ef"
          />
          <span className="ring-label">Carbs</span>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>
            {Math.round(totals.carbs)} / {targets.carbs}g
          </span>
        </div>

        {/* Ring 2: Fat */}
        <div className="ring-card" onClick={() => onNavigate('trends')} style={{ cursor: 'pointer' }}>
          <RingGauge 
            percentage={fatPercent}
            size={76}
            strokeWidth={8}
            gradientId="fatGrad"
            startColor="#ffb800"
            midColor="#ff7a00"
            endColor="#ea580c"
          />
          <span className="ring-label">Fat</span>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>
            {Math.round(totals.fat)} / {targets.fat}g
          </span>
        </div>

        {/* Ring 3: Protein */}
        <div className="ring-card" onClick={() => onNavigate('trends')} style={{ cursor: 'pointer' }}>
          <RingGauge 
            percentage={proteinPercent}
            size={76}
            strokeWidth={8}
            gradientId="proteinGrad"
            startColor="#a3e635"
            midColor="#22c55e"
            endColor="#16a34a"
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

      {/* Meals Logged Timeline Feed */}
      <TimelineFeed 
        logs={logs}
        onDeleteLog={onDeleteLog}
      />

      {/* Quick Edit Targets Modal */}
      {showTargetEdit && (
        <div className="modal-overlay" onClick={() => setShowTargetEdit(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Edit Daily Targets & Max Calories
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Adjust your daily calorie goal and macro targets
                </p>
              </div>
              <button 
                onClick={() => setShowTargetEdit(false)}
                style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}
              >
                <X size={18} color="#64748b" />
              </button>
            </div>

            <form onSubmit={handleSaveQuickTargets} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px', display: 'block' }}>
                  Max Daily Calories (kcal)
                </label>
                <input 
                  type="number"
                  className="input-field"
                  value={tempTargets.calories}
                  onChange={(e) => setTempTargets({ ...tempTargets, calories: e.target.value })}
                  placeholder="e.g. 2200"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Carbs (g)
                  </label>
                  <input 
                    type="number"
                    className="input-field"
                    value={tempTargets.carbs}
                    onChange={(e) => setTempTargets({ ...tempTargets, carbs: e.target.value })}
                    placeholder="220"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Fat (g)
                  </label>
                  <input 
                    type="number"
                    className="input-field"
                    value={tempTargets.fat}
                    onChange={(e) => setTempTargets({ ...tempTargets, fat: e.target.value })}
                    placeholder="70"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Protein (g)
                  </label>
                  <input 
                    type="number"
                    className="input-field"
                    value={tempTargets.protein}
                    onChange={(e) => setTempTargets({ ...tempTargets, protein: e.target.value })}
                    placeholder="150"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
                Save New Daily Goal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
