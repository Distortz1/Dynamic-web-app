
import React from 'react';
import { motion } from 'motion/react';
import { useWorld } from '../WorldContext';

export const AgentView: React.FC = () => {
  const { agents } = useWorld();

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      {agents.map(agent => (
        <motion.div
          key={agent.id}
          className="absolute rounded-full blur-[2px]"
          style={{
            left: agent.x,
            top: agent.y,
            width: agent.size,
            height: agent.size,
            backgroundColor: `hsla(${agent.hue}, 80%, 70%, 0.6)`,
            boxShadow: `0 0 20px hsla(${agent.hue}, 80%, 70%, 0.4)`,
          }}
          initial={false}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};
