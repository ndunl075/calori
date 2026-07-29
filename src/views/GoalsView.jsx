import React, { useState } from 'react';
import { Target, Flame, Dumbbell, Scale, Sparkles, Check, Save, Calculator, Droplet, Cloud, Download } from 'lucide-react';
import { getCloudSessionId, exportCloudBackupJSON, importCloudBackupJSON } from '../services/cloudStorage';

export default function GoalsView({ targets, onUpdateTargets }) {
  const [customTargets, setCustomTargets] = useState({ ...targets });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Calculator State
  const [showCalc, setShowCalc] = useState(false);
  const [calcData, setCalcData] = useState({
    weightLbs: 165,
    heightInches: 70,
    age: 26,
    gender: 'male',
    activity: 'moderate', // 'light', 'moderate', 'active'
    fitnessGoal: 'maintain' // 'cut', 'maintain', 'bulk'
  });

  const [copiedKey, setCopiedKey] = useState(false);
  const [backupJSON, setBackupJSON] = useState('');
  const [importStatus, setImportStatus] = useState('');

  const sessionId = getCloudSessionId();

  // Presets
  const applyPreset = (presetName) => {
    let p = { calories: 2200, protein: 150, carbs: 220, fat: 70, water: 2500 };
    if (presetName === 'cut') {
      p = { calories: 1800, protein: 160, carbs: 150, fat: 55, water: 3000 };
    } else if (presetName === 'bulk') {
      p = { calories: 2800, protein: 185, carbs: 330, fat: 80, water: 3500 };
    } else if (presetName === 'keto') {
      p = { calories: 2000, protein: 140, carbs: 30, fat: 145, water: 3000 };
    }

    setCustomTargets(p);
    onUpdateTargets(p);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Calculate TDEE BMR
  const calculateTDEE = () => {
    const weightKg = calcData.weightLbs * 0.453592;
    const heightCm = calcData.heightInches * 2.54;
    
    // Harris-Benedict BMR
    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * calcData.age;
    bmr += calcData.gender === 'male' ? 5 : -161;

    let activityMultiplier = 1.375; // moderate
    if (calcData.activity === 'light') activityMultiplier = 1.2;
    if (calcData.activity === 'active') activityMultiplier = 1.55;

    let tdee = Math.round(bmr * activityMultiplier);

    if (calcData.fitnessGoal === 'cut') tdee -= 400;
    if (calcData.fitnessGoal === 'bulk') tdee += 400;

    const calculatedProtein = Math.round(calcData.weightLbs * 0.9);
    const calculatedFat = Math.round((tdee * 0.25) / 9);
    const calculatedCarbs = Math.round((tdee - (calculatedProtein * 4 + calculatedFat * 9)) / 4);

    const newTargets = {
      calories: tdee,
      protein: calculatedProtein,
      carbs: Math.max(calculatedCarbs, 50),
      fat: calculatedFat,
      water: 3000
    };

    setCustomTargets(newTargets);
    onUpdateTargets(newTargets);
    setShowCalc(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    onUpdateTargets({
      calories: parseInt(customTargets.calories) || 2000,
      protein: parseInt(customTargets.protein) || 150,
      carbs: parseInt(customTargets.carbs) || 200,
      fat: parseInt(customTargets.fat) || 70,
      water: parseInt(customTargets.water) || 2500
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(sessionId);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleExport = () => {
    setBackupJSON(exportCloudBackupJSON());
  };

  const handleImport = () => {
    if (!backupJSON.trim()) return;
    const ok = importCloudBackupJSON(backupJSON);
    if (ok) {
      setImportStatus('Cloud Backup Restored Successfully!');
      setTimeout(() => setImportStatus(''), 3000);
    } else {
      setImportStatus('Error: Invalid Backup JSON');
    }
  };

  return (
    <div style={{ padding: '16px', animation: 'fadeIn 0.25s ease' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
        Goals & Target Management
      </h2>

      {/* Goal Presets */}
      <div className="card" style={{ margin: '0 0 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Sparkles size={20} color="#f97316" />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Macro Goal Presets</h4>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          <button 
            onClick={() => applyPreset('cut')}
            style={{
              padding: '10px 8px',
              borderRadius: '12px',
              border: '1px solid #fed7aa',
              background: '#fff7ed',
              color: '#c2410c',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Flame size={18} />
            <span>Fat Loss (Cut)</span>
          </button>

          <button 
            onClick={() => applyPreset('maintain')}
            style={{
              padding: '10px 8px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
              color: '#334155',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Scale size={18} />
            <span>Maintain Weight</span>
          </button>

          <button 
            onClick={() => applyPreset('bulk')}
            style={{
              padding: '10px 8px',
              borderRadius: '12px',
              border: '1px solid #bbf7d0',
              background: '#f0fdf4',
              color: '#15803d',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Dumbbell size={18} />
            <span>Muscle Gain</span>
          </button>
        </div>
      </div>

      {/* Macro Target Form */}
      <div className="card" style={{ margin: '0 0 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={20} color="#0f172a" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Custom Daily Target Goals</h4>
          </div>
          <button 
            onClick={() => setShowCalc(!showCalc)}
            style={{ background: '#f1f5f9', border: 'none', padding: '6px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Calculator size={14} />
            <span>{showCalc ? 'Close Calculator' : 'Auto Calculator'}</span>
          </button>
        </div>

        {/* TDEE Calculator Popup */}
        {showCalc && (
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
            <h5 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Macro & TDEE Calculator</h5>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b' }}>Body Weight (lbs)</label>
                <input 
                  type="number" 
                  className="input-field"
                  value={calcData.weightLbs}
                  onChange={(e) => setCalcData({ ...calcData, weightLbs: parseFloat(e.target.value) || 160 })}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b' }}>Age</label>
                <input 
                  type="number" 
                  className="input-field"
                  value={calcData.age}
                  onChange={(e) => setCalcData({ ...calcData, age: parseInt(e.target.value) || 25 })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b' }}>Activity Level</label>
                <select 
                  className="input-field"
                  value={calcData.activity}
                  onChange={(e) => setCalcData({ ...calcData, activity: e.target.value })}
                >
                  <option value="light">Light (1-2 days/wk)</option>
                  <option value="moderate">Moderate (3-5 days/wk)</option>
                  <option value="active">Active (6-7 days/wk)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b' }}>Goal</label>
                <select 
                  className="input-field"
                  value={calcData.fitnessGoal}
                  onChange={(e) => setCalcData({ ...calcData, fitnessGoal: e.target.value })}
                >
                  <option value="cut">Fat Loss (-400 kcal)</option>
                  <option value="maintain">Maintain</option>
                  <option value="bulk">Muscle Gain (+400 kcal)</option>
                </select>
              </div>
            </div>

            <button onClick={calculateTDEE} className="btn-primary" style={{ padding: '10px', fontSize: '0.85rem' }}>
              Calculate & Apply Goals
            </button>
          </div>
        )}

        <form onSubmit={handleSaveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Max Daily Calories (kcal)</label>
            <input 
              type="number" 
              className="input-field"
              value={customTargets.calories}
              onChange={(e) => setCustomTargets({ ...customTargets, calories: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Carbs Goal (g)</label>
              <input 
                type="number" 
                className="input-field"
                value={customTargets.carbs}
                onChange={(e) => setCustomTargets({ ...customTargets, carbs: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Fat Goal (g)</label>
              <input 
                type="number" 
                className="input-field"
                value={customTargets.fat}
                onChange={(e) => setCustomTargets({ ...customTargets, fat: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Protein Goal (g)</label>
              <input 
                type="number" 
                className="input-field"
                value={customTargets.protein}
                onChange={(e) => setCustomTargets({ ...customTargets, protein: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            {savedSuccess ? <Check size={18} /> : <Save size={18} />}
            <span>{savedSuccess ? 'Targets Saved!' : 'Save Goal Settings'}</span>
          </button>
        </form>
      </div>

      {/* Cloud Session & Data Management */}
      <div className="card" style={{ margin: '0 0 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Cloud size={20} color="#0284c7" />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Cloud Sync & Account Key</h4>
        </div>

        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Cloud Session Key</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <code style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{sessionId}</code>
            <button 
              onClick={handleCopyKey}
              style={{ padding: '6px 12px', borderRadius: '8px', background: '#ffffff', border: '1px solid #cbd5e1', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
            >
              {copiedKey ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <button 
          onClick={handleExport}
          style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          <Download size={14} />
          <span>Export Cloud Backup JSON</span>
        </button>

        {backupJSON && (
          <div style={{ marginTop: '10px' }}>
            <textarea 
              rows={4}
              value={backupJSON}
              onChange={(e) => setBackupJSON(e.target.value)}
              className="input-field"
              style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}
            />
            <button 
              onClick={handleImport}
              style={{ width: '100%', marginTop: '8px', padding: '10px', borderRadius: '12px', background: '#0284c7', color: '#ffffff', border: 'none', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Restore Data from JSON
            </button>
            {importStatus && (
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#16a34a', marginTop: '6px', textAlign: 'center' }}>
                {importStatus}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
