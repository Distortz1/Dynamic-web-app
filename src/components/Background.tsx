
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWorld } from '../WorldContext';
import { WeatherType, MoodType } from '../types';

const MOOD_COLORS: Record<MoodType, string[]> = {
  Joy: ['#FFD700', '#FFA500', '#FF4500'],
  Sorrow: ['#4B0082', '#000080', '#000000'],
  Fear: ['#000000', '#2F4F4F', '#006400'],
  Anger: ['#8B0000', '#FF0000', '#FF4500'],
  Curiosity: ['#00CED1', '#4169E1', '#8A2BE2'],
  Melancholy: ['#708090', '#778899', '#B0C4DE'],
  Etheric: ['#E6E6FA', '#D8BFD8', '#4B0082']
};

export const Background: React.FC = () => {
  const { state } = useWorld();
  const colors = MOOD_COLORS[state.globalMood] || MOOD_COLORS.Etheric;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {/* Dynamic Gradients */}
      <motion.div 
        className="absolute inset-0 opacity-60"
        initial={false}
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`
        }}
        transition={{ duration: 5, ease: "easeInOut" }}
      />
      
      {/* Weather Effects */}
      <AnimatePresence>
        {state.weather === 'Mist' && (
          <motion.div 
            className="absolute inset-0 z-10 backdrop-blur-[60px] opacity-40 bg-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
          />
        )}
        {state.weather === 'Void' && (
          <motion.div 
            className="absolute inset-0 z-10 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
          />
        )}
        {state.weather === 'Flare' && (
          <motion.div 
            className="absolute inset-0 z-10 mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              background: 'radial-gradient(circle at 30% 30%, #fff 0%, transparent 40%)' 
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Noise Grain */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
