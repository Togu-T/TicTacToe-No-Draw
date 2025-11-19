import React from 'react';
import { Player } from '../types';

interface WinModalProps {
  winner: Player;
  onPlayAgain: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({ winner, onPlayAgain }) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="flex flex-col items-center space-y-8 p-8 rounded-2xl border border-white/10 bg-slate-900/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform scale-110">
        
        <h2 className="text-4xl md:text-6xl font-[Orbitron] font-bold text-white tracking-widest text-center">
          <span className={winner === 'X' ? 'text-neon-red' : 'text-neon-blue'}>
             PLAYER {winner}
          </span>
          <br />
          <span className="text-2xl md:text-4xl text-white mt-2 block text-neon-white">WINS</span>
        </h2>

        <button 
          onClick={onPlayAgain}
          className="px-8 py-3 bg-white text-black font-bold text-xl tracking-widest hover:bg-pink-500 hover:text-white transition-colors duration-300 rounded shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        >
          REMATCH
        </button>
      </div>
    </div>
  );
};