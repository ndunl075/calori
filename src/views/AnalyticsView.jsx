import React, { useState, useMemo } from 'react';
import { Cloud, Download, Upload, Copy, Check, Save, Target, BarChart2, TrendingUp, Award, Flame, PieChart, Sparkles } from 'lucide-react';
import { exportCloudBackupJSON, importCloudBackupJSON, getCloudSessionId } from '../services/cloudStorage';

export default function AnalyticsView({ totals, targets, onUpdateTargets, allLogs = {} }) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [customTargets, setCustomTargets] = useState({ ...targets });
  const [backupJSON, setBackupJSON] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState('');

  const sessionId = getCloudSessionId();

  // Compute real 7-day past history from actual user log entries
  const weeklyData = useMemo(() => {
    return Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - idx));
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = idx === 6 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
      
      const dayLogs = allLogs[dateStr] || [];
      const dayCal = dayLogs.reduce((sum, item) => sum + (item.category !== 'Water' ? item.calories || 0 : 0), 0);
      const dayProtein = dayLogs.reduce((sum, item) => sum + (item.category !== 'Water' ? item.protein || 0 : 0), 0);
      const dayCarbs = dayLogs.reduce((sum, item) => sum + (item.category !== 'Water' ? item.carbs || 0 : 0), 0);
      const dayFat = dayLogs.reduce((sum, item) => sum + (item.category !== 'Water' ? item.fat || 0 : 0), 0);

      return {
        date: dateStr,
        day: dayLabel,
        cal: Math.round(dayCal),
        protein: Math.round(dayProtein),
        carbs: Math.round(dayCarbs),
        fat: Math.round(dayFat),
        itemCount: dayLogs.length
      };
    });
  }, [allLogs]);

  // Extract Real Insights from User Logs
  const realInsights = useMemo(() => {
    const activeDays = weeklyData.filter(d => d.cal > 0);
    const activeDaysCount = activeDays.length;

    const totalWeekCalories = weeklyData.reduce((sum, d) => sum + d.cal, 0);
    const avgCalories = activeDaysCount > 0 ? Math.round(totalWeekCalories / activeDaysCount) : 0;

    const totalWeekProtein = weeklyData.reduce((sum, d) => sum + d.protein, 0);
    const avgProtein = activeDaysCount > 0 ? Math.round(totalWeekProtein / activeDaysCount) : 0;

    const totalWeekCarbs = weeklyData.reduce((sum, d) => sum + d.carbs, 0);
    const avgCarbs = activeDaysCount > 0 ? Math.round(totalWeekCarbs / activeDaysCount) : 0;

    const totalWeekFat = weeklyData.reduce((sum, d) => sum + d.fat, 0);
    const avgFat = activeDaysCount > 0 ? Math.round(totalWeekFat / activeDaysCount) : 0;

    // Peak calorie day
    const peakDay = [...weeklyData].sort((a, b) => b.cal - a.cal)[0];

    // Most frequently logged food item across all history
    const foodFrequency = {};
    Object.values(allLogs).flat().forEach(item => {
      if (item.name) {
        foodFrequency[item.name] = (foodFrequency[item.name] || 0) + 1;
      }
    });

    let topFood = null;
    let topFoodCount = 0;
    Object.entries(foodFrequency).forEach(([name, count]) => {
      if (count > topFoodCount) {
        topFood = name;
        topFoodCount = count;
      }
    });

    return {
      activeDaysCount,
      avgCalories,
      avgProtein,
      avgCarbs,
      avgFat,
      peakDay: peakDay && peakDay.cal > 0 ? peakDay : null,
      topFood,
      topFoodCount
    };
  }, [weeklyData, allLogs]);

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

      {/* Real Insights Extracted From User Logs */}
      <div className="card" style={{ margin: '0 0 16px 0', background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Sparkles size={20} color="#22c55e" />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Logged Data Insights</h4>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
          <div style={{ background: '#ffffff', padding: '12px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b' }}>AVG DAILY CALORIES</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              {realInsights.avgCalories} <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>kcal</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: realInsights.avgCalories > targets.calories ? '#ef4444' : '#22c55e', fontWeight: 700, marginTop: '2px' }}>
              {realInsights.avgCalories > 0 ? `${Math.round((realInsights.avgCalories / targets.calories) * 100)}% of goal` : 'No logs yet'}
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '12px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b' }}>AVG DAILY PROTEIN</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7', marginTop: '2px' }}>
              {realInsights.avgProtein} <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>g</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#0284c7', fontWeight: 700, marginTop: '2px' }}>
              {realInsights.avgProtein > 0 ? `${Math.round((realInsights.avgProtein / targets.protein) * 100)}% of goal` : 'No logs yet'}
            </div>
          </div>
        </div>

        {/* Highlight Insights Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {realInsights.topFood && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', padding: '10px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <Award size={18} color="#eab308" />
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                Most Logged Food: <strong style={{ color: '#0f172a' }}>{realInsights.topFood}</strong> ({realInsights.topFoodCount}x)
              </div>
            </div>
          )}

          {realInsights.peakDay && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', padding: '10px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <TrendingUp size={18} color="#f97316" />
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                Peak Calorie Day: <strong style={{ color: '#0f172a' }}>{realInsights.peakDay.day}</strong> ({realInsights.peakDay.cal} kcal)
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', padding: '10px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <Flame size={18} color="#ef4444" />
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
              Logged History: <strong style={{ color: '#0f172a' }}>{realInsights.activeDaysCount} active days</strong> logged this week
            </div>
          </div>
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
