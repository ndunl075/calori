import React from 'react';

export default function RingGauge({ 
  percentage = 0, 
  size = 80, 
  strokeWidth = 9, 
  gradientId = 'gaugeGradient',
  startColor = '#ff7a00',
  endColor = '#ffb800',
  label = '',
  sublabel = '',
  onClick
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Limit percentage between 0 and 100 for gauge drawing
  const clamped = Math.min(Math.max(percentage, 0), 100);
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div 
      onClick={onClick}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative'
      }}
    >
      <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
            <filter id={`shadow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={startColor} floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Background Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Animated Gradient Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter={`url(#shadow-${gradientId})`}
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </svg>

        {/* Center Percentage & Value Display */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            textAlign: 'center',
            pointerEvents: 'none'
          }}
        >
          <span style={{ 
            fontSize: size > 120 ? '1.75rem' : '1.05rem', 
            fontWeight: 800, 
            color: '#0f172a',
            lineHeight: 1,
            margin: 0,
            padding: 0
          }}>
            {percentage}%
          </span>
          {sublabel && (
            <span style={{ 
              fontSize: size > 120 ? '0.78rem' : '0.62rem', 
              fontWeight: 700, 
              color: '#64748b',
              marginTop: '3px',
              lineHeight: 1
            }}>
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {label && (
        <span className="ring-label">
          {label}
        </span>
      )}
    </div>
  );
}
