
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWorld } from '../WorldContext';
import { Activity, Wind, Eye, Cpu } from 'lucide-react';

export const HUD: React.FC = () => {
  const { state } = useWorld();

  return (
    <div className="fixed inset-0 z-40 pointer-events-none p-10 flex flex-col justify-between">
      {/* Top Section: Era & Trend */}
      <div className="flex justify-between items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          key={state.trend}
          className="max-w-md"
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 mb-2">Current Era</p>
          <h1 className="text-5xl font-sans font-bold text-white tracking-tighter uppercase leading-none">
            {state.trend}
          </h1>
        </motion.div>

        <div className="flex gap-8 text-right font-mono text-[10px] uppercase tracking-widest text-white/40">
          <div>
            <p>Population</p>
            <p className="text-white text-base">{state.population}</p>
          </div>
          <div>
            <p>Intensity</p>
            <p className="text-white text-base">{(state.intensity * 100).toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {/* Middle Section: Narrative Fragment */}
      <div className="flex justify-center flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.lastNarrativeShift}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-2xl px-8"
          >
            <p className="text-xl italic font-serif text-white/80 leading-relaxed shadow-white/10 text-shadow">
              "{state.lastNarrativeShift}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Section: World Vitals */}
      <div className="flex justify-between items-end">
        <div className="flex gap-6">
          <VitalItem icon={<Activity className="w-4 h-4" />} label="Mood" value={state.globalMood} />
          <VitalItem icon={<Wind className="w-4 h-4" />} label="Anima" value={state.weather} />
          <VitalItem icon={<Eye className="w-4 h-4" />} label="Focus" value="High" />
        </div>

        <div className="text-right">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] mb-4">Autonomous Intelligence Active</p>
          <div className="flex gap-2 justify-end">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                className="w-1 h-8 bg-white/20"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Letterboxing for cinematic feel */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black z-[-1]" />
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-black z-[-1]" />
    </div>
  );
};

const VitalItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 text-white/40">
      {icon}
      <span className="text-[9px] font-mono uppercase tracking-widest">{label}</span>
    </div>
    <span className="text-white font-sans font-medium text-lg tracking-tight uppercase">{value}</span>
  </div>
);
