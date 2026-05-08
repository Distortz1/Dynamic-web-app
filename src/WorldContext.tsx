
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { WorldState, Agent, MoodType, WeatherType } from './types';
import { generateNarrativeShift } from './services/geminiService';

interface WorldContextType {
  state: WorldState;
  agents: Agent[];
  dispatchInteraction: (x: number, y: number) => void;
}

const WorldContext = createContext<WorldContextType | undefined>(undefined);

const INITIAL_AGENTS_COUNT = 15;

const createAgent = (id: string, width: number, height: number): Agent => ({
  id,
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 2,
  vy: (Math.random() - 0.5) * 2,
  size: Math.random() * 15 + 5,
  mood: 'Curiosity',
  hue: Math.random() * 360,
  energy: Math.random(),
  lastAction: 'Floating'
});

export const WorldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WorldState>({
    globalMood: 'Etheric',
    weather: 'Mist',
    trend: 'The Silent Genesis',
    population: INITIAL_AGENTS_COUNT,
    lastNarrativeShift: 'The world awakens in a veil of mist.',
    intensity: 0.5
  });

  const [agents, setAgents] = useState<Agent[]>([]);
  const requestRef = useRef<number>(null);
  const containerRef = useRef<{ w: number; h: number }>({ w: window.innerWidth, h: window.innerHeight });

  // Initialize Agents
  useEffect(() => {
    const newAgents = Array.from({ length: INITIAL_AGENTS_COUNT }, (_, i) => 
      createAgent(`agent-${i}`, containerRef.current.w, containerRef.current.h)
    );
    setAgents(newAgents);

    const handleResize = () => {
      containerRef.current = { w: window.innerWidth, h: window.innerHeight };
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulation Loop
  const animate = () => {
    setAgents(prev => prev.map(agent => {
      let nx = agent.x + agent.vx;
      let ny = agent.y + agent.vy;

      // Bounce
      let nvx = agent.vx;
      let nvy = agent.vy;
      if (nx < 0 || nx > containerRef.current.w) nvx *= -1;
      if (ny < 0 || ny > containerRef.current.h) nvy *= -1;

      // Entropy / Mood influence
      const moodSpeedMap: Record<MoodType, number> = {
        'Joy': 1.5, 'Fear': 3, 'Anger': 4, 'Sorrow': 0.5, 'Curiosity': 2, 'Melancholy': 0.4, 'Etheric': 1
      };
      const speed = moodSpeedMap[state.globalMood] || 1;
      
      return {
        ...agent,
        x: nx,
        y: ny,
        vx: nvx * 0.99 + (Math.random() - 0.5) * 0.1, // Add some noise
        vy: nvy * 0.99 + (Math.random() - 0.5) * 0.1,
      };
    }));
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [state.globalMood]);

  // Narrative Polling
  useEffect(() => {
    const interval = setInterval(async () => {
      const shift = await generateNarrativeShift(state);
      setState(prev => ({
        ...prev,
        globalMood: shift.mood,
        weather: shift.weather,
        trend: shift.trend,
        lastNarrativeShift: shift.loreFragment,
        intensity: shift.intensity
      }));
    }, 45000); // Shift every 45s

    return () => clearInterval(interval);
  }, [state]);

  const dispatchInteraction = (x: number, y: number) => {
    setAgents(prev => prev.map(agent => {
      const dx = agent.x - x;
      const dy = agent.y - y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist < 200) {
        const force = (200 - dist) / 50;
        return {
          ...agent,
          vx: agent.vx + (dx / dist) * force,
          vy: agent.vy + (dy / dist) * force,
          lastAction: 'Stunned'
        };
      }
      return agent;
    }));
  };

  return (
    <WorldContext.Provider value={{ state, agents, dispatchInteraction }}>
      {children}
    </WorldContext.Provider>
  );
};

export const useWorld = () => {
  const context = useContext(WorldContext);
  if (!context) throw new Error('useWorld must be used within a WorldProvider');
  return context;
};
