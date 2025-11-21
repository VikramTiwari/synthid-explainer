import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PREDICTION_DATA } from '../constants';
import { RefreshCw } from 'lucide-react';

export const ProbChart: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [sentence, setSentence] = useState("My favorite tropical fruit is...");

  const handleRoll = () => {
    const rand = Math.random();
    let cumulative = 0;
    let picked = PREDICTION_DATA[PREDICTION_DATA.length - 1].name;

    for (const item of PREDICTION_DATA) {
      cumulative += item.prob;
      if (rand < cumulative) {
        picked = item.name;
        break;
      }
    }
    setSelected(picked);
    setSentence(`My favorite tropical fruit is ${picked}.`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white font-mono">{sentence}</h2>
        <p className="text-gray-400">Standard Sampling: Rolling the weighted die.</p>
      </div>

      <div className="w-full max-w-3xl h-80 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={PREDICTION_DATA} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
            <XAxis type="number" stroke="#94a3b8" tickFormatter={(val) => `${val * 100}%`} />
            <YAxis dataKey="name" type="category" stroke="#e2e8f0" width={80} style={{ fontSize: '14px', fontWeight: 600 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
              formatter={(value: number) => [`${(value * 100).toFixed(0)}%`, 'Probability']}
            />
            <Bar dataKey="prob" radius={[0, 4, 4, 0]}>
              {PREDICTION_DATA.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.name === selected ? '#ffffff' : entry.color} 
                  stroke={entry.name === selected ? entry.color : 'none'}
                  strokeWidth={2}
                  opacity={selected && entry.name !== selected ? 0.3 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <button
        onClick={handleRoll}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/50"
      >
        <RefreshCw className="w-5 h-5" />
        <span>Sample Next Token</span>
      </button>
    </div>
  );
};