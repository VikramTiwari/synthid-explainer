import { LucideIcon, Brain, Split, Trophy, Scale, Search, AlertTriangle, Sparkles, BookOpen, Image, Radar, Eye } from 'lucide-react';

export interface Slide {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const SLIDES: Slide[] = [
  { id: 'the-problem', title: 'The Problem', description: 'Why detection is failing', icon: AlertTriangle },
  { id: 'steganography', title: 'Steganography 101', description: 'Hiding in plain sight', icon: Eye },
  { id: 'intro', title: 'Introducing SynthID', description: 'The Solution', icon: Sparkles },
  { id: 'llm-prob', title: 'LLM Probability', description: 'How LLMs predict the next token', icon: Brain },
  { id: 'red-green', title: 'Red vs. Green List', description: 'Traditional Watermarking (The Old Way)', icon: Split },
  { id: 'tournament', title: 'Tournament Sampling', description: 'The Core SynthID Innovation', icon: Trophy },
  { id: 'quality', title: 'Non-Distortionary', description: 'Impact on text quality', icon: Scale },
  { id: 'detection', title: 'Detection & Entropy', description: 'Detecting the watermark signal', icon: Search },
  { id: 'image-watermark', title: 'Image & Robustness', description: 'Why metadata fails vs. signal injection', icon: Image },
  { id: 'detector-waitlist', title: 'SynthID Detector', description: 'Verify content authenticity', icon: Radar },
  { id: 'references', title: 'References', description: 'Paper, Code, and Resources', icon: BookOpen },
];

export const COLORS = {
  primary: '#4285f4',
  secondary: '#24c1e0',
  accent: '#a142f4',
  success: '#34a853',
  danger: '#ea4335',
  bg: '#1a1c20',
};

// Mock data for the token prediction
export const PREDICTION_DATA = [
  { name: 'Mango', prob: 0.50, color: COLORS.primary },
  { name: 'Lychee', prob: 0.30, color: COLORS.secondary },
  { name: 'Papaya', prob: 0.15, color: COLORS.accent },
  { name: 'Durian', prob: 0.05, color: '#fabc05' },
];