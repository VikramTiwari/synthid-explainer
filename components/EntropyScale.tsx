import React, { useState } from 'react';
import { Lock, Fingerprint, Edit3, ShieldAlert } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const EntropyScale: React.FC = () => {
  const [entropy, setEntropy] = useState<number>(80); // 0 to 100

  const getLabel = () => {
    if (entropy < 30) return "Low Entropy (Facts)";
    if (entropy > 70) return "High Entropy (Creative)";
    return "Medium Entropy";
  };

  const getDescription = () => {
    if (entropy < 30) return "Answers are rigid. 'The capital of France is Paris.' Only one valid choice.";
    if (entropy > 70) return "Many valid choices. 'Once upon a time there was a [knight|dragon|princess].'";
    return "Some flexibility, but context constraints exist.";
  };

  // Simulate watermark strength based on entropy
  // Higher entropy = More random choices to rig = Stronger watermark
  const watermarkStrength = Math.min(100, Math.max(0, entropy)); 
  const textQuality = 100; // Ideally remains high in SynthID

  // Mock data for chart
  const chartData = Array.from({ length: 20 }, (_, i) => ({
    step: i,
    score: Math.min(100, (i * 5) + (Math.random() * 20))
  }));

  return (
    <div className="w-full h-full flex flex-col p-6 space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white">Entropy & Detectability</h3>
        <p className="text-gray-400">Watermarking relies on randomness (Entropy). No randomness = No watermark.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-5xl mx-auto bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
        
        {/* Controls */}
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <span className="text-lg font-semibold text-teal-300">{getLabel()}</span>
                    <span className="font-mono text-2xl">{entropy}%</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={entropy} 
                    onChange={(e) => setEntropy(Number(e.target.value))}
                    className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <p className="text-sm text-gray-300 italic border-l-2 border-teal-500 pl-3">
                    {getDescription()}
                </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Fingerprint className={`w-5 h-5 ${watermarkStrength > 50 ? 'text-green-400' : 'text-red-400'}`} />
                        <span>Watermark Strength</span>
                    </div>
                    <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-300 ${watermarkStrength > 50 ? 'bg-green-500' : 'bg-red-500'}`} 
                            style={{ width: `${watermarkStrength}%` }}
                        ></div>
                    </div>
                </div>
                
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Edit3 className="w-5 h-5 text-blue-400" />
                        <span>Text Quality</span>
                    </div>
                    <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-500 transition-all duration-300" 
                            style={{ width: `${textQuality}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Visualization: Detection Score over tokens */}
        <div className="h-64 w-full relative">
             <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                Detection Confidence (Simulated)
             </h4>
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis hide />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: 'none' }}
                        itemStyle={{ color: '#2dd4bf' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#2dd4bf" 
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                        strokeWidth={3}
                        // Dynamically adjust the curve based on entropy
                        data={chartData.map(d => ({ ...d, score: d.score * (entropy/100) }))}
                    />
                </AreaChart>
             </ResponsiveContainer>
             
             {entropy < 30 && (
                 <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
                     <span className="text-red-400 font-bold border border-red-500/50 bg-red-900/50 px-4 py-2 rounded">
                         Signal Too Weak
                     </span>
                 </div>
             )}
        </div>

      </div>
    </div>
  );
};