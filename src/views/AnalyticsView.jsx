import React, { useState } from 'react';
import { Cloud, Download, Upload, Copy, Check, Save, Target, BarChart2 } from 'lucide-react';
import { exportCloudBackupJSON, importCloudBackupJSON, getCloudSessionId } from '../services/cloudStorage';

export default function AnalyticsView({ totals, targets, onUpdateTargets }) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [customTargets, setCustomTargets] = useState({ ...targets });
  const [backupJSON, setBackupJSON] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState('');

  const sessionId = getCloudSessionId();

  // Mock past 7 days history data
  const weeklyData = [
    { day: 'Mon', cal: 2150, protein: 140 },
    { day: 'Tue', cal: 1980, protein: 132 },
    { day: 'Wed', cal: 2280, protein: 155 },
    { day: 'Thu', cal: 2040, protein: 142 },
    { day: 'Fri', cal: 2310, protein: 160 },
    { day: 'Sat', cal: 2190, protein: 148 },
    { day: 'Today', cal: totals.calories, protein: Math.round(totals.protein) }
  ];

  const handleCopyKey = () => {
    navigator.clipboard.writeText(sessionId);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSaveTargetsSubmit = (e) => {
    e.preventDefault();
    onUpdateTargets({
      calories: parseInt(customTargets.calories) || 2000,
      protein: parseInt(customTargets.protein) || 150,
      carbs: parseInt(customTargets.carbs) || 200,
      fat: parseInt(customTargets.fat) || 65,
      water: parseInt(customTargets.water) || 2500
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExport = () => {
    const jsonStr = exportCloudBackupJSON();
    setBackupJSON(jsonStr);
  };

  const handleImport = () => {
    if (!backupJSON.trim()) return;
    const ok = importCloudBackupJSON(backupJSON);
    if (ok) {
      setImportStatus('Cloud Backup Restored Successfully!');
      setTimeout(() => setImportStatus(''), 3000);
    } else {
      setImportStatus('Error: Invalid Backup JSON format');
    }
  };

  return (
    <div style={{ padding: '16px', animation: 'fadeIn 0.25s ease' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
        Trends & Cloud Sync
      </h2>

      {/* Weekly Calorie Bar Chart */}
      <div className="card" style={{ margin: '0 0 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>Weekly Calorie Intake</h4>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Target: {targets.calories} kcal/day</span>
          </div>
          <BarChart2 size={20} color="#6366f1" />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '130px', paddingTop: '10px' }}>
          {weeklyData.map((d, idx) => {
            const heightPercent = Math.min(Math.round((d.cal / (targets.calories * 1.2)) * 100), 100);
            const isToday = idx === weeklyData.length - 1;

            return (
              <div key={d.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>{d.cal}</span>
                <div style={{ width: '18px', height: '90px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                  <div 
                    style={{
                      width: '100%',
                      height: `${heightPercent}%`,
                      background: isToday ? '#0f172a' : '#6366f1',
                      borderRadius: '8px',
                      transition: 'height 0.4s ease'
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: isToday ? 800 : 600, color: isToday ? '#0f172a' : '#94a3b8' }}>
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Goal Customization */}
      <div className="card" style={{ margin: '0 0 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Target size={20} color="#ff7a00" />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Custom Macro Targets</h4>
        </div>

        <form onSubmit={handleSaveTargetsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Daily Calories (kcal)</label>
              <input 
                type="number" 
                className="input-field"
                value={customTargets.calories}
                onChange={(e) => setCustomTargets({ ...customTargets, calories: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Protein Target (g)</label>
              <input 
                type="number" 
                className="input-field"
                value={customTargets.protein}
                onChange={(e) => setCustomTargets({ ...customTargets, protein: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Carbs Target (g)</label>
              <input 
                type="number" 
                className="input-field"
                value={customTargets.carbs}
                onChange={(e) => setCustomTargets({ ...customTargets, carbs: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Fat Target (g)</label>
              <input 
                type="number" 
                className="input-field"
                value={customTargets.fat}
                onChange={(e) => setCustomTargets({ ...customTargets, fat: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            {savedSuccess ? <Check size={18} /> : <Save size={18} />}
            <span>{savedSuccess ? 'Targets Saved!' : 'Save New Goals'}</span>
          </button>
        </form>
      </div>

      {/* Cloud Storage & Backup Manager */}
      <div className="card" style={{ margin: '0 0 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Cloud size={20} color="#0284c7" />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Cloud Storage Sync</h4>
        </div>

        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', marginBottom: '14px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Cloud Session Key</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <code style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{sessionId}</code>
            <button 
              onClick={handleCopyKey}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: copiedKey ? '#f0fdf4' : '#ffffff',
                border: '1px solid #cbd5e1',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: copiedKey ? '#16a34a' : '#334155',
                cursor: 'pointer'
              }}
            >
              {copiedKey ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedKey ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <button 
            onClick={handleExport}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              color: '#0f172a',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Download size={14} />
            <span>Export Cloud JSON</span>
          </button>
        </div>

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
              style={{
                width: '100%',
                marginTop: '8px',
                padding: '10px',
                borderRadius: '12px',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
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
