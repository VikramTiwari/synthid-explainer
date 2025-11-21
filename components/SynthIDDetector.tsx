import React from 'react';
import { ArrowRight, Upload, FileText, Image as ImageIcon, Music, Video, Lock } from 'lucide-react';

export const SynthIDDetector: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center max-w-4xl w-full space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-teal-900/30 text-teal-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-teal-500/30">
            <Lock className="w-3 h-3" />
            <span>Coming Soon</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            SynthID Detector
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Identify if something has been created by Google AI. Just upload an image, video, audio file, or text snippet.
          </p>
        </div>

        {/* Interactive Mockup */}
        <div className="w-full bg-slate-900/50 border border-dashed border-slate-700 rounded-3xl p-12 flex flex-col items-center justify-center space-y-6 transition-all hover:border-teal-500/50 group">
            
            <div className="flex items-center justify-center space-x-8 mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex flex-col items-center gap-2">
                    <div className="p-4 bg-slate-800 rounded-2xl">
                        <ImageIcon className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">IMAGE</span>
                </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="p-4 bg-slate-800 rounded-2xl">
                        <Video className="w-8 h-8 text-orange-400" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">VIDEO</span>
                </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="p-4 bg-slate-800 rounded-2xl">
                        <Music className="w-8 h-8 text-purple-400" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">AUDIO</span>
                </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="p-4 bg-slate-800 rounded-2xl">
                        <FileText className="w-8 h-8 text-teal-400" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">TEXT</span>
                </div>
            </div>

            <div className="flex flex-col items-center space-y-2">
                <div className="bg-slate-800 p-4 rounded-full mb-2 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-medium text-slate-300">Drag and drop files here</span>
                <span className="text-sm text-slate-500">Supports JPG, MP4, WAV, TXT</span>
            </div>

        </div>

        {/* CTA */}
        <a 
            href="https://deepmind.google/models/synthid/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center space-x-3 bg-white hover:bg-teal-50 text-black px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
            <span>Join waitlist</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>

      </div>
    </div>
  );
};