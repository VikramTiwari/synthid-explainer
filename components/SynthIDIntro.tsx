import React from 'react';
import { Fingerprint, FileText, Image as ImageIcon, Music, Video, ArrowDown } from 'lucide-react';

export const SynthIDIntro: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-[500px]">
      <style>{`
        @keyframes beam-flow {
          0% { stroke-dashoffset: 100; opacity: 0; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.5; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
      
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115] to-[#1a1c20] z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center text-center space-y-8 max-w-5xl w-full">
        
        {/* The Prism Graphic */}
        <div className="relative w-full max-w-[500px] h-[200px] flex items-center justify-center mb-4">
           <svg viewBox="0 0 800 300" className="w-full h-full overflow-visible drop-shadow-[0_0_30px_rgba(66,133,244,0.3)]">
              <defs>
                <linearGradient id="whiteBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="white" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Incoming Beam */}
              <line x1="0" y1="150" x2="350" y2="150" stroke="url(#whiteBeam)" strokeWidth="3" strokeLinecap="round" />

              {/* The Prism */}
              <path 
                d="M400,50 L500,250 L300,250 Z" 
                fill="rgba(255,255,255,0.03)" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="2"
                className="backdrop-blur-sm"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              />
              
              {/* Internal Glow */}
              <circle cx="400" cy="150" r="60" fill="url(#whiteBeam)" opacity="0.1" className="animate-pulse" />
           </svg>
           
           {/* Central Icon */}
           <div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f1115] p-4 rounded-2xl border border-slate-700 shadow-2xl z-20"
             style={{ animation: 'float 6s ease-in-out infinite reverse' }}
           >
             <Fingerprint className="w-10 h-10 text-teal-400" />
           </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter text-white mb-2">
                SynthID
            </h1>
            
            <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                A family of watermarking technologies for AI-generated content.
            </p>
        </div>

        {/* Modalities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-8">
            {/* Text (Highlighted) */}
            <div className="group relative bg-slate-800/80 border-2 border-teal-500 rounded-xl p-6 flex flex-col items-center gap-3 shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all hover:scale-105">
                <div className="absolute -top-3 bg-teal-500 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    Focus of this video
                </div>
                <div className="p-3 bg-teal-500/10 rounded-full">
                    <FileText className="w-6 h-6 text-teal-400" />
                </div>
                <span className="font-bold text-white">Text</span>
                <span className="text-xs text-slate-400">Tournament Sampling</span>
            </div>

            {/* Audio */}
            <div className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-all hover:border-slate-600">
                <div className="p-3 bg-slate-800 rounded-full">
                    <Music className="w-6 h-6 text-purple-400" />
                </div>
                <span className="font-bold text-gray-300">Audio</span>
                <span className="text-xs text-slate-500">Spectrogram Overlay</span>
            </div>

            {/* Image */}
            <div className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-all hover:border-slate-600">
                 <div className="p-3 bg-slate-800 rounded-full">
                    <ImageIcon className="w-6 h-6 text-blue-400" />
                </div>
                <span className="font-bold text-gray-300">Image</span>
                <span className="text-xs text-slate-500">Pixel Perturbation</span>
            </div>

            {/* Video */}
            <div className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-all hover:border-slate-600">
                 <div className="p-3 bg-slate-800 rounded-full">
                    <Video className="w-6 h-6 text-orange-400" />
                </div>
                <span className="font-bold text-gray-300">Video</span>
                <span className="text-xs text-slate-500">Frame Injection</span>
            </div>
        </div>

        <div className="pt-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 animate-bounce">
                <ArrowDown className="w-3 h-3" />
                <span>DIVING DEEP INTO TEXT</span>
                <ArrowDown className="w-3 h-3" />
            </div>
        </div>

      </div>
    </div>
  );
};