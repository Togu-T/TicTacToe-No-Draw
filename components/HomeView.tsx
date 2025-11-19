import React, { useState } from 'react';
import { NeonIcon } from './NeonIcon';

interface HomeViewProps {
  onStart: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStart }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => setHoveredId(id);
  const handleMouseLeave = () => setHoveredId(null);

  const getGlitchClass = (id: string) => {
    return hoveredId === id ? 'animate-realistic-flicker' : '';
  };

  return (
    <div className="z-10 flex flex-col items-center justify-center min-h-screen animate-in fade-in duration-700">
      
      {/* Logo Container */}
      <div className="flex flex-col items-center gap-2 scale-75 md:scale-100 mb-20">
        
        {/* Row 1: X I C */}
        <div className="flex items-center gap-4">
           <div 
             onMouseEnter={() => handleMouseEnter('icon-x-1')} 
             onMouseLeave={handleMouseLeave}
             className={getGlitchClass('icon-x-1')}
           >
             <NeonIcon type="X" size={60} />
           </div>
           <div className="flex gap-2 font-[Orbitron] text-6xl md:text-8xl text-neon-white tracking-widest">
             <span 
               onMouseEnter={() => handleMouseEnter('I')} 
               onMouseLeave={handleMouseLeave} 
               className={`cursor-default ${getGlitchClass('I')}`}
             >
               I
             </span>
             <span 
               onMouseEnter={() => handleMouseEnter('C')} 
               onMouseLeave={handleMouseLeave} 
               className={`cursor-default ${getGlitchClass('C')}`}
             >
               C
             </span>
           </div>
        </div>

        {/* Row 2: T A C */}
        <div className="flex items-center gap-4">
           <div className="flex gap-2 font-[Orbitron] text-6xl md:text-8xl text-neon-white tracking-widest">
             <span 
               onMouseEnter={() => handleMouseEnter('T')} 
               onMouseLeave={handleMouseLeave} 
               className={`cursor-default ${getGlitchClass('T')}`}
             >
               T
             </span>
             <span 
               onMouseEnter={() => handleMouseEnter('A')} 
               onMouseLeave={handleMouseLeave} 
               className={`cursor-default ${getGlitchClass('A')}`}
             >
               A
             </span>
             <span 
               onMouseEnter={() => handleMouseEnter('C2')} 
               onMouseLeave={handleMouseLeave} 
               className={`cursor-default ${getGlitchClass('C2')}`}
             >
               C
             </span>
           </div>
        </div>

        {/* Row 3: X O E */}
        <div className="flex items-center gap-4">
           <div 
             onMouseEnter={() => handleMouseEnter('icon-x-2')} 
             onMouseLeave={handleMouseLeave}
             className={getGlitchClass('icon-x-2')}
           >
             <NeonIcon type="X" size={60} />
           </div>
           <div 
             onMouseEnter={() => handleMouseEnter('icon-o-1')} 
             onMouseLeave={handleMouseLeave}
             className={getGlitchClass('icon-o-1')}
           >
             <NeonIcon type="O" size={60} />
           </div>
           <div className="flex gap-2 font-[Orbitron] text-6xl md:text-8xl text-neon-white tracking-widest">
             <span 
               onMouseEnter={() => handleMouseEnter('E')} 
               onMouseLeave={handleMouseLeave} 
               className={`cursor-default ${getGlitchClass('E')}`}
             >
               E
             </span>
           </div>
        </div>
      </div>

      {/* Play Button */}
      <button 
        onClick={onStart}
        className="group relative px-16 py-5 bg-transparent border-2 border-blue-500 rounded-sm overflow-hidden transition-all duration-300 hover:border-pink-500 hover:scale-105 active:scale-95"
      >
        {/* Button Background Glow */}
        <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-pink-900/20 transition-colors duration-300" />
        
        {/* Glitch lines */}
        <div className="absolute top-0 left-[-100%] w-[200%] h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[shimmer_3s_infinite] group-hover:via-pink-400" />
        <div className="absolute bottom-0 right-[-100%] w-[200%] h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[shimmer_3s_infinite_reverse] group-hover:via-pink-400" />

        <span className="relative z-10 font-[Orbitron] text-3xl md:text-4xl font-bold tracking-[0.2em] text-neon-blue group-hover:text-neon-red transition-colors duration-300">
          PLAY
        </span>
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400 group-hover:border-pink-500" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-400 group-hover:border-pink-500" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-400 group-hover:border-pink-500" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-400 group-hover:border-pink-500" />
      </button>

    </div>
  );
};