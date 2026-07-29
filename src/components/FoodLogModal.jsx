import React, { useState } from 'react';
import { X, Search, Plus, Camera, Sparkles, Check, Droplet, Coffee, Sun, Moon, Cookie } from 'lucide-react';
import { searchFoodDatabase, PRESET_FOODS } from '../services/foodDatabase';
import confetti from 'canvas-confetti';

const CATEGORIES = [
  { id: 'Breakfast', icon: Coffee, color: '#f59e0b' },
  { id: 'Lunch', icon: Sun, color: '#eab308' },
  { id: 'Dinner', icon: Moon, color: '#6366f1' },
  { id: 'Snacks', icon: Cookie, color: '#ec4899' },
  { id: 'Water', icon: Droplet, color: '#0284c7' }
];

export default function FoodLogModal({ onClose, onAddLog }) {
  const [activeCategory, setActiveCategory] = useState('Breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [tabMode, setTabMode] = useState('database'); // 'database' | 'custom'
  const [portionMultiplier, setPortionMultiplier] = useState(1);

  // Custom food state
  const [customName, setCustomName] = useState('');
  const [customCalories, setCustomCalories] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customFat, setCustomFat] = useState('');

  // Search Results
  const filteredFoods = searchFoodDatabase(searchQuery);

  const handleSelectPreset = (food) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog = {
      id: 'log_' + Date.now() + Math.random().toString(36).substring(2, 5),
      name: food.name,
      category: activeCategory,
      calories: Math.round(food.calories * portionMultiplier),
      protein: Math.round(food.protein * portionMultiplier * 10) / 10,
      carbs: Math.round(food.carbs * portionMultiplier * 10) / 10,
      fat: Math.round(food.fat * portionMultiplier * 10) / 10,
      time: timeNow
    };

    onAddLog(newLog);
    triggerCelebration();
    onClose();
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customName.trim() || !customCalories) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog = {
      id: 'log_' + Date.now(),
      name: customName.trim(),
      category: activeCategory,
      calories: parseFloat(customCalories) || 0,
      protein: parseFloat(customProtein) || 0,
      carbs: parseFloat(customCarbs) || 0,
      fat: parseFloat(customFat) || 0,
      time: timeNow
    };

    onAddLog(newLog);
    triggerCelebration();
    onClose();
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.85 }
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              Log Food & Macros
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Search food library or enter custom meal specs
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} color="#64748b" />
          </button>
        </div>

        {/* Meal Category Selector Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: isSelected ? '2px solid #0f172a' : '1px solid #e2e8f0',
                  background: isSelected ? '#0f172a' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#475569',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={14} color={isSelected ? '#ffffff' : cat.color} />
                <span>{cat.id}</span>
              </button>
            );
          })}
        </div>

        {/* Mode Toggle: Database vs Quick Custom */}
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '12px', padding: '4px', marginBottom: '16px' }}>
          <button
            onClick={() => setTabMode('database')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '10px',
              border: 'none',
              background: tabMode === 'database' ? '#ffffff' : 'transparent',
              color: tabMode === 'database' ? '#0f172a' : '#64748b',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: tabMode === 'database' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            Search Library
          </button>
          <button
            onClick={() => setTabMode('custom')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '10px',
              border: 'none',
              background: tabMode === 'custom' ? '#ffffff' : 'transparent',
              color: tabMode === 'custom' ? '#0f172a' : '#64748b',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: tabMode === 'custom' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            Custom Quick Add
          </button>
        </div>

        {tabMode === 'database' ? (
          <>
            {/* Search Input Bar */}
            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text"
                placeholder="Search food, chicken, oats, avocado..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '42px' }}
              />
            </div>

            {/* Serving Size Multiplier Selector */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', padding: '8px 12px', background: '#f8fafc', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Serving Multiplier:</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[0.5, 1, 1.5, 2].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPortionMultiplier(m)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: portionMultiplier === m ? '1.5px solid #0f172a' : '1px solid #e2e8f0',
                      background: portionMultiplier === m ? '#0f172a' : '#ffffff',
                      color: portionMultiplier === m ? '#ffffff' : '#334155',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {m}x
                  </button>
                ))}
              </div>
            </div>

            {/* Preset Food List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
              {filteredFoods.map((food) => (
                <div 
                  key={food.id}
                  onClick={() => handleSelectPreset(food)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: '1px solid #f1f5f9',
                    background: '#ffffff',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                >
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                      {food.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {food.serving} • P:{food.protein}g | C:{food.carbs}g | F:{food.fat}g
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                      {Math.round(food.calories * portionMultiplier)} kcal
                    </span>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Plus size={16} color="#0f172a" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Custom Quick Add Form */
          <form onSubmit={handleAddCustom} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px', display: 'block' }}>Meal Name</label>
              <input 
                type="text"
                placeholder="e.g. Protein Smoothie"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px', display: 'block' }}>Calories (kcal)</label>
                <input 
                  type="number"
                  placeholder="350"
                  value={customCalories}
                  onChange={(e) => setCustomCalories(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px', display: 'block' }}>Protein (g)</label>
                <input 
                  type="number"
                  placeholder="25"
                  value={customProtein}
                  onChange={(e) => setCustomProtein(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px', display: 'block' }}>Carbohydrates (g)</label>
                <input 
                  type="number"
                  placeholder="40"
                  value={customCarbs}
                  onChange={(e) => setCustomCarbs(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px', display: 'block' }}>Fat (g)</label>
                <input 
                  type="number"
                  placeholder="10"
                  value={customFat}
                  onChange={(e) => setCustomFat(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
              Log {activeCategory}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
