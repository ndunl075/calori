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
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ display: 'block' }}>
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
              transform: `rotate(-90deg)`,
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />

          {/* Native SVG Dead-Center Text */}
          <text
            x="50%"
            y={sublabel ? "44%" : "52%"}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#0f172a"
            fontSize={size > 120 ? '26' : '15'}
            fontWeight="800"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            {percentage}%
          </text>

          {sublabel && (
            <text
              x="50%"
              y="66%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#64748b"
              fontSize={size > 120 ? '12' : '9'}
              fontWeight="700"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              {sublabel}
            </text>
          )}
        </svg>
      </div>

      {label && (
        <span className="ring-label">
          {label}
        </span>
      )}
    </div>
  );
}
