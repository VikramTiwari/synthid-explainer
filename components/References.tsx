import React from 'react';
import { FileText, Github, Globe, ExternalLink, ArrowRight } from 'lucide-react';

export const References: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 space-y-12">
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">References</h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Explore the research, the code, and the product behind SynthID.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Nature Paper */}
        <a 
            href="https://www.nature.com/articles/s41586-024-08025-4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-blue-500 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-900/20 flex flex-col"
        >
            <div className="mb-6 p-4 bg-blue-900/20 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Nature Paper</h3>
            <p className="text-slate-400 mb-8 flex-grow">
                "Scalable watermarking for identifying large language model outputs" (2024). The definitive academic publication.
            </p>
            <div className="flex items-center text-blue-400 font-semibold text-sm">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
        </a>

        {/* GitHub */}
        <a 
            href="https://github.com/google-deepmind/synthid-text" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-500 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-slate-700/20 flex flex-col"
        >
            <div className="mb-6 p-4 bg-slate-700/30 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                <Github className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-slate-300 transition-colors">Open Source</h3>
            <p className="text-slate-400 mb-8 flex-grow">
                Official implementation of the hashing and sampling algorithms in C++ and Python. Run it yourself.
            </p>
            <div className="flex items-center text-white font-semibold text-sm">
                <span>View Repo</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
        </a>

        {/* DeepMind Website */}
        <a 
            href="https://deepmind.google/models/synthid/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-teal-500 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-teal-900/20 flex flex-col"
        >
             <div className="mb-6 p-4 bg-teal-900/20 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">DeepMind Overview</h3>
            <p className="text-slate-400 mb-8 flex-grow">
                Learn about the full suite of SynthID tools including Audio, Image, and Video watermarking.
            </p>
            <div className="flex items-center text-teal-400 font-semibold text-sm">
                <span>Visit Website</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
        </a>
      </div>
    </div>
  );
};