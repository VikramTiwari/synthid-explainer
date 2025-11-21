import React, { useState } from 'react';
import { Scan, Eye, Wand2, Sparkles, Fingerprint } from 'lucide-react';

const GRID_SIZE = 13;

// Define the shapes as coordinate maps
const getPixelData = (x: number, y: number) => {
  // Shape "A"
  const isA = 
    (y > 2 && y < 11 && (x === 2 || x === 10)) || // Legs
    (y === 2 && x > 2 && x < 10) || // Top
    (y === 6 && x > 2 && x < 10);   // Middle bar

  // Shape "G" (Google)
  const isG = 
    (y === 2 && x > 2 && x <= 10) || // Top bar
    (x === 2 && y > 2 && y < 10) || // Left bar
    (y === 10 && x > 2 && x < 10) || // Bottom bar
    (x === 10 && y > 5 && y < 10) || // Right bar (bottom part)
    (y === 6 && x > 6 && x <= 10);   // Middle crossbar

  return { isA, isG };
};

export const SteganographyExplainer: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(0); // 0 to 100
  const [isHovering, setIsHovering] = useState(false);

  // Generate Grid
  const grid = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      grid.push({ x, y, ...getPixelData(x, y) });
    }
  }

  const t = sliderValue / 100; // Normalized 0-1

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-12">
      <div className="text-center max-w-3xl space-y-4">
        <h2 className="text-4xl font-bold text-white tracking-tight">Steganography</h2>
        <p className="text-xl text-slate-400">
          The visible message says <span className="text-white font-bold" style={{ opacity: 1 - t + 0.3 }}>"A"</span>. 
          The hidden watermark says <span className="text-teal-400 font-bold" style={{ opacity: t + 0.3 }}>"G"</span>.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-16 items-center">
        
        {/* The Visual Stage */}
        <div className="relative group">
            
            {/* The Grid */}
            <div 
                className="grid gap-1 p-6 bg-slate-900 rounded-2xl border-2 border-slate-800 shadow-2xl transition-all duration-100"
                style={{ 
                    gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                    borderColor: `rgba(45, 212, 191, ${t * 0.8})`,
                    boxShadow: `0 0 ${20 + t * 30}px rgba(45, 212, 191, ${t * 0.2})`
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {grid.map((pixel, i) => {
                    // Visual Logic based on 't' (slider value 0-1)
                    
                    // Determine target states
                    // State A (t=0): isA is White/Visible. Others dim.
                    // State G (t=1): isG is Teal/Visible. Others dim.
                    
                    let bgClass = '';
                    let opacity = 0.1;
                    let scale = 1;
                    let shadow = 'none';
                    let color = ''; 

                    // We calculate RGBA values manually for smooth interpolation
                    // Slate-200: 226, 232, 240
                    // Teal-400: 45, 212, 191
                    // Slate-800: 30, 41, 59 (Background)

                    // Base visibility
                    const visibilityA = pixel.isA ? (1 - t) : 0;
                    const visibilityG = pixel.isG ? t : 0;
                    
                    // Whichever signal is stronger dominates the pixel's visual state
                    
                    if (pixel.isA && pixel.isG) {
                        // Transition from White to Teal
                        const r = 226 + (45 - 226) * t;
                        const g = 232 + (212 - 232) * t;
                        const b = 240 + (191 - 240) * t;
                        color = `rgb(${r},${g},${b})`;
                        opacity = 1;
                        scale = 1 + (t * 0.1);
                        if (t > 0.5) shadow = `0 0 ${10 * t}px rgba(45,212,191, ${t})`;
                    } else if (pixel.isA) {
                        // Fades out
                        color = `rgb(226, 232, 240)`;
                        opacity = Math.max(0.1, 1 - t * 1.5); // Fade out faster
                        scale = 1 - (t * 0.2);
                    } else if (pixel.isG) {
                        // Fades in
                        color = `rgb(45, 212, 191)`;
                        opacity = Math.max(0.1, (t - 0.2) * 1.5); // Fade in delayed
                        scale = 0.8 + (t * 0.3);
                        if (t > 0.5) shadow = `0 0 ${15 * t}px rgba(45,212,191, ${t})`;
                    } else {
                        // Background noise
                        color = `rgb(30, 41, 59)`;
                        opacity = 0.3;
                        scale = 1;
                    }

                    return (
                        <div 
                            key={i}
                            className="w-6 h-6 md:w-8 md:h-8 rounded-sm transition-transform duration-75 ease-out"
                            style={{
                                backgroundColor: color,
                                opacity: opacity,
                                transform: `scale(${scale})`,
                                boxShadow: shadow
                            }}
                        />
                    );
                })}
            </div>

            {/* Overlay Label */}
            <div className={`absolute -bottom-12 left-0 right-0 text-center transition-all duration-500`} style={{ opacity: t, transform: `translateY(${t * -5}px)` }}>
                <span className="inline-flex items-center gap-2 text-teal-400 font-mono text-sm uppercase tracking-widest font-bold drop-shadow-lg">
                    <Fingerprint className="w-4 h-4" /> Watermark Revealed
                </span>
            </div>
        </div>

        {/* Controls & Explanation */}
        <div className="flex flex-col space-y-8 max-w-sm w-full">
            
            {/* Slider Control */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-6 shadow-xl">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Eye className="w-4 h-4" /> Human Vision
                    </span>
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
                         Machine Vision <Wand2 className="w-4 h-4" />
                    </span>
                </div>
                
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderValue} 
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full h-4 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-400 hover:accent-teal-300 transition-all"
                    style={{
                        backgroundImage: `linear-gradient(to right, #334155 0%, #2dd4bf ${sliderValue}%, #0f172a ${sliderValue}%, #0f172a 100%)`
                    }}
                />

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>ORIGINAL</span>
                    <span>FILTER STRENGTH: {sliderValue}%</span>
                    <span>DECODED</span>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-white font-semibold">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span>The Concept</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Drag the slider to apply the "decoder filter".
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                    The shape <strong className="text-white">"A"</strong> represents the content you see. 
                    The shape <strong className="text-teal-400">"G"</strong> (for Google) represents the hidden signal that mathematical models can detect.
                    SynthID embeds this signal without distorting the original content.
                </p>
            </div>

        </div>

      </div>
    </div>
  );
};