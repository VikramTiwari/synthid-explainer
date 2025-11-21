import React, { useState } from 'react';
import { FileJson, Scissors, RefreshCcw, ShieldCheck, ShieldAlert, Image as ImageIcon, Layers, UploadCloud, Scan } from 'lucide-react';

export const ImageWatermark: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'metadata' | 'synthid'>('metadata');
  const [step, setStep] = useState<'original' | 'transform' | 'result'>('original');

  const runSimulation = () => {
    setStep('original');
    setTimeout(() => setStep('transform'), 1000);
    setTimeout(() => setStep('result'), 3000);
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-6 space-y-8">
      <div className="text-center space-y-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-white">The Robustness Problem</h2>
        <p className="text-gray-400">
          Why traditional metadata fails and why we need signal-level watermarking.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex space-x-4 bg-slate-800 p-1 rounded-xl border border-slate-700">
        <button
          onClick={() => { setActiveTab('metadata'); setStep('original'); }}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'metadata' ? 'bg-slate-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
          1. Metadata (C2PA)
        </button>
        <button
          onClick={() => { setActiveTab('synthid'); setStep('original'); }}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'synthid' ? 'bg-teal-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
          2. SynthID (Steganography)
        </button>
      </div>

      <div className="flex-1 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Explanation */}
        <div className="space-y-6">
            <div className={`p-6 rounded-xl border-l-4 ${activeTab === 'metadata' ? 'bg-slate-800/50 border-slate-500' : 'bg-teal-900/20 border-teal-500'}`}>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {activeTab === 'metadata' ? <FileJson className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                    {activeTab === 'metadata' ? 'The Metadata Approach' : 'The Signal Approach'}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    {activeTab === 'metadata' 
                        ? "Metadata acts like a digital sticker. It appends a cryptographically signed header to the file detailing its history. It provides a rich audit trail, but it is extrinsic to the content."
                        : "SynthID uses steganography to hide the signal inside the pixels themselves. It modifies the image in a way that is invisible to humans but detectable by machines."
                    }
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase text-gray-500 tracking-wider">Vulnerability Test</h4>
                <div className="flex items-center gap-4 text-gray-300">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'transform' ? 'bg-orange-500/20 text-orange-400 animate-pulse' : 'bg-slate-800'}`}>
                        <Scissors className="w-4 h-4" />
                    </div>
                    <span>Scenario: Screenshot or Social Media Re-encoding</span>
                </div>
            </div>

             <button
                onClick={runSimulation}
                disabled={step !== 'original' && step !== 'result'}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-white transition-all"
            >
                <RefreshCcw className={`w-4 h-4 ${step !== 'result' && step !== 'original' ? 'animate-spin' : ''}`} />
                {step === 'result' ? 'Run Test Again' : 'Simulate Attack'}
            </button>
        </div>

        {/* Right: Visualization */}
        <div className="relative bg-slate-900 rounded-2xl border border-slate-800 aspect-video overflow-hidden flex flex-col items-center justify-center shadow-2xl">
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* The Media Asset */}
            <div className={`
                relative w-64 h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-2xl flex flex-col items-center justify-center transition-all duration-700
                ${step === 'transform' ? 'scale-90 opacity-80 blur-[2px]' : 'scale-100 opacity-100'}
            `}>
                <ImageIcon className="w-12 h-12 text-white/50" />
                
                {/* Visualizing the Watermark/Metadata */}
                {activeTab === 'metadata' && step === 'original' && (
                    <div className="absolute -right-6 -top-6 bg-white text-slate-900 p-2 rounded shadow-lg animate-bounce">
                        <FileJson className="w-6 h-6" />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white"></div>
                    </div>
                )}

                {activeTab === 'synthid' && (
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                )}
            </div>

            {/* Transformation Layer */}
            {step === 'transform' && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10">
                    <div className="flex flex-col items-center animate-pulse">
                        <UploadCloud className="w-16 h-16 text-orange-500 mb-4" />
                        <span className="text-orange-400 font-mono font-bold">STRIPPING METADATA...</span>
                        <span className="text-xs text-gray-500">Re-encoding JPEGs</span>
                    </div>
                </div>
            )}

            {/* Result Layer */}
            {step === 'result' && (
                <div className="absolute inset-x-0 bottom-0 bg-slate-800/90 backdrop-blur p-6 border-t border-slate-700 animate-in slide-in-from-bottom-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Provenance Check</h4>
                            <div className="flex items-center gap-2">
                                <Scan className="w-4 h-4 text-blue-400" />
                                <span className="text-xs font-mono">Scanning content...</span>
                            </div>
                        </div>

                        {activeTab === 'metadata' ? (
                            <div className="flex items-center gap-3 text-red-400 bg-red-900/20 px-4 py-2 rounded-lg border border-red-900/50">
                                <ShieldAlert className="w-6 h-6" />
                                <div className="flex flex-col">
                                    <span className="font-bold">UNVERIFIED</span>
                                    <span className="text-[10px] opacity-80">Metadata Header Missing</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 text-green-400 bg-green-900/20 px-4 py-2 rounded-lg border border-green-900/50">
                                <ShieldCheck className="w-6 h-6" />
                                <div className="flex flex-col">
                                    <span className="font-bold">VERIFIED</span>
                                    <span className="text-[10px] opacity-80">Watermark Detected in Pixels</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};