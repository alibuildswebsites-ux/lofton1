import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from './illustrationConstants';

const TrustIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto overflow-visible">
       <g opacity="0.15">
         <circle cx="100" cy="100" r="3" fill={COLORS.stroke} />
         <circle cx="700" cy="500" r="3" fill={COLORS.stroke} />
         <circle cx="50" cy="400" r="3" fill={COLORS.stroke} />
         <circle cx="750" cy="150" r="3" fill={COLORS.stroke} />
         <circle cx="400" cy="50" r="3" fill={COLORS.stroke} />
         <line x1="100" y1="100" x2="250" y2="250" stroke={COLORS.stroke} strokeWidth="1" strokeDasharray="4 4" />
         <line x1="700" y1="500" x2="550" y2="400" stroke={COLORS.stroke} strokeWidth="1" strokeDasharray="4 4" />
         <line x1="50" y1="400" x2="200" y2="350" stroke={COLORS.stroke} strokeWidth="1" strokeDasharray="4 4" />
         <line x1="400" y1="50" x2="400" y2="200" stroke={COLORS.stroke} strokeWidth="1" strokeDasharray="4 4" />
       </g>
    </svg>
  );
};

export default TrustIllustration;