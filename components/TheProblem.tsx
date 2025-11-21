import React, { useState, useEffect } from 'react';
import { Activity, HelpCircle, RotateCcw } from 'lucide-react';

const TYPING_SPEED = 50;

const CHAT_SAMPLES = [
  { model: 'GPT-4', color: 'bg-green-600', text: "Here is a summary of the French Revolution..." },
  { model: 'Gemini 1.5', color: 'bg-blue-600', text: "The Python code for the algorithm is..." },
  { model: 'Claude 3', color: 'bg-orange-600', text: "I can certainly help you with that creative writing..." },
];

export const TheProblem: React.FC = () => {
  const [typedTexts, setTypedTexts] = useState(['', '', '']);
  const [detectorStatus, setDetectorStatus] = useState<'idle' | 'scanning' | 'result'>('idle');
  const [probability, setProbability] = useState(50);

  useEffect(() => {
    let isActive = true;

    // Animation Loop
    const animate = async () => {
        while (isActive) {
            // Reset
            setTypedTexts(['', '', '']);
            setDetectorStatus('idle');
            
            // Type text
            for (let i = 0; i < 40; i++) {
                if (!isActive) break;
                await new Promise(r => setTimeout(r, TYPING_SPEED));
                setTypedTexts(prev => prev.map((_, idx) => CHAT_SAMPLES[idx].text.substring(0, i)));
            }

            // Scan
            if (!isActive) break;
            setDetectorStatus('scanning');
            await new Promise(r => setTimeout(r, 1500));

            // Fail Result
            if (!isActive) break;
            setDetectorStatus('result');
            setProbability(48 + Math.random() * 4); // 48-52%

            await new Promise(r => setTimeout(r, 3000));
        }
    };

    animate();
    return () => { isActive = false; };
  }, []);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-8 p-6 items-center justify-center">
      
      {/* Left Panel: The Flood */}
      <div className="flex-1 w-full max-w-md flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-bold text-gray-200">AI Content Generation</h2>
        </div>
        
        {CHAT_SAMPLES.map((sample, i) => (
          <div key={sample.model} className="bg-slate-800 border border-slate-700 rounded-xl p-4 relative overflow-hidden shadow-lg">
             <div className="flex items-center gap-2 mb-3 border-b border-slate-700/50 pb-2">
                <div className={`w-5 h-5 rounded md:rounded-md flex items-center justify-center text-[10px] font-bold text-white ${sample.color}`}>
                  AI
                </div>
                <span className="text-xs font-mono text-gray-400 font-bold">{sample.model}</span>
             </div>
             <div className="text-sm text-gray-300 font-mono h-12 leading-relaxed">
                {typedTexts[i]}<span className="animate-pulse text-teal-400">_</span>
             </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="hidden lg:flex flex-col items-center gap-2 text-slate-700">
          <div className="w-px h-32 bg-current"></div>
          <span className="font-mono text-xs">VS</span>
          <div className="w-px h-32 bg-current"></div>
      </div>

      {/* Right Panel: The Detector */}
      <div className="flex-1 w-full max-w-md">
         <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-slate-400" />
                    Detection Tool
                </h3>
                {detectorStatus === 'scanning' && <span className="text-xs text-blue-400 animate-pulse font-mono">ANALYZING...</span>}
            </div>

            <div className="flex flex-col items-center justify-center min-h-[200px]">
                {detectorStatus === 'idle' && (
                     <div className="text-gray-600 text-sm flex flex-col items-center gap-2">
                        <RotateCcw className="w-8 h-8 opacity-50" />
                        <span>Waiting for text stream...</span>
                     </div>
                )}

                {detectorStatus === 'scanning' && (
                     <div className="w-24 h-24 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                )}

                {detectorStatus === 'result' && (
                     <div className="text-center animate-in fade-in zoom-in duration-300">
                        <div className="text-6xl font-bold text-yellow-500 mb-2 tracking-tighter">{probability.toFixed(1)}%</div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-xs font-bold tracking-widest uppercase">
                            <HelpCircle className="w-3 h-3" /> Inconclusive
                        </div>
                     </div>
                )}
            </div>

            <div className="mt-8 space-y-2">
                <div className="flex justify-between text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                    <span>Human</span>
                    <span>Uncertain</span>
                    <span>Artificial</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-600 z-10"></div>
                     {detectorStatus === 'result' && (
                        <div 
                            className="h-full bg-yellow-500 transition-all duration-500 relative" 
                            style={{ width: `${probability}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow"></div>
                        </div>
                     )}
                </div>
            </div>
            
            {detectorStatus === 'result' && (
                <div className="mt-6 text-center">
                    <p className="text-red-400 text-sm font-medium">
                        "It's a coin flip."
                    </p>
                </div>
            )}
         </div>
      </div>

    </div>
  );
};