import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { PREDICTION_DATA } from '../constants';

export const RedGreenList: React.FC = () => {
  const [seed, setSeed] = useState<number>(Date.now());

  // Simple pseudo-random split based on seed
  const getCategory = (word: string) => {
    // Simple hash function for demo
    let hash = 0;
    const str = word + seed;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 2 === 0 ? 'green' : 'red';
  };

  const greenList = PREDICTION_DATA.filter(d => getCategory(d.name) === 'green');
  const redList = PREDICTION_DATA.filter(d => getCategory(d.name) === 'red');

  // Find the best available word (highest prob in Green List)
  const bestOriginal = PREDICTION_DATA[0]; // Mango
  const bestAllowed = greenList.length > 0 ? greenList[0] : null; 
  const isQualityDegraded = bestOriginal.name !== bestAllowed?.name;

  const randomize = () => setSeed(Math.random());

  return (
    <div className="w-full h-full flex flex-col items-center p-6 space-y-8">
      <div className="text-center max-w-2xl">
        <h3 className="text-2xl font-bold mb-2">The "Red List" Method</h3>
        <p className="text-gray-400">
          The vocabulary is randomly split. The model is forced to pick from the <span className="text-green-400">Green List</span>.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Green List */}
        <div className="bg-green-900/20 border border-green-800/50 rounded-xl p-6 flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="text-green-500 w-6 h-6" />
                <h4 className="text-xl font-bold text-green-400">Green List (Allowed)</h4>
            </div>
            <div className="space-y-2 w-full">
                {greenList.length === 0 && <p className="text-gray-500 italic text-center">Empty...</p>}
                {greenList.map(item => (
                    <div key={item.name} className="flex justify-between bg-green-900/40 p-3 rounded border border-green-800">
                        <span>{item.name}</span>
                        <span className="font-mono opacity-70">{(item.prob * 100).toFixed(0)}%</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Red List */}
        <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-6 flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
                <XCircle className="text-red-500 w-6 h-6" />
                <h4 className="text-xl font-bold text-red-400">Red List (Forbidden)</h4>
            </div>
            <div className="space-y-2 w-full opacity-50 grayscale">
                 {redList.length === 0 && <p className="text-gray-500 italic text-center">Empty...</p>}
                {redList.map(item => (
                    <div key={item.name} className="flex justify-between bg-red-900/40 p-3 rounded border border-red-800">
                        <span className="line-through">{item.name}</span>
                        <span className="font-mono opacity-70">{(item.prob * 100).toFixed(0)}%</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col">
            <span className="text-gray-400 text-sm uppercase tracking-wider">Model Result</span>
            {bestAllowed ? (
                <span className="text-2xl font-mono">"My favorite fruit is <span className={isQualityDegraded ? 'text-yellow-400' : 'text-green-400'}>{bestAllowed.name}</span>"</span>
            ) : (
                <span className="text-red-500 font-bold">ERROR: No valid words</span>
            )}
        </div>

        {isQualityDegraded && bestAllowed && (
             <div className="flex items-center space-x-3 bg-yellow-900/30 px-4 py-2 rounded-lg border border-yellow-700/50">
                <AlertTriangle className="text-yellow-500 w-5 h-5" />
                <span className="text-yellow-200 text-sm">Quality Degraded (Wanted "{bestOriginal.name}")</span>
             </div>
        )}
        
        <button onClick={randomize} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-semibold transition-colors">
            New Random Split
        </button>
      </div>
    </div>
  );
};