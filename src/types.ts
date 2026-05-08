
export type MoodType = 'Joy' | 'Sorrow' | 'Fear' | 'Anger' | 'Curiosity' | 'Melancholy' | 'Etheric';

export type WeatherType = 'Radiance' | 'Void' | 'Storm' | 'Bloom' | 'Mist' | 'Flare';

export interface WorldState {
  globalMood: MoodType;
  weather: WeatherType;
  trend: string;
  population: number;
  lastNarrativeShift: string;
  intensity: number; // 0 to 1
}

export interface Agent {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  mood: MoodType;
  hue: number;
  energy: number;
  lastAction: string;
}

export interface NarrativeEruption {
  mood: MoodType;
  weather: WeatherType;
  trend: string;
  loreFragment: string;
  intensity: number;
}
