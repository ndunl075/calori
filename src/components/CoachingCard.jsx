import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CoachingCard({ 
  text, 
  title = "COACHING", 
  hasAction = false, 
  actionText = "View insights",
  onAction 
}) {
  return (
    <div className="coaching-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="coaching-tag">{title}</span>
        <Sparkles size={14} color="#94a3b8" />
      </div>
      <p className="coaching-text">
        {text}
      </p>

      {hasAction && (
        <button 
          onClick={onAction}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: '#0f172a',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginTop: '12px',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <Sparkles size={14} color="#6366f1" />
          <span>{actionText}</span>
          <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
        </button>
      )}
    </div>
  );
}
