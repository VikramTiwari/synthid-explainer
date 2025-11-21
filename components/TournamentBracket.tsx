import React, { useState, useEffect } from 'react';
import { Trophy, Hash } from 'lucide-react';
import { PREDICTION_DATA } from '../constants';

// Helper to generate deterministic random numbers based on a seed string
const pseudoRandom = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const x = Math.sin(hash) * 10000;
  return x - Math.floor(x);
};

interface Candidate {
  name: string;
  prob: number;
  gValue: number; // The secret watermark score
}

export const TournamentBracket: React.FC = () => {
  const [keySeed, setKeySeed] = useState<string>(Date.now().toString());
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Initialize candidates with random g-values based on the current "Secret Key" (seed)
    const newCandidates = PREDICTION_DATA.map(d => ({
      ...d,
      // In real SynthID, g-value generation is more complex involving the probability
      // Here we simplify: g-value is random [0,1].
      // The winner is technically determined by a composition of prob and g-value.
      // For visualization simplicity: We will just show the g-value acting as the tiebreaker/booster.
      gValue: pseudoRandom(d.name + keySeed)
    }));
    setCandidates(newCandidates);
  }, [keySeed]);

  const regenerateKey = () => setKeySeed(Date.now().toString());

  // Tournament Logic
  // Round 1
  const match1 = candidates.slice(0, 2); // Mango vs Lychee
  const match2 = candidates.slice(2, 4); // Papaya vs Durian

  // Helper to pick winner (simplified logic: normally uses hashed value comparison)
  // Here: Winner is whoever has higher gValue (visualization purpose)
  const getWinner = (c1: Candidate, c2: Candidate) => c1.gValue > c2.gValue ? c1 : c2;

  const winner1 = match1.length === 2 ? getWinner(match1[0], match1[1]) : null;
  const winner2 = match2.length === 2 ? getWinner(match2[0], match2[1]) : null;
  
  // Final
  const finalWinner = (winner1 && winner2) ? getWinner(winner1, winner2) : null;

  const CandidateCard = ({ cand, isWinner, isLoser }: { cand: Candidate, isWinner?: boolean, isLoser?: boolean }) => (
    <div className={`
      relative flex flex-col p-3 rounded-lg border-2 transition-all duration-500 w-32
      ${isWinner ? 'border-teal-400 bg-teal-900/30 shadow-[0_0_15px_rgba(45,212,191,0.3)] scale-105' : ''}
      ${isLoser ? 'border-slate-700 bg-slate-800/50 opacity-50 grayscale' : 'border-slate-600 bg-slate-800'}
    `}>
      <span className="font-bold text-white">{cand.name}</span>
      <div className="flex justify-between text-xs mt-1">
        <span className="text-gray-400">P: {(cand.prob * 100).toFixed(0)}%</span>
        <span className="text-teal-300 font-mono">g: {cand.gValue.toFixed(2)}</span>
      </div>
    </div>
  );

  if (candidates.length === 0) return null;

  return (
    <div className="w-full h-full flex flex-col items-center p-6">
      <div className="flex justify-between items-center w-full max-w-4xl mb-8">
        <div>
            <h3 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="text-yellow-500" />
                Tournament Sampling
            </h3>
            <p className="text-gray-400 text-sm">Words compete based on a secret <span className="text-teal-400 font-mono">g-value</span>.</p>
        </div>
        <button 
            onClick={regenerateKey}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
        >
            <Hash className="w-4 h-4" />
            Change Secret Key
        </button>
      </div>

      {/* Bracket Visualization */}
      <div className="flex flex-row justify-between items-center w-full max-w-5xl h-96">
        
        {/* Round 1 (Quarterfinals/Pool) */}
        <div className="flex flex-col justify-around h-full space-y-8">
            {/* Match 1 Inputs */}
            <div className="flex flex-col gap-4 relative">
                <CandidateCard cand={match1[0]} isWinner={match1[0] === winner1} isLoser={match1[0] !== winner1} />
                <CandidateCard cand={match1[1]} isWinner={match1[1] === winner1} isLoser={match1[1] !== winner1} />
                {/* Connector Lines */}
                <div className="absolute -right-8 top-1/2 w-8 h-px bg-slate-600"></div>
                <div className="absolute -right-8 top-8 bottom-8 border-r border-slate-600"></div>
            </div>

            {/* Match 2 Inputs */}
            <div className="flex flex-col gap-4 relative">
                <CandidateCard cand={match2[0]} isWinner={match2[0] === winner2} isLoser={match2[0] !== winner2} />
                <CandidateCard cand={match2[1]} isWinner={match2[1] === winner2} isLoser={match2[1] !== winner2} />
                {/* Connector Lines */}
                <div className="absolute -right-8 top-1/2 w-8 h-px bg-slate-600"></div>
                <div className="absolute -right-8 top-8 bottom-8 border-r border-slate-600"></div>
            </div>
        </div>

        {/* Round 2 (Semifinals) */}
        <div className="flex flex-col justify-around h-full py-16 relative">
            {winner1 && <CandidateCard cand={winner1} isWinner={winner1 === finalWinner} isLoser={winner1 !== finalWinner} />}
            {winner2 && <CandidateCard cand={winner2} isWinner={winner2 === finalWinner} isLoser={winner2 !== finalWinner} />}
            
            {/* Connector Lines */}
            <div className="absolute -right-8 top-1/2 w-8 h-px bg-slate-600"></div>
             <div className="absolute -right-8 top-24 bottom-24 border-r border-slate-600"></div>
        </div>

        {/* Winner */}
        <div className="flex items-center">
             {finalWinner && (
                 <div className="flex flex-col items-center animate-bounce-short">
                     <Trophy className="w-12 h-12 text-yellow-400 mb-4 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                     <div className="text-3xl font-bold text-white bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-4 rounded-xl shadow-2xl border border-white/10">
                         {finalWinner.name}
                     </div>
                     <div className="mt-2 text-teal-400 font-mono text-sm">
                        g-score: {finalWinner.gValue.toFixed(4)}
                     </div>
                 </div>
             )}
        </div>
      </div>
      
      <div className="mt-8 bg-blue-900/20 border border-blue-800 p-4 rounded-lg max-w-2xl text-center text-sm text-blue-200">
         Note: High probability tokens still have an advantage, but the <span className="font-mono font-bold">g-value</span> (derived from the watermark key) acts as the tie-breaker or nudge, effectively encoding the watermark without banning words.
      </div>
    </div>
  );
};