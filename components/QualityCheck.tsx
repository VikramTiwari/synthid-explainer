import React from 'react';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

export const QualityCheck: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Non-Distortionary
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Users cannot tell the difference between watermarked and unwatermarked text.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {/* Stat 1 */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center hover:bg-slate-750 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
              <h3 className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">20M</h3>
              <p className="text-blue-200 uppercase tracking-widest text-xs font-bold">Queries Analyzed</p>
          </div>

          {/* Stat 2 (Centerpiece) */}
           <div className="bg-slate-800 p-8 rounded-2xl border border-teal-500/50 shadow-[0_0_30px_rgba(45,212,191,0.1)] text-center md:scale-110 z-10 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  KEY METRIC
              </div>
              <h3 className="text-5xl font-bold text-teal-400 mb-2 flex items-center justify-center gap-2">
                 <Minus className="w-8 h-8 opacity-50" /> 0.01%
              </h3>
              <p className="text-teal-200 uppercase tracking-widest text-xs font-bold">Thumbs Up/Down Delta</p>
          </div>

          {/* Stat 3 */}
           <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center hover:bg-slate-750 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
              <div className="flex justify-center space-x-4 mb-4">
                  <ThumbsUp className="text-green-500 w-8 h-8" />
                  <ThumbsDown className="text-red-500 w-8 h-8" />
              </div>
              <p className="text-blue-200 uppercase tracking-widest text-xs font-bold">Statistically Indistinguishable</p>
          </div>
      </div>
        
      <div className="text-center text-gray-500 italic text-sm max-w-lg">
          "The distribution of generated text is theoretically identical to the original model." - SynthID Paper
      </div>
    </div>
  );
};