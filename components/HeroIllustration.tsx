import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from './illustrationConstants';

const HeroIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 800 650" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto overflow-visible">
      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="2" dy="4" result="offsetblur"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.2"/></feComponentTransfer>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
      </defs>
      <ellipse cx="400" cy="520" rx="240" ry="60" fill="black" opacity="0.05" />
      <motion.g animate={{ y: [-4, 4, -4] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M400 500L560 410V230L400 320V500Z" fill={COLORS.fillDark} stroke={COLORS.stroke} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M240 410L400 500V320L240 230V410Z" fill={COLORS.fillLight} stroke={COLORS.stroke} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M240 230L400 140L560 230L400 320Z" fill={COLORS.roofLight} stroke={COLORS.stroke} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M230 235L400 135L570 235" fill="none" stroke={COLORS.stroke} strokeWidth="2" />
        <path d="M140 430L240 485V380L140 325V430Z" fill={COLORS.fillLight} stroke={COLORS.stroke} strokeWidth="2"/>
        <path d="M140 325L240 380L300 345" fill="none" stroke={COLORS.stroke} strokeWidth="2"/>
        <path d="M130 330L240 390L280 367" fill="none" stroke={COLORS.stroke} strokeWidth="2"/>
        <path d="M140 325L240 380L240 410L140 355Z" fill={COLORS.roofDark} opacity="0.9"/>
        <g transform="translate(330, 420)">
           <path d="M0 0L30 17V65L0 48Z" fill="#1F2937"/>
           <path d="M0 0L30 17" stroke={COLORS.stroke} strokeWidth="1"/>
           <path d="M4 8L26 21V60L4 44Z" fill="#374151"/>
        </g>
        <path d="M330 468L360 485L400 462" fill="none" stroke={COLORS.stroke} strokeWidth="1"/>
        <g transform="translate(280, 260) skewY(29)">
           <rect x="0" y="0" width="50" height="40" fill="url(#glassGradient)" stroke={COLORS.stroke} strokeWidth="2"/>
           <line x1="25" y1="0" x2="25" y2="40" stroke={COLORS.stroke} strokeWidth="1"/>
        </g>
        <g transform="translate(430, 255) skewY(-29)">
           <rect x="0" y="0" width="30" height="40" fill="url(#glassGradient)" stroke={COLORS.stroke} strokeWidth="2"/>
        </g>
        <g transform="translate(480, 283) skewY(-29)">
           <rect x="0" y="0" width="30" height="40" fill="url(#glassGradient)" stroke={COLORS.stroke} strokeWidth="2"/>
        </g>
        <g transform="translate(440, 360) skewY(-29)">
           <rect x="0" y="0" width="60" height="50" fill="url(#glassGradient)" stroke={COLORS.stroke} strokeWidth="2"/>
           <line x1="30" y1="0" x2="30" y2="50" stroke={COLORS.stroke} strokeWidth="1"/>
           <line x1="0" y1="25" x2="60" y2="25" stroke={COLORS.stroke} strokeWidth="1"/>
        </g>
      </motion.g>
      <motion.g animate={{ rotate: [0, 1, 0, -1, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} transformOrigin="50% 100%">
        <g transform="translate(560, 420) scale(0.9)">
           <rect x="42" y="50" width="4" height="60" fill="#4B5563"/>
           <rect x="0" y="0" width="88" height="55" rx="4" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
           <rect x="5" y="5" width="78" height="45" rx="2" fill={COLORS.accent} />
           <text x="44" y="35" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="22" fill="white" letterSpacing="1">SOLD</text>
        </g>
      </motion.g>
      <motion.g animate={{ y: [5, -5, 5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} filter="url(#softShadow)">
        <g transform="translate(60, 250) scale(0.8)">
           <rect x="0" y="0" width="120" height="150" rx="6" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
           <rect x="10" y="10" width="100" height="60" rx="4" fill={COLORS.fillDark} />
           <rect x="10" y="80" width="60" height="8" rx="4" fill={COLORS.stroke} />
           <rect x="10" y="100" width="90" height="4" rx="2" fill="#9CA3AF" />
           <rect x="10" y="110" width="70" height="4" rx="2" fill="#9CA3AF" />
           <rect x="10" y="130" width="40" height="10" rx="5" fill={COLORS.accent} />
        </g>
      </motion.g>
      <motion.g animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} filter="url(#softShadow)">
         <g transform="translate(680, 200) rotate(10) scale(0.9)">
            <circle cx="0" cy="0" r="35" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
            <text x="0" y="10" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="28" fill={COLORS.stroke}>$</text>
            <path d="M25-25l10-10M30-12l15-6M12-30l6-15" stroke={COLORS.accent} strokeWidth="3" strokeLinecap="round"/>
         </g>
      </motion.g>
    </svg>
  );
};

export default HeroIllustration;