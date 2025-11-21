import React, { useState } from 'react';
import { SLIDES } from './constants';
import { ProbChart } from './components/ProbChart';
import { RedGreenList } from './components/RedGreenList';
import { TournamentBracket } from './components/TournamentBracket';
import { QualityCheck } from './components/QualityCheck';
import { EntropyScale } from './components/EntropyScale';
import { TheProblem } from './components/TheProblem';
import { SynthIDIntro } from './components/SynthIDIntro';
import { References } from './components/References';
import { ImageWatermark } from './components/ImageWatermark';
import { SynthIDDetector } from './components/SynthIDDetector';
import { ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentSlideId, setCurrentSlideId] = useState(SLIDES[0].id);

  const currentSlide = SLIDES.find(s => s.id === currentSlideId) || SLIDES[0];

  const renderContent = () => {
    switch (currentSlideId) {
      case 'the-problem': return <TheProblem />;
      case 'intro': return <SynthIDIntro />;
      case 'llm-prob': return <ProbChart />;
      case 'red-green': return <RedGreenList />;
      case 'tournament': return <TournamentBracket />;
      case 'quality': return <QualityCheck />;
      case 'detection': return <EntropyScale />;
      case 'image-watermark': return <ImageWatermark />;
      case 'detector-waitlist': return <SynthIDDetector />;
      case 'references': return <References />;
      default: return <TheProblem />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0f1115] text-white overflow-hidden font-sans selection:bg-teal-500/30">
      
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-800 flex flex-col bg-[#13161a]">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-2 mb-1">
             <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse"></div>
             <h1 className="font-bold text-xl tracking-tight text-gray-100">SynthID<span className="text-teal-400">Ex</span></h1>
          </div>
          <p className="text-xs text-gray-500 font-mono">ENGINEERING BREAKDOWN</p>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-1">
          {SLIDES.map((slide) => {
            const isActive = currentSlideId === slide.id;
            const Icon = slide.icon;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideId(slide.id)}
                className={`w-full px-6 py-4 flex items-start space-x-4 transition-all duration-200 border-l-2
                  ${isActive 
                    ? 'bg-slate-800/50 border-teal-400 text-white' 
                    : 'border-transparent text-gray-400 hover:bg-slate-800/30 hover:text-gray-200'
                  }`}
              >
                <Icon className={`w-5 h-5 mt-1 ${isActive ? 'text-teal-400' : 'text-gray-500'}`} />
                <div className="text-left">
                  <div className="font-semibold text-sm">{slide.title}</div>
                  <div className="text-xs opacity-60 mt-1">{slide.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center px-8 justify-between bg-[#13161a]/50 backdrop-blur-sm z-10">
            <div className="flex items-center text-gray-400 text-sm gap-2">
                <span>Presentation</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white font-medium">{currentSlide.title}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-xs text-gray-400 font-mono">SYSTEM: LIVE</span>
            </div>
        </header>

        {/* Dynamic Viewport */}
        <div className="flex-1 relative p-8 overflow-y-auto custom-scrollbar">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
             <div className="w-full h-full max-w-6xl mx-auto relative z-0">
                {renderContent()}
             </div>
        </div>
      </main>
    </div>
  );
};

export default App;