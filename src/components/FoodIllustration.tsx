import React from 'react';

interface FoodIllustrationProps {
  itemId: string;
  className?: string;
  size?: number;
}

export const FoodIllustration: React.FC<FoodIllustrationProps> = ({ itemId, className = '', size = 200 }) => {
  switch (itemId) {
    case 'lunchbox':
      return (
        <svg
          id="svg-lunchbox"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`animate-pulse-slow ${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Lunchbox Body (Te Reo: Pouaka Kai) */}
          <rect x="30" y="60" width="140" height="110" rx="20" fill="#E11D48" /> {/* Rose red container */}
          <rect x="25" y="70" width="150" height="90" rx="15" fill="#BE123C" /> {/* Shadow layer */}
          <rect x="35" y="65" width="130" height="100" rx="15" fill="#F43F5E" /> {/* Inner body light */}
          
          {/* Handle */}
          <path d="M70 60 C70 35, 130 35, 130 60" fill="none" stroke="#94A3B8" strokeWidth="12" strokeLinecap="round" />
          <path d="M75 60 C75 42, 125 42, 125 60" fill="none" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          
          {/* Metal Clasps/Lid Rim */}
          <rect x="20" y="60" width="160" height="14" rx="7" fill="#475569" />
          <rect x="25" y="62" width="150" height="6" rx="3" fill="#64748B" />
          
          {/* Front emblem: Cute apple or star sticker */}
          <circle cx="100" cy="115" r="30" fill="#3B82F6" fillOpacity="0.8" />
          <path d="M100 100 Q105 110, 115 115 Q105 120, 100 130 Q95 120, 85 115 Q95 110, 100 100 Z" fill="#FDE047" /> {/* Sparkle */}
          
          {/* Clasps Left & Right */}
          <rect x="45" y="58" width="18" height="18" rx="4" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <rect x="137" y="58" width="18" height="18" rx="4" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
        </svg>
      );

    case 'drink_bottle':
      return (
        <svg
          id="svg-drink_bottle"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Bottle Body */}
          <rect x="60" y="60" width="80" height="115" rx="20" fill="#0EA5E9" /> {/* Teal-sky blue */}
          <rect x="65" y="70" width="70" height="100" rx="14" fill="#0284C7" /> {/* Shadow rim */}
          <rect x="60" y="90" width="80" height="70" rx="0" fill="#38BDF8" fillOpacity="0.4" /> {/* Water level */}
          
          {/* Neck */}
          <rect x="75" y="40" width="50" height="20" rx="5" fill="#475569" />
          <rect x="80" y="43" width="40" height="5" rx="2" fill="#94A3B8" />
          
          {/* Cap & Spout */}
          <path d="M85 40 L115 40 L110 20 L90 20 Z" fill="#E11D48" /> {/* Red nozzle */}
          <circle cx="100" cy="15" r="6" fill="#F43F5E" />
          
          {/* Grip pattern */}
          <line x1="70" y1="95" x2="130" y2="95" stroke="#0369A1" strokeWidth="4" strokeLinecap="round" />
          <line x1="70" y1="110" x2="130" y2="110" stroke="#0369A1" strokeWidth="4" strokeLinecap="round" />
          <line x1="70" y1="125" x2="130" y2="125" stroke="#0369A1" strokeWidth="4" strokeLinecap="round" />
          
          {/* Droplet emblem */}
          <path d="M100 135 C92 135, 92 147, 100 152 C108 147, 108 135, 100 135 Z" fill="#FFFFFF" />
        </svg>
      );

    case 'spoon':
      return (
        <svg
          id="svg-spoon"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Oval spoon scoop back */}
          <ellipse cx="100" cy="65" rx="35" ry="43" fill="#94A3B8" />
          <ellipse cx="96" cy="61" rx="30" ry="37" fill="#CBD5E1" />
          
          {/* Shiny Metallic Highlight */}
          <ellipse cx="88" cy="51" rx="10" ry="17" fill="#FFFFFF" fillOpacity="0.6" transform="rotate(-15, 88, 51)" />
          
          {/* Handle */}
          <path d="M100 108 L100 175 C100 180, 95 185, 90 185 L110 185 C105 185, 100 180, 100 175 Z" fill="#94A3B8" />
          <rect x="94" y="105" width="12" height="70" rx="6" fill="#64748B" />
          <rect x="96" y="105" width="8" height="66" rx="4" fill="#94A3B8" />
        </svg>
      );

    case 'fork':
      return (
        <svg
          id="svg-fork"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Fork base head */}
          <path d="M75 50 L125 50 L120 105 C120 115, 80 115, 80 105 Z" fill="#94A3B8" />
          <path d="M80 50 L120 50 L115 100 Q100 110, 85 100 Z" fill="#CBD5E1" />
          
          {/* Tines (3 prongs) */}
          <rect x="75" y="30" width="8" height="50" rx="3" fill="#94A3B8" />
          <rect x="96" y="25" width="8" height="55" rx="3" fill="#94A3B8" />
          <rect x="117" y="30" width="8" height="50" rx="3" fill="#94A3B8" />
          
          {/* Highlights on tines */}
          <rect x="77" y="32" width="4" height="30" rx="1" fill="#FFFFFF" fillOpacity="0.4" />
          <rect x="98" y="27" width="4" height="35" rx="1" fill="#FFFFFF" fillOpacity="0.4" />
          <rect x="119" y="32" width="4" height="30" rx="1" fill="#FFFFFF" fillOpacity="0.4" />
          
          {/* Handle */}
          <rect x="94" y="105" width="12" height="75" rx="6" fill="#64748B" />
          <rect x="96" y="105" width="8" height="71" rx="4" fill="#94A3B8" />
        </svg>
      );

    case 'knife':
      return (
        <svg
          id="svg-knife"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Blade */}
          <path d="M92 30 C108 30, 112 50, 112 110 L92 110 Z" fill="#CBD5E1" />
          <path d="M92 30 C100 30, 104 45, 104 110 L92 110 Z" fill="#E2E8F0" />
          
          {/* Safe cutting edge markings (tiny notch marks) */}
          <circle cx="92" cy="50" r="1.5" fill="#94A3B8" />
          <circle cx="92" cy="60" r="1.5" fill="#94A3B8" />
          <circle cx="92" cy="70" r="1.5" fill="#94A3B8" />
          <circle cx="92" cy="80" r="1.5" fill="#94A3B8" />
          <circle cx="92" cy="90" r="1.5" fill="#94A3B8" />
          <circle cx="92" cy="100" r="1.5" fill="#94A3B8" />
          
          {/* Handle guard */}
          <rect x="85" y="110" width="30" height="10" rx="3" fill="#475569" />
          
          {/* Handle */}
          <rect x="91" y="120" width="18" height="65" rx="9" fill="#1E293B" />
          <rect x="94" y="123" width="12" height="58" rx="6" fill="#3B82F6" /> {/* Coordinated blue handle core */}
        </svg>
      );

    case 'sandwich':
      return (
        <svg
          id="svg-sandwich"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Sandwich slice layers - Triangle shape */}
          
          {/* Bottom Bread Crust */}
          <path d="M25 155 L175 155 L100 45 Z" fill="#D97706" /> {/* Bread crust golden brown */}
          
          {/* Bottom Bread soft slice */}
          <path d="M32 150 L168 150 L100 55 Z" fill="#FEF3C7" /> {/* Warm soft white bread */}
          
          {/* Lettuce Layer */}
          <path d="M30 148 Q40 140, 55 146 Q70 152, 90 142 Q110 135, 130 146 Q150 155, 170 146 Z" fill="#22C55E" />
          
          {/* Tomato pieces popping out */}
          <circle cx="65" cy="144" r="12" fill="#EF4444" />
          <circle cx="135" cy="144" r="12" fill="#EF4444" />
          <circle cx="100" cy="142" r="14" fill="#F59E0B" /> {/* Cheese layer poking out */}
          <path d="M85 144 L115 144 L100 125 Z" fill="#FBBF24" />
          
          {/* Top Bread soft slice */}
          <path d="M42 140 L158 140 L100 65 Z" fill="#FFFBEB" />
          
          {/* Sparkly seeds on crust background */}
          <ellipse cx="80" cy="90" rx="2" ry="4" fill="#B45309" transform="rotate(20, 80, 90)" />
          <ellipse cx="120" cy="90" rx="2" ry="4" fill="#B45309" transform="rotate(-30, 120, 90)" />
          <ellipse cx="100" cy="110" rx="2" ry="4" fill="#B45309" transform="rotate(10, 100, 110)" />
        </svg>
      );

    case 'apple':
      return (
        <svg
          id="svg-apple"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Stem */}
          <path d="M100 55 C100 30, 115 25, 120 20" fill="none" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          
          {/* Leaf */}
          <path d="M102 38 C115 30, 135 35, 130 50 C115 50, 105 45, 102 38 Z" fill="#22C55E" />
          <path d="M102 38 Q118 43, 130 50" fill="none" stroke="#15803D" strokeWidth="1.5" />
          
          {/* Apple Body with double humps at top and bottom */}
          <path
            d="M100 60 C125 55, 175 65, 170 120 C165 165, 125 175, 100 167 C75 175, 35 165, 30 120 C25 65, 75 55, 100 60 Z"
            fill="#EF4444"
          />
          {/* Rich shadow underneath */}
          <path
            d="M100 65 C120 60, 165 70, 160 120 C155 160, 120 170, 100 163 C80 170, 45 160, 40 120 C35 70, 80 60, 100 65 Z"
            fill="#DC2626"
          />
          
          {/* Specular Highlighting */}
          <ellipse cx="65" cy="95" rx="14" ry="24" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-25, 65, 95)" />
          <ellipse cx="60" cy="88" rx="5" ry="10" fill="#FFFFFF" fillOpacity="0.6" transform="rotate(-25, 60, 88)" />
        </svg>
      );

    case 'banana':
      return (
        <svg
          id="svg-banana"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Crown Stem */}
          <path d="M150 45 L135 32 L120 38 L135 55 Z" fill="#78350F" />
          
          {/* Banana Main Yellow Curved Body */}
          <path
            d="M140 45 C115 75, 45 105, 35 155 C32 165, 38 172, 45 168 C80 150, 140 110, 150 45 Z"
            fill="#FDE047"
          />
          {/* Inner shade orange/yellow */}
          <path
            d="M132 50 C110 78, 52 105, 43 150 C41 155, 45 152, 48 150 C78 132, 130 92, 137 50 Z"
            fill="#EAB308"
          />
          
          {/* Brown tip */}
          <path d="M35 155 C33 161, 35 166, 39 168 L46 160 Z" fill="#451A03" />
          
          {/* Ridges on banana */}
          <path d="M135 55 Q95 90, 44 158" fill="none" stroke="#CA8A04" strokeWidth="2.5" />
          <path d="M148 48 Q118 80, 52 142" fill="none" stroke="#EAB308" strokeWidth="1.5" />
          
          {/* Small bruised speckles */}
          <circle cx="100" cy="110" r="1.5" fill="#713F12" />
          <circle cx="85" cy="125" r="2" fill="#713F12" />
          <circle cx="115" cy="95" r="1.5" fill="#713F12" />
        </svg>
      );

    case 'orange':
      return (
        <svg
          id="svg-orange"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Leaf & Stem */}
          <path d="M100 50 C100 35, 110 28, 115 25" fill="none" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
          <path d="M102 32 C115 22, 135 25, 130 40 C115 40, 105 37, 102 32 Z" fill="#16A34A" />
          
          {/* Orange Outer Circle */}
          <circle cx="100" cy="115" r="60" fill="#F97316" />
          <circle cx="100" cy="115" r="54" fill="#EA580C" fillOpacity="0.8" />
          
          {/* Highlight and Dimples (Pores) */}
          <ellipse cx="75" cy="85" rx="10" ry="6" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-30, 75, 85)" />
          
          {/* Little dots for skin texture */}
          <circle cx="70" cy="130" r="1.5" fill="#C2410C" />
          <circle cx="130" cy="110" r="1.5" fill="#C2410C" />
          <circle cx="110" cy="150" r="1.5" fill="#C2410C" />
          <circle cx="120" cy="135" r="1" fill="#C2410C" />
          <circle cx="80" cy="150" r="1.5" fill="#C2410C" />
          <circle cx="95" cy="160" r="1.5" fill="#C2410C" />
          <circle cx="140" cy="125" r="1" fill="#C2410C" />
          <circle cx="65" cy="105" r="1.5" fill="#C2410C" />
          
          {/* Center crown star */}
          <path d="M100 53 L102 57 L106 57 L103 59 L105 63 L100 61 L95 63 L97 59 L94 57 L98 57 Z" fill="#7C2D12" />
        </svg>
      );

    case 'cookie':
      return (
        <svg
          id="svg-cookie"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Bumpy delicious shadow base */}
          <path
            d="M100 35 C145 35, 170 55, 168 100 C165 145, 140 167, 100 165 C55 163, 33 140, 35 100 C37 55, 60 35, 100 35 Z"
            fill="#D97706"
          />
          {/* Main cookie body */}
          <path
            d="M100 40 C140 40, 162 58, 160 100 C158 138, 135 158, 100 156 C62 154, 42 134, 44 100 C46 58, 65 40, 100 40 Z"
            fill="#F59E0B"
          />
          
          {/* Golden cracks in the biscuit */}
          <path d="M55 80 Q70 85, 80 75" fill="none" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M120 135 Q135 125, 145 130" fill="none" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M110 55 Q130 65, 140 60" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
          
          {/* Chocolate Chips */}
          {/* Solid cocoa brown curved boxes */}
          <rect x="75" y="60" width="18" height="15" rx="5" fill="#451A03" transform="rotate(15, 75, 60)" />
          <rect x="120" y="70" width="16" height="16" rx="5" fill="#451A03" transform="rotate(-10, 120, 70)" />
          <rect x="65" y="110" width="17" height="14" rx="4" fill="#451A03" transform="rotate(45, 65, 110)" />
          <rect x="110" y="105" width="20" height="18" rx="6" fill="#451A03" transform="rotate(-25, 110, 105)" />
          <rect x="135" y="112" width="14" height="12" rx="4" fill="#451A03" transform="rotate(5, 135, 112)" />
          <rect x="90" y="132" width="15" height="15" rx="5" fill="#451A03" transform="rotate(30, 90, 132)" />
          
          {/* Highlights on Chocolate Chips */}
          <circle cx="80" cy="63" r="2" fill="#FFFFFF" fillOpacity="0.4" />
          <circle cx="123" cy="73" r="2" fill="#FFFFFF" fillOpacity="0.4" />
          <circle cx="68" cy="112" r="2" fill="#FFFFFF" fillOpacity="0.4" />
          <circle cx="113" cy="108" r="2.5" fill="#FFFFFF" fillOpacity="0.4" />
        </svg>
      );

    case 'cheese':
      return (
        <svg
          id="svg-cheese"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Wedge slice of cheese */}
          <path d="M30 140 L160 155 L170 80 Q100 40, 30 75 Z" fill="#F59E0B" /> {/* Cheese crust layer */}
          <path d="M30 140 L160 155 L160 90 L30 75 Z" fill="#FBBF24" /> {/* Side slice */}
          <path d="M30 75 L160 90 Q120 50, 30 75 Z" fill="#FDE047" /> {/* Top soft face */}
          
          {/* Overwrite with custom cheese wedge to make it look standard Swiss */}
          <path d="M30 140 L170 140 L150 60 L45 80 Z" fill="#FBBF24" />
          <path d="M30 140 L45 80 L150 60" fill="none" stroke="#D97706" strokeWidth="4" />
          
          {/* Fully correct wedge drawing */}
          <g>
            {/* Base block shape */}
            <path d="M35 145 L165 145 L145 75 L55 75 Z" fill="#FBBF24" />
            <path d="M35 145 L165 145 L155 105 L35 105 Z" fill="#F59E0B" />
            
            {/* Holes of Swiss cheese */}
            <circle cx="70" cy="125" r="12" fill="#D97706" />
            <circle cx="73" cy="125" r="10" fill="#F59E0B" />
            
            <circle cx="130" cy="120" r="16" fill="#D97706" />
            <circle cx="134" cy="120" r="14" fill="#F59E0B" />
            
            <circle cx="100" cy="95" r="14" fill="#D97706" />
            <circle cx="98" cy="95" r="12" fill="#FBBF24" />
            
            <circle cx="60" cy="88" r="8" fill="#D97706" />
            <circle cx="58" cy="88" r="6" fill="#FBBF24" />
            
            <circle cx="135" cy="85" r="10" fill="#D97706" />
            <circle cx="137" cy="85" r="8" fill="#FBBF24" />
          </g>
        </svg>
      );

    case 'carrot':
      return (
        <svg
          id="svg-carrot"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Green leaves/stalks at top */}
          <path d="M100 55 C90 25, 75 20, 65 25 C75 35, 90 45, 100 55 Z" fill="#22C55E" />
          <path d="M100 55 C100 20, 110 15, 120 18 C115 30, 105 45, 100 55 Z" fill="#15803D" />
          <path d="M100 55 C115 25, 130 25, 135 35 C125 42, 110 50, 100 55 Z" fill="#4ADE80" />
          
          {/* Main Cone Orange Body */}
          <path d="M85 55 Q100 50, 115 55 L106 170 Q100 185, 94 170 Z" fill="#EA580C" />
          <path d="M88 55 Q100 52, 112 55 L104 165 Q100 176, 96 165 Z" fill="#F97316" />
          
          {/* Textural lines/grooves */}
          <path d="M92 75 Q105 78, 110 75" fill="none" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M90 98 Q98 100, 106 98" fill="none" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M94 122 Q102 125, 104 122" fill="none" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
          <path d="M97 145 Q101 147, 102 145" fill="none" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'grapes':
      return (
        <svg
          id="svg-grapes"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Vine stem */}
          <path d="M100 45 Q102 25, 115 28 T125 20" fill="none" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <path d="M90 40 C75 35, 65 45, 75 55 C82 50, 88 45, 90 40 Z" fill="#16A34A" /> {/* Green Grape Leaf */}
          
          {/* Bunch of Grapes in Triangular Grid */}
          <g fill="#A855F7"> {/* Purple color */}
            {/* Row 1 (Top) - 4 grapes */}
            <circle cx="75" cy="65" r="15" fill="#8B5CF6" />
            <circle cx="71" cy="61" r="11" fill="#A855F7" />
            <circle cx="67" cy="57" r="3" fill="#FFFFFF" fillOpacity="0.4" />
            
            <circle cx="100" cy="65" r="15" fill="#7C3AED" />
            <circle cx="96" cy="61" r="11" fill="#8B5CF6" />
            <circle cx="92" cy="57" r="3" fill="#FFFFFF" fillOpacity="0.4" />
            
            <circle cx="125" cy="65" r="15" fill="#8B5CF6" />
            <circle cx="121" cy="61" r="11" fill="#A855F7" />
            
            {/* Row 2 - 3 grapes */}
            <circle cx="87" cy="90" r="16" fill="#7C3AED" />
            <circle cx="83" cy="86" r="12" fill="#8B5CF6" />
            <circle cx="79" cy="82" r="3" fill="#FFFFFF" fillOpacity="0.4" />
            
            <circle cx="113" cy="90" r="16" fill="#6D28D9" />
            <circle cx="109" cy="86" r="12" fill="#7C3AED" />
            
            <circle cx="135" cy="85" r="13" fill="#8B5CF6" /> {/* Edge grape */}
            
            {/* Row 3 - 2 grapes */}
            <circle cx="100" cy="115" r="16" fill="#6D28D9" />
            <circle cx="96" cy="111" r="12" fill="#7C3AED" />
            <circle cx="92" cy="107" r="3" fill="#FFFFFF" fillOpacity="0.4" />
            
            <circle cx="120" cy="115" r="15" fill="#7C3AED" />
            
            {/* Row 4 (Bottom tip) - 1 grape */}
            <circle cx="108" cy="140" r="16" fill="#5B21B6" />
            <circle cx="104" cy="136" r="12" fill="#6D28D9" />
            <circle cx="100" cy="132" r="3" fill="#FFFFFF" fillOpacity="0.4" />
          </g>
        </svg>
      );

    case 'milk':
      return (
        <svg
          id="svg-milk"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Milk Carton Body */}
          <rect x="60" y="80" width="80" height="95" rx="5" fill="#E2E8F0" /> {/* Light grey */}
          <rect x="60" y="80" width="10" height="95" fill="#CBD5E1" /> {/* Shadow side */}
          
          {/* Slanted Gables */}
          <path d="M60 81 L100 50 L140 81 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
          <path d="M60 81 L100 50 L100 81 Z" fill="#E2E8F0" />
          <rect x="96" y="40" width="8" height="15" fill="#475569" /> {/* Top clip */}
          
          {/* Carton Graphic Splash */}
          <path d="M60 115 Q80 100, 100 115 T140 115 L140 175 L60 175 Z" fill="#3B82F6" /> {/* Blue wave */}
          
          {/* Cute face or drop on the front */}
          <circle cx="100" cy="140" r="12" fill="#FFFFFF" />
          <path d="M100 124 C96 124, 93 135, 100 142 C107 135, 104 124, 100 124 Z" fill="#FFFFFF" />
          
          {/* Label text indicator */}
          <rect x="75" y="93" width="50" height="6" rx="2" fill="#475569" />
          <rect x="80" y="103" width="40" height="4" rx="2" fill="#64748B" />
        </svg>
      );

    case 'pear':
      return (
        <svg
          id="svg-pear"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Stem */}
          <path d="M100 55 C100 32, 112 25, 118 20" fill="none" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
          
          {/* Leaf */}
          <path d="M103 35 C118 25, 135 28, 132 42 C118 45, 108 40, 103 35 Z" fill="#22C55E" />
          
          {/* Bell Shaped Pear Body */}
          <path
            d="M100 55 C120 55, 125 80, 145 95 C170 115, 165 165, 125 170 C100 173, 100 173, 75 170 C35 165, 30 115, 55 95 C75 80, 80 55, 100 55 Z"
            fill="#84CC16"
          />
          {/* Under shadow green */}
          <path
            d="M100 60 C115 60, 120 83, 138 98 C160 116, 155 160, 120 165 C100 167, 100 167, 80 165 C45 160, 40 116, 62 98 C80 83, 85 60, 100 60 Z"
            fill="#65A30D"
          />
          
          {/* Specular White Highlight */}
          <ellipse cx="78" cy="115" rx="10" ry="18" fill="#FFFFFF" fillOpacity="0.4" transform="rotate(-30, 78, 115)" />
          
          {/* Little dots */}
          <circle cx="120" cy="130" r="1" fill="#4D7C0F" />
          <circle cx="90" cy="145" r="1" fill="#4D7C0F" />
          <circle cx="105" cy="120" r="1" fill="#4D7C0F" />
          <circle cx="130" cy="115" r="1" fill="#4D7C0F" />
          <circle cx="70" cy="130" r="1" fill="#4D7C0F" />
        </svg>
      );

    case 'peach':
      return (
        <svg
          id="svg-peach"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Stem & Leaf */}
          <path d="M100 50 C100 30, 108 24, 114 20" fill="none" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
          <path d="M102 32 C115 22, 132 25, 128 38 C115 38, 105 35, 102 32 Z" fill="#16A34A" />
          
          {/* Peach Main Body - fuzzy warm yellowish pink */}
          <path
            d="M100 60 C125 50, 168 62, 165 115 C162 160, 125 170, 100 165 C75 170, 38 160, 35 115 C32 62, 75 50, 100 60 Z"
            fill="#FB923C"
          />
          {/* Soft sunset pink gradient overlay */}
          <path
            d="M100 62 C120 52, 158 64, 155 115 C152 155, 120 165, 100 160 C80 165, 48 155, 45 115 C42 64, 80 52, 100 62 Z"
            fill="#F43F5E"
            fillOpacity="0.65"
          />
          
          {/* Indented signature Peach Seam line */}
          <path d="M100 60 Q105 110, 100 165" fill="none" stroke="#BE123C" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 1" />
          
          {/* Shine Highlight */}
          <ellipse cx="70" cy="90" rx="12" ry="20" fill="#FFFFFF" fillOpacity="0.35" transform="rotate(-20, 70, 90)" />
        </svg>
      );

    case 'strawberry':
      return (
        <svg
          id="svg-strawberry"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Strawberry Body */}
          <path
            d="M100 50 C145 45, 170 80, 145 140 C125 175, 110 180, 100 180 C90 180, 75 175, 55 140 C30 80, 55 45, 100 50 Z"
            fill="#EF4444"
          />
          <path
            d="M100 55 C138 50, 160 82, 138 135 C120 165, 108 172, 100 172 C92 172, 80 165, 62 135 C40 82, 62 50, 100 55 Z"
            fill="#DC2626"
          />
          
          {/* Green leafy crown */}
          <path d="M100 50 L95 25 L105 25 Z" fill="#16A34A" />
          <path d="M100 52 L118 32 L105 45 Z" fill="#15803D" />
          <path d="M100 52 L82 32 L95 45 Z" fill="#15803D" />
          <path d="M100 52 L132 45 L115 50 Z" fill="#22C55E" />
          <path d="M100 52 L68 45 L85 50 Z" fill="#22C55E" />
          
          {/* Yellow seeds scattered */}
          <g fill="#FDE047">
            <circle cx="80" cy="80" r="2" />
            <circle cx="100" cy="75" r="2" />
            <circle cx="120" cy="80" r="2" />
            
            <circle cx="70" cy="100" r="2" />
            <circle cx="90" cy="98" r="2.5" />
            <circle cx="110" cy="102" r="2" />
            <circle cx="130" cy="100" r="2" />
            
            <circle cx="80" cy="122" r="2" />
            <circle cx="100" cy="120" r="2.5" />
            <circle cx="120" cy="122" r="2" />
            
            <circle cx="90" cy="142" r="2" />
            <circle cx="110" cy="142" r="2" />
            
            <circle cx="100" cy="160" r="1.8" />
          </g>
          
          {/* Soft Highlight */}
          <ellipse cx="125" cy="90" rx="8" ry="18" fill="#FFFFFF" fillOpacity="0.25" transform="rotate(25, 125, 90)" />
        </svg>
      );

    case 'egg':
      return (
        <svg
          id="svg-egg"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Sliced Egg white outer shadow */}
          <ellipse cx="100" cy="100" rx="60" ry="75" fill="#E2E8F0" />
          <ellipse cx="100" cy="100" rx="55" ry="70" fill="#F8FAFC" />
          
          {/* Golden Yellow Yolk in the center */}
          <circle cx="100" cy="110" r="28" fill="#EAB308" />
          <circle cx="96" cy="106" r="24" fill="#FDE047" />
          
          {/* Little egg shine highlight */}
          <circle cx="88" cy="96" r="6" fill="#FFFFFF" fillOpacity="0.7" />
          
          {/* Cute pepper flakes dotted around */}
          <circle cx="85" cy="75" r="1.5" fill="#334155" />
          <circle cx="115" cy="70" r="1" fill="#334155" />
          <circle cx="120" cy="135" r="1.5" fill="#334155" />
          <circle cx="75" cy="125" r="1.2" fill="#334155" />
        </svg>
      );

    case 'bread':
      return (
        <svg
          id="svg-bread"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Sliced Bread Crust */}
          <path
            d="M50 70 C50 45, 80 40, 100 50 C120 40, 150 45, 150 70 L150 145 C150 155, 140 162, 130 162 L70 162 C60 162, 50 155, 50 145 Z"
            fill="#B45309"
          />
          {/* Bread Soft Crumb */}
          <path
            d="M55 72 C55 50, 82 45, 100 55 C118 45, 145 50, 145 72 L145 140 C145 148, 138 155, 130 155 L70 155 C62 155, 55 148, 55 140 Z"
            fill="#FEF3C7"
          />
          <path
            d="M58 75 C58 55, 84 50, 100 60 C116 50, 142 55, 142 75 L142 135 C142 142, 136 148, 130 148 L70 148 C64 148, 58 142, 58 135 Z"
            fill="#FFFBEB"
          />
          
          {/* Slice lines / holes */}
          <ellipse cx="75" cy="85" rx="3" ry="5" fill="#FDE047" fillOpacity="0.5" />
          <ellipse cx="115" cy="115" rx="4" ry="7" fill="#FDE047" fillOpacity="0.5" />
          <ellipse cx="85" cy="130" rx="3" ry="4" fill="#FDE047" fillOpacity="0.5" />
          <ellipse cx="125" cy="75" rx="2" ry="4" fill="#FDE047" fillOpacity="0.5" />
          <ellipse cx="98" cy="98" rx="3.5" ry="5" fill="#FDE047" fillOpacity="0.5" />
        </svg>
      );

    case 'tomato':
      return (
        <svg
          id="svg-tomato"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className={`${className}`}
          style={{ maxWidth: size, maxHeight: size }}
        >
          {/* Stem & Leaves */}
          <path d="M100 48 V30" fill="none" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
          
          {/* Star Leaves (Calyx) */}
          <path d="M100 45 L90 35 L96 44 Z" fill="#22C55E" />
          <path d="M100 45 L110 35 L104 44 Z" fill="#22C55E" />
          <path d="M100 45 L118 42 L105 46 Z" fill="#15803D" />
          <path d="M100 45 L82 42 L95 46 Z" fill="#15803D" />
          <path d="M100 45 L112 55 L101 48 Z" fill="#22C55E" />
          <path d="M100 45 L88 55 L99 48 Z" fill="#22C55E" />
          
          {/* Tomato Body - Big red sphere */}
          <circle cx="100" cy="115" r="58" fill="#EF4444" />
          <circle cx="101" cy="117" r="52" fill="#DC2626" />
          
          {/* Specular White Highlights */}
          <ellipse cx="75" cy="88" rx="14" ry="8" fill="#FFFFFF" fillOpacity="0.45" transform="rotate(-25, 75, 88)" />
          <ellipse cx="118" cy="100" rx="6" ry="10" fill="#FFFFFF" fillOpacity="0.2" transform="rotate(30, 118, 100)" />
        </svg>
      );

    default:
      return (
        <div id="missing-illustration" className="flex items-center justify-center bg-gray-100 rounded-2xl w-48 h-48 text-gray-400">
          <span>Pouaka Kai</span>
        </div>
      );
  }
};
