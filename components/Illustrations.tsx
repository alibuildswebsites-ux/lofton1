import React from 'react';
import { motion } from 'framer-motion';

// Refined Color Palette for Realistic/Architectural look
const COLORS = {
  stroke: "#374151",      // Dark Charcoal (Primary Outlines) - 2px
  strokeDetail: "#4B5563", // Slightly lighter for details - 1px
  fillLight: "#FFFFFF",   // Sun-lit walls
  fillDark: "#F3F4F6",    // Shadowed walls
  roofLight: "#374151",   // Roof sun-lit
  roofDark: "#1F2937",    // Roof shadowed
  window: "#DBEAFE",      // Glass reflection
  accent: "#4ADE80",      // Mint Green Brand Color
  accentDark: "#22C55E",  // Darker Mint for depth
  shadow: "rgba(0,0,0,0.08)" // Soft shadow
};

export const HeroIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 800 650" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto overflow-visible">
      {/* 
        =============================================
        BASE SHADOW & GROUNDING
        =============================================
      */}
      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="2" dy="4" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2"/>
          </feComponentTransfer>
          <feMerge> 
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/> 
          </feMerge>
        </filter>
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
      </defs>

      {/* Large Ground Shadow */}
      <ellipse cx="400" cy="520" rx="200" ry="80" fill="black" opacity="0.05" />

      {/* 
        =============================================
        MAIN HOUSE STRUCTURE
        Animating gently to feel "alive"
        =============================================
      */}
      <motion.g
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* --- MAIN BLOCK (2 Story) --- */}
        
        {/* Right Wall (Shadowed) */}
        <path d="M400 500 L560 410 V230 L400 320 V500 Z" fill={COLORS.fillDark} stroke={COLORS.stroke} strokeWidth="2" strokeLinejoin="round"/>
        
        {/* Left Wall (Lit) */}
        <path d="M240 410 L400 500 V320 L240 230 V410 Z" fill={COLORS.fillLight} stroke={COLORS.stroke} strokeWidth="2" strokeLinejoin="round"/>
        
        {/* Roof Main */}
        <path d="M240 230 L400 140 L560 230 L400 320 Z" fill={COLORS.roofLight} stroke={COLORS.stroke} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M230 235 L400 135 L570 235" fill="none" stroke={COLORS.stroke} strokeWidth="2" /> {/* Eaves */}

        {/* --- EXTENSION / GARAGE (Left side) --- */}
        <path d="M140 430 L240 485 V380 L140 325 V430 Z" fill={COLORS.fillLight} stroke={COLORS.stroke} strokeWidth="2"/>
        <path d="M140 325 L240 380 L300 345" fill="none" stroke={COLORS.stroke} strokeWidth="2"/> {/* Roof line connection */}
        <path d="M130 330 L240 390 L280 367" fill="none" stroke={COLORS.stroke} strokeWidth="2"/> {/* Eaves extension */}
        <path d="M140 325 L240 380 L240 410 L140 355 Z" fill={COLORS.roofDark} opacity="0.9"/> {/* Garage Roof */}

        {/* --- DETAILS: WINDOWS & DOORS --- */}
        
        {/* Front Door (Left Wall) */}
        <g transform="translate(330, 420)">
           <path d="M0 0 L30 17 V65 L0 48 Z" fill="#1F2937"/>
           <path d="M0 0 L30 17" stroke={COLORS.stroke} strokeWidth="1"/>
           <path d="M4 8 L26 21 V60 L4 44 Z" fill="#374151"/> {/* Inner Door */}
        </g>
        <path d="M330 468 L360 485 L400 462" fill="none" stroke={COLORS.stroke} strokeWidth="1"/> {/* Step */}

        {/* Large Window (Left Wall, 2nd Floor) */}
        <g transform="translate(280, 260) skewY(29)">
           <rect x="0" y="0" width="50" height="40" fill="url(#glassGradient)" stroke={COLORS.stroke} strokeWidth="2"/>
           <line x1="25" y1="0" x2="25" y2="40" stroke={COLORS.stroke} strokeWidth="1"/>
        </g>

        {/* Bedroom Windows (Right Wall, 2nd Floor) */}
        <g transform="translate(430, 255) skewY(-29)">
           <rect x="0" y="0" width="30" height="40" fill="url(#glassGradient)" stroke={COLORS.stroke} strokeWidth="2"/>
        </g>
        <g transform="translate(480, 283) skewY(-29)">
           <rect x="0" y="0" width="30" height="40" fill="url(#glassGradient)" stroke={COLORS.stroke} strokeWidth="2"/>
        </g>

        {/* Living Room Window (Right Wall, 1st Floor) */}
        <g transform="translate(440, 360) skewY(-29)">
           <rect x="0" y="0" width="60" height="50" fill="url(#glassGradient)" stroke={COLORS.stroke} strokeWidth="2"/>
           <line x1="30" y1="0" x2="30" y2="50" stroke={COLORS.stroke} strokeWidth="1"/>
           <line x1="0" y1="25" x2="60" y2="25" stroke={COLORS.stroke} strokeWidth="1"/>
        </g>
      </motion.g>

      {/* 
        =============================================
        FLOATING ELEMENTS
        Surrounding the house to create 3D composition
        =============================================
      */}

      {/* 1. PROPERTY CARD (Front Left, Close) */}
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        filter="url(#softShadow)"
      >
        <g transform="translate(150, 480)">
           <rect x="0" y="0" width="100" height="130" rx="4" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
           {/* Card Content */}
           <rect x="10" y="10" width="80" height="50" rx="2" fill={COLORS.fillDark} />
           <rect x="10" y="70" width="60" height="6" rx="3" fill={COLORS.stroke} />
           <rect x="10" y="85" width="80" height="4" rx="2" fill="#9CA3AF" />
           <rect x="10" y="95" width="50" height="4" rx="2" fill="#9CA3AF" />
           <rect x="10" y="110" width="30" height="10" rx="5" fill={COLORS.accent} />
        </g>
      </motion.g>

      {/* 2. SOLD SIGN (Back Right) */}
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(600, 350)">
           <rect x="45" y="50" width="6" height="80" fill="#4B5563"/> {/* Post */}
           <rect x="0" y="0" width="96" height="60" rx="4" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
           <rect x="6" y="6" width="84" height="48" rx="2" fill={COLORS.accent} />
           <text x="48" y="38" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="24" fill="white" letterSpacing="1">SOLD</text>
        </g>
      </motion.g>

      {/* 3. KEY (Front Right, Low) */}
      <motion.g
        animate={{ y: [5, -5, 5], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        filter="url(#softShadow)"
      >
        <g transform="translate(520, 520) rotate(-15)">
           <circle cx="0" cy="0" r="16" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
           <path d="M16 0 L50 0 L50 10 M40 0 L40 8" stroke={COLORS.stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
           <circle cx="0" cy="0" r="6" fill={COLORS.accent} />
        </g>
      </motion.g>

      {/* 4. LOCATION PIN (Top Right) */}
      <motion.g
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        filter="url(#softShadow)"
      >
        <g transform="translate(620, 180) rotate(10)">
          <path d="M0 0 C-20 0 -35 15 -35 35 C-35 60 0 90 0 90 C0 90 35 60 35 35 C35 15 20 0 0 0 Z" fill={COLORS.accent} stroke={COLORS.stroke} strokeWidth="2" />
          <circle cx="0" cy="35" r="12" fill="white" stroke={COLORS.stroke} strokeWidth="2"/>
        </g>
      </motion.g>

      {/* 5. PRICE TAG (Top Left) */}
      <motion.g
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        filter="url(#softShadow)"
      >
         <g transform="translate(180, 200) rotate(-10)">
            <circle cx="0" cy="0" r="40" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
            <text x="0" y="12" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="32" fill={COLORS.stroke}>$</text>
            <path d="M28 -28 L40 -40 M35 -15 L50 -20 M15 -35 L20 -50" stroke={COLORS.accent} strokeWidth="3" strokeLinecap="round"/>
         </g>
      </motion.g>

      {/* 6. FAMILY SILHOUETTE (Bottom Center, Small) */}
      <g transform="translate(450, 540)">
         {/* Adult 1 */}
         <circle cx="0" cy="0" r="6" fill={COLORS.stroke} />
         <path d="M-6 8 Q0 6 6 8 L8 30 H-8 Z" fill={COLORS.stroke} />
         {/* Adult 2 */}
         <circle cx="18" cy="2" r="6" fill={COLORS.stroke} />
         <path d="M12 10 Q18 8 24 10 L26 30 H10 Z" fill={COLORS.stroke} />
         {/* Child */}
         <circle cx="9" cy="18" r="4" fill={COLORS.accent} />
         <path d="M5 24 Q9 22 13 24 L14 36 H4 Z" fill={COLORS.accent} />
      </g>

    </svg>
  );
};

export const TrustIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto overflow-visible">
       {/* 
         =============================================
         BACKGROUND NETWORK CONNECTIONS
         =============================================
       */}
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

       {/* 
         =============================================
         FLOATING GROUP
         =============================================
       */}
       <motion.g
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        
        {/* --- HOUSE OUTLINE (Backdrop Left) --- */}
        <g transform="translate(50, 150) scale(0.8)">
            {/* Walls */}
            <path d="M150 200 L300 120 V350 L150 430 Z" fill={COLORS.fillLight} stroke={COLORS.stroke} strokeWidth="2" strokeLinejoin="round"/>
            <path d="M300 120 L450 200 V430 L300 350 Z" fill={COLORS.fillDark} stroke={COLORS.stroke} strokeWidth="2" strokeLinejoin="round"/>
            {/* Roof */}
            <path d="M150 200 L300 120 L450 200 L300 280 Z" fill={COLORS.roofLight} stroke={COLORS.stroke} strokeWidth="2" strokeLinejoin="round"/>
            {/* Door */}
            <path d="M210 320 L240 305 V370 L210 385 Z" fill={COLORS.stroke} />
        </g>

        {/* --- CENTRAL SHIELD (Center) --- */}
        <g transform="translate(300, 150)" filter="url(#softShadow)">
           {/* Shield Body */}
           <path d="M0 50 L100 0 L200 50 V140 C200 220 150 280 100 310 C50 280 0 220 0 140 V50 Z" 
                 fill="white" stroke={COLORS.stroke} strokeWidth="3" />
           {/* Inner Gradient Area */}
           <path d="M10 55 L100 10 L190 55 V135 C190 205 150 255 100 285 C50 255 10 205 10 135 V55 Z" 
                 fill={COLORS.fillDark} opacity="0.5" />
           
           {/* Checkmark */}
           <path 
              d="M60 150 L90 180 L140 110" 
              stroke={COLORS.accent} 
              strokeWidth="12" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none"
           />
        </g>

        {/* --- FLOATING STARS (Top Right) --- */}
        <g transform="translate(550, 100)">
           {[0, 1, 2, 3, 4].map((i) => (
             <motion.g 
               key={i}
               transform={`translate(${i * 45}, ${Math.sin(i)*20})`}
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
             >
                <path d="M20 0 L26 14 L40 14 L29 23 L33 38 L20 29 L7 38 L11 23 L0 14 L14 14 Z" 
                      fill={COLORS.accent} stroke={COLORS.stroke} strokeWidth="1" />
             </motion.g>
           ))}
        </g>

        {/* --- TROPHY (Bottom Right) --- */}
        <g transform="translate(600, 350)" filter="url(#softShadow)">
           <path d="M20 20 H80 L70 70 C70 70 50 90 50 90 C50 90 30 70 30 70 L20 20 Z" fill="#FDE047" stroke={COLORS.stroke} strokeWidth="2" /> {/* Cup Goldish */}
           <path d="M50 90 V110" stroke={COLORS.stroke} strokeWidth="4" />
           <rect x="30" y="110" width="40" height="10" fill={COLORS.stroke} />
           <path d="M20 30 C10 30 10 50 20 55" stroke={COLORS.stroke} strokeWidth="2" fill="none" /> {/* Handle L */}
           <path d="M80 30 C90 30 90 50 80 55" stroke={COLORS.stroke} strokeWidth="2" fill="none" /> {/* Handle R */}
           <circle cx="50" cy="50" r="10" fill={COLORS.accent} />
           <path d="M20 20 L30 70" stroke="white" strokeWidth="2" opacity="0.5" /> {/* Shine */}
        </g>

        {/* --- SCATTERED ELEMENTS (Tiny Details) --- */}
        
        {/* Document */}
        <g transform="translate(100, 450) rotate(-15)">
           <rect x="0" y="0" width="40" height="50" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
           <line x1="10" y1="10" x2="30" y2="10" stroke={COLORS.stroke} strokeWidth="1" />
           <line x1="10" y1="20" x2="30" y2="20" stroke={COLORS.stroke} strokeWidth="1" />
           <line x1="10" y1="30" x2="20" y2="30" stroke={COLORS.stroke} strokeWidth="1" />
        </g>

        {/* Key */}
        <g transform="translate(500, 500) rotate(30)">
            <path d="M10 0 A10 10 0 1 0 10 20 L40 20 V10 L10 10" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
        </g>

      </motion.g>
    </svg>
  );
};

export const MapIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto overflow-visible">
      {/* 
        =============================================
        STYLISTIC MAP SHAPE
        Geometric, architectural map of the US Gulf Coast (TX, LA, MS, AL, FL)
        Designed as a cohesive single shape with 3D extrusion.
        =============================================
      */}
      <defs>
        <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
           <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
           <feOffset dx="6" dy="8"/>
           <feComponentTransfer>
            <feFuncA type="linear" slope="0.2"/>
           </feComponentTransfer>
           <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
           </feMerge>
        </filter>
      </defs>

      {/* Background Grid Lines (Blueprint Effect) */}
      <g stroke={COLORS.stroke} strokeWidth="0.5" opacity="0.08" strokeDasharray="8 8">
         {[100, 200, 300, 400, 500, 600, 700].map(x => (
           <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="600" />
         ))}
         {[100, 200, 300, 400, 500].map(y => (
           <line key={`h-${y}`} x1="0" y1={y} x2="800" y2={y} />
         ))}
      </g>

      <g>
        {/* 
          Main Map Path Construction (Gulf Coast Region)
          Coordinates approximated for stylized look:
          Start West TX (Big Bend) -> North to Panhandle -> East to OK/AR -> East to AL -> South to FL Panhandle -> East to FL Coast -> South to FL Tip -> Up West FL Coast -> West along Gulf Coast (MS, LA, TX) -> South to Rio Grande -> Back to Start
        */}
        <g transform="translate(40, 40)">
          {/* Shadow/Extrusion Layer */}
          <path 
            d="M 120 280 L 120 120 L 220 120 L 220 180 L 450 180 L 450 240 L 620 240 L 680 440 L 580 340 L 520 280 L 450 340 L 400 300 L 320 380 L 200 460 L 60 320 Z"
            fill={COLORS.fillDark} opacity="0.6" transform="translate(8, 8)"
          />
          
          {/* Main Map Face */}
          <path 
            d="M 120 280 L 120 120 L 220 120 L 220 180 L 450 180 L 450 240 L 620 240 L 680 440 L 580 340 L 520 280 L 450 340 L 400 300 L 320 380 L 200 460 L 60 320 Z"
            fill="white" stroke={COLORS.stroke} strokeWidth="3" filter="url(#mapShadow)" strokeLinejoin="round"
          />

          {/* Decorative Internal Lines (Abstract State Borders) */}
          <path d="M 220 180 L 220 320" stroke={COLORS.stroke} strokeWidth="1" strokeDasharray="4 4" opacity="0.3" /> {/* East TX */}
          <path d="M 450 240 L 450 340" stroke={COLORS.stroke} strokeWidth="1" strokeDasharray="4 4" opacity="0.3" /> {/* AL/GA Border */}
        </g>
      </g>

      {/* 
        =============================================
        CONNECTIONS & PINS
        =============================================
      */}
      <g transform="translate(40, 40)">
         {/* Dashed Connection Lines */}
         <path d="M 330 350 L 250 300" stroke={COLORS.stroke} strokeWidth="1.5" strokeDasharray="6 6" />
         <path d="M 330 350 L 350 390" stroke={COLORS.stroke} strokeWidth="1.5" strokeDasharray="4 4" />
         <path d="M 330 350 L 460 320" stroke={COLORS.stroke} strokeWidth="1.5" strokeDasharray="6 6" />
         <path d="M 460 320 L 620 300" stroke={COLORS.stroke} strokeWidth="1.5" strokeDasharray="6 6" />

         {/* Houston (Main Hub) */}
         <g transform="translate(330, 350)">
            <circle cx="0" cy="0" r="24" stroke={COLORS.accent} strokeWidth="1" opacity="0.4"><animate attributeName="r" from="12" to="30" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite"/></circle>
            <path d="M0 0 L0 -25" stroke={COLORS.stroke} strokeWidth="2"/>
            <rect x="-40" y="-45" width="80" height="24" rx="4" fill={COLORS.roofDark} stroke={COLORS.stroke} strokeWidth="1"/>
            <text x="0" y="-30" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">HOUSTON</text>
            <circle cx="0" cy="0" r="5" fill={COLORS.accent} stroke="white" strokeWidth="2" />
         </g>

         {/* Austin */}
         <g transform="translate(250, 300)">
            <circle cx="0" cy="0" r="4" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
            <text x="-10" y="-10" textAnchor="end" fill={COLORS.strokeDetail} fontSize="11" fontWeight="600" fontFamily="sans-serif">AUSTIN</text>
         </g>

         {/* Galveston */}
         <g transform="translate(350, 390)">
            <circle cx="0" cy="0" r="4" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
            <text x="10" y="5" textAnchor="start" fill={COLORS.strokeDetail} fontSize="11" fontWeight="600" fontFamily="sans-serif">GALVESTON</text>
         </g>

         {/* New Orleans / LA */}
         <g transform="translate(460, 320)">
            <path d="M0 0 L8 -12 L-8 -12 Z" fill={COLORS.accent} />
            <text x="0" y="-20" textAnchor="middle" fill={COLORS.strokeDetail} fontSize="11" fontWeight="600" fontFamily="sans-serif">LOUISIANA</text>
         </g>

         {/* Florida */}
         <g transform="translate(620, 300)">
            <rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" fill="white" stroke={COLORS.stroke} strokeWidth="2" />
            <text x="15" y="5" textAnchor="start" fill={COLORS.strokeDetail} fontSize="11" fontWeight="600" fontFamily="sans-serif">FLORIDA</text>
         </g>
      </g>

      {/* Decorative Floating Elements */}
      <motion.g transform="translate(650, 100)" animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
         <path d="M0 20 L20 0 L40 20 L20 40 Z" stroke={COLORS.stroke} strokeWidth="1" fill="none" opacity="0.3" />
         <circle cx="20" cy="20" r="4" fill={COLORS.accent} opacity="0.5" />
      </motion.g>

      <motion.g transform="translate(100, 450)" animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity }}>
         <circle cx="0" cy="0" r="30" stroke={COLORS.stroke} strokeWidth="0.5" strokeDasharray="4 4" fill="none" opacity="0.2" />
         <circle cx="0" cy="0" r="3" fill={COLORS.stroke} opacity="0.3" />
      </motion.g>

    </svg>
  );
};
