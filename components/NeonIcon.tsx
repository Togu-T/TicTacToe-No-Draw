import React from 'react';

interface NeonIconProps {
  type: 'X' | 'O';
  className?: string;
  size?: number;
  flicker?: boolean;
}

export const NeonIcon: React.FC<NeonIconProps> = ({ type, className = '', size = 64, flicker = false }) => {
  const flickerClass = flicker ? 'animate-dying' : 'animate-neon-flicker';
  
  // Using explicit drop-shadow filter here for the core shape to ensure it glows properly against the dark bg
  if (type === 'X') {
    return (
      <div className={`${className} ${flicker ? 'opacity-80' : ''}`}>
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`stroke-neon-red ${flicker ? 'animate-dying' : ''}`}
        >
          <path 
            d="M20 20L80 80" 
            stroke="#ff0055" 
            strokeWidth="8" 
            strokeLinecap="round" 
            className={flicker ? '' : 'drop-shadow-[0_0_8px_rgba(255,0,85,0.8)]'}
          />
          <path 
            d="M80 20L20 80" 
            stroke="#ff0055" 
            strokeWidth="8" 
            strokeLinecap="round"
            className={flicker ? '' : 'drop-shadow-[0_0_8px_rgba(255,0,85,0.8)]'}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${className} ${flicker ? 'opacity-80' : ''}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`stroke-neon-blue ${flicker ? 'animate-dying' : ''}`}
      >
        <circle 
          cx="50" 
          cy="50" 
          r="35" 
          stroke="#00eaff" 
          strokeWidth="8" 
          strokeLinecap="round"
          className={flicker ? '' : 'drop-shadow-[0_0_8px_rgba(0,234,255,0.8)]'}
        />
      </svg>
    </div>
  );
};