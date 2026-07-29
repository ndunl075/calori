import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Utensils, Coffee, Sun, Moon, Cookie, Droplet, Trash2, Plus, FileText, Check } from 'lucide-react';

const CATEGORIES = [
  { name: 'Breakfast', icon: Coffee, color: '#f59e0b' },
  { name: 'Lunch', icon: Sun, color: '#0ea5e9' },
  { name: 'Dinner', icon: Moon, color: '#6366f1' },
  { name: 'Snacks', icon: Cookie, color: '#ec4899' },
  { name: 'Water', icon: Droplet, color: '#06b6d4' }
];

export default function JournalView({ 
  allLogs = {}, 
  selectedDate, 
  onSelectDate, 
  onDeleteLog, 
  onQuickAddCategory 
}) {
  const [journalNote, setJournalNote] = useState('');
  const [savedNote, setSavedNote] = useState(false);

  // Format date header text
  const dateObj = new Date(selectedDate + 'T00:00:00');
  const isToday = selectedDate === new Date().toISOString().split('T')[0];
  const dateDisplay = isToday 
    ? 'Today, ' + dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  // Navigate Previous / Next day
  const changeDateByDays = (days) => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + days);
    onSelectDate(d.toISOString().split('T')[0]);
  };

  const logsForDate = allLogs[selectedDate] || [];

  // Compute daily macro subtotals
  const dayTotals = logsForDate.reduce((acc, item) => {
    if (item.category === 'Water') {
      acc.water += item.amountMl || 250;
    } else {
      acc.calories += item.calories || 0;
      acc.protein += item.protein || 0;
      acc.carbs += item.carbs || 0;
      acc.fat += item.fat || 0;
    }
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0 });

  const handleSaveNote = (e) => {
    e.preventDefault();
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 2000);
  };

  return (
    <div style={{ padding: '16px', animation: 'fadeIn 0.25s ease' }}>
      {/* Date Header & Selector */}
      <div className="card" style={{ margin: '0 0 16px 0', padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button 
            onClick={() => changeDateByDays(-1)}
            style={{ background: '#f1f5f9', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            aria-label="Previous Day"
          >
            <ChevronLeft size={18} color="#0f172a" />
          </button>

          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
              <Calendar size={16} color="#0f172a" />
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                {dateDisplay}
              </span>
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', marginTop: '2px', display: 'block' }}>
              {logsForDate.length} item{logsForDate.length !== 1 ? 's' : ''} logged
            </span>
          </div>

          <button 
            onClick={() => changeDateByDays(1)}
            style={{ background: '#f1f5f9', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            aria-label="Next Day"
          >
            <ChevronRight size={18} color="#0f172a" />
          </button>
        </div>

        {/* Selected Day Summary Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ff7a00' }}>{Math.round(dayTotals.calories)}</div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b' }}>kcal</div>
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#22c55e' }}>{Math.round(dayTotals.protein)}g</div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b' }}>Protein</div>
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#6366f1' }}>{Math.round(dayTotals.carbs)}g</div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b' }}>Carbs</div>
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f59e0b' }}>{Math.round(dayTotals.fat)}g</div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b' }}>Fat</div>
          </div>
        </div>
      </div>

      {/* Categorized Meal Logs */}
      {CATEGORIES.map((cat) => {
        const catLogs = logsForDate.filter(item => item.category === cat.name);
        const Icon = cat.icon;

        const catCalories = catLogs.reduce((sum, item) => sum + (item.calories || 0), 0);
        const catProtein = catLogs.reduce((sum, item) => sum + (item.protein || 0), 0);

        return (
          <div key={cat.name} className="card" style={{ margin: '0 0 14px 0', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: catLogs.length > 0 ? '12px' : '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={cat.color} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>{cat.name}</h4>
                  {catLogs.length > 0 && (
                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>
                      {cat.name === 'Water' ? `${dayTotals.water} ml total` : `${Math.round(catCalories)} kcal • ${Math.round(catProtein)}g protein`}
                    </span>
                  )}
                </div>
              </div>

              <button 
                onClick={() => onQuickAddCategory(cat.name)}
                style={{
                  background: `${cat.color}15`,
                  color: cat.color,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>

            {/* List of Logged Items in this Category */}
            {catLogs.length === 0 ? (
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic', padding: '4px 0 2px 0' }}>
                Nothing logged for {cat.name.toLowerCase()} yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {catLogs.map((item) => (
                  <div 
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      background: '#f8fafc',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1px solid #f1f5f9'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                        {item.portion || '1 serving'} • {item.calories} kcal (P: {item.protein}g C: {item.carbs}g F: {item.fat}g)
                      </div>
                    </div>

                    <button 
                      onClick={() => onDeleteLog(item.id)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                      title="Delete Entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Daily Reflection / Notes Card */}
      <div className="card" style={{ margin: '0 0 16px 0', padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <FileText size={18} color="#6366f1" />
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>Daily Journal Notes</h4>
        </div>

        <form onSubmit={handleSaveNote}>
          <textarea 
            rows={3}
            className="input-field"
            placeholder="Record notes, energy levels, or workout thoughts for today..."
            value={journalNote}
            onChange={(e) => setJournalNote(e.target.value)}
            style={{ fontSize: '0.8rem', resize: 'none', marginBottom: '8px' }}
          />

          <button 
            type="submit" 
            className="btn-primary"
            style={{ padding: '8px 12px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            {savedNote ? <Check size={14} /> : <FileText size={14} />}
            <span>{savedNote ? 'Note Saved!' : 'Save Daily Note'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
