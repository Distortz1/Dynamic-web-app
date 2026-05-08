
import React from 'react';
import { useWorld } from '../WorldContext';

export const InteractionLayer: React.FC = () => {
  const { dispatchInteraction } = useWorld();

  const handleClick = (e: React.MouseEvent) => {
    dispatchInteraction(e.clientX, e.clientY);
  };

  return (
    <div 
      className="fixed inset-0 z-50 cursor-crosshair"
      onClick={handleClick}
    >
      {/* Ripple Effect Indicator could go here */}
    </div>
  );
};
