import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from './illustrationConstants';

const MapIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto overflow-visible">
      <defs>
        <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
           <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
           <feOffset dx="6" dy="8"/>
           <feComponentTransfer><feFuncA type="linear" slope="0.2"/></feComponentTransfer>
           <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g stroke={COLORS.stroke} strokeWidth="0.5" opacity="0.08" strokeDasharray="8 8">
         {[100, 200, 300, 400, 500, 600, 700].map(x => (
           <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="600" />
         ))}
         {[100, 200, 300, 400, 500].map(y => (
           <line key={`h-${y}`} x1="0" y1={y} x2="800" y2={y} />
         ))}
      </g>
      <g>
        <g transform="translate(40, 40)">
          <path d="M120 280V120H220V180H450V240H620L680 440L580 340L520 280L450 340L400 300L320 380L200 460L60 320Z" fill={COLORS.fillDark} opacity="0.6" transform="translate(8, 8)" />
          <path d="M120 280V120H220V180H450V240H620L680 440L580 340L520 280L450 340L400 300L320 380L200 460L60 320Z" fill="white" stroke={COLORS.stroke} strokeWidth="3" filter="url(#mapShadow)" strokeLinejoin="round" />
          <path d="M220 180V320" stroke={COLORS.stroke} strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <path d="M450 240V340" stroke={COLORS.stroke} strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
        </g>
      </g>
      <g transform="translate(40, 40)">
         <path d="M330 350L250 300" stroke={COLORS.stroke} strokeWidth="1.5" strokeDasharray="6 6" />
         <path d="M330 350L350 390" stroke={COLORS.stroke} strokeWidth="1.5" strokeDasharray="4 4" />
         <path d="M330 350L460 320" stroke={COLORS.stroke} strokeWidth="1.5" strokeDasharray="6 6" />
         <path d="M460 320L620 300" stroke={COLORS.stroke} strokeWidth="1.5" strokeDasharray="6 6" />
         <g transform="translate(330, 350)">
            <circle cx="0" cy="0" r="24" stroke={COLORS.accent} strokeWidth="1" opacity="0.4"><animate attributeName="r" from="12" to="30" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite"/></circle>
            <path d="M0 0V-25" stroke={COLORS.stroke} strokeWidth="2"/>
            <rect x="-40" y="-45" width="80" height="24" rx="4" fill={COLORS.roofDark} stroke={COLORS.stroke} strokeWidth="1"/>
            <text x="0" y="-30" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">HOUSTON</text>
            <circle cx="0" cy="0" r="5" fill={COLORS.accent} stroke="white" strokeWidth="2" />
         </g>
         <g transform="translate(250, 300)">
            <circle cx="0" cy="0" r="4" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
            <text x="-10" y="-10" textAnchor="end" fill={COLORS.strokeDetail} fontSize="11" fontWeight="600" fontFamily="sans-serif">AUSTIN</text>
         </g>
         <g transform="translate(350, 390)">
            <circle cx="0" cy="0" r="4" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
            <text x="10" y="5" textAnchor="start" fill={COLORS.strokeDetail} fontSize="11" fontWeight="600" fontFamily="sans-serif">GALVESTON</text>
         </g>
         <g transform="translate(460, 320)">
            <path d="M0 0L8-12H-8Z" fill={COLORS.accent} />
            <text x="0" y="-20" textAnchor="middle" fill={COLORS.strokeDetail} fontSize="11" fontWeight="600" fontFamily="sans-serif">LOUISIANA</text>
         </g>
         <g transform="translate(620, 300)">
            <rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
            <text x="15" y="5" textAnchor="start" fill={COLORS.strokeDetail} fontSize="11" fontWeight="600" fontFamily="sans-serif">FLORIDA</text>
         </g>
      </g>
      <motion.g transform="translate(650, 100)" animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
         <path d="M0 20L20 0L40 20L20 40Z" stroke={COLORS.stroke} strokeWidth="1" fill="none" opacity="0.3" />
         <circle cx="20" cy="20" r="4" fill={COLORS.accent} opacity="0.5" />
      </motion.g>
      <motion.g transform="translate(100, 450)" animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity }}>
         <circle cx="0" cy="0" r="30" stroke={COLORS.stroke} strokeWidth="0.5" strokeDasharray="4 4" fill="none" opacity="0.2" />
         <circle cx="0" cy="0" r="3" fill={COLORS.stroke} opacity="0.3" />
      </motion.g>
    </svg>
  );
};

export default MapIllustration;