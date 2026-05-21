import React from 'react';
import { ShapeType } from '../types';

interface ShapeIconProps {
  shape: ShapeType;
  className?: string;
  size?: number;
}

export const ShapeIcon: React.FC<ShapeIconProps> = ({ shape, className = '', size = 48 }) => {
  const strokeWidth = 2;
  
  switch (shape) {
    case 'circle':
      return (
        <svg
          id={`shape-circle-${size}`}
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-sm transition-transform duration-300 hover:scale-105 ${className}`}
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth={strokeWidth * 2.5}
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      );
      
    case 'square':
      return (
        <svg
          id={`shape-square-${size}`}
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-sm transition-transform duration-300 hover:scale-105 ${className}`}
        >
          <rect
            x="15"
            y="15"
            width="70"
            height="70"
            rx="12"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth={strokeWidth * 2.5}
            strokeLinejoin="round"
          />
          <rect
            x="35"
            y="35"
            width="30"
            height="30"
            rx="6"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      );
      
    case 'triangle':
      return (
        <svg
          id={`shape-triangle-${size}`}
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-sm transition-transform duration-300 hover:scale-105 ${className}`}
        >
          <path
            d="M50 12 L88 80 C90 84 87 88 82 88 L18 88 C13 88 10 84 12 80 Z"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth={strokeWidth * 2.5}
            strokeLinejoin="round"
          />
          <path
            d="M50 36 L68 70 L32 70 Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      );
      
    case 'star':
      return (
        <svg
          id={`shape-star-${size}`}
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-sm transition-transform duration-300 hover:scale-105 ${className}`}
        >
          <path
            d="M50 10 L63 38 L93 41 L71 61 L78 90 L50 75 L22 90 L29 61 L7 41 L37 38 Z"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth={strokeWidth * 2.5}
            strokeLinejoin="round"
          />
          <path
            d="M50 28 L57 44 L75 46 L62 58 L66 75 L50 66 L34 75 L38 58 L25 46 L43 44 Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      );
      
    default:
      return null;
  }
};

// Map each shape to standard semantic color configurations
export const SHAPE_THEMES = {
  circle: {
    colorClass: 'text-sky-500 dark:text-sky-450',
    bgClass: 'bg-white hover:bg-sky-50/70 dark:bg-slate-900 dark:hover:bg-sky-950/40 border-slate-350 hover:border-sky-400 dark:border-slate-800 dark:hover:border-sky-700 shadow-xs hover:shadow-md hover:scale-[1.015]',
    accentText: 'text-sky-700 dark:text-sky-400 font-extrabold',
    badgeClass: 'bg-sky-100 text-sky-800 border border-sky-300 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-705/60',
    key: '1',
    labelMaori: 'Porohita',
  },
  square: {
    colorClass: 'text-emerald-500 dark:text-emerald-450',
    bgClass: 'bg-white hover:bg-emerald-50/70 dark:bg-slate-900 dark:hover:bg-emerald-950/40 border-slate-350 hover:border-emerald-400 dark:border-slate-800 dark:hover:border-emerald-700 shadow-xs hover:shadow-md hover:scale-[1.015]',
    accentText: 'text-emerald-700 dark:text-emerald-400 font-extrabold',
    badgeClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-705/60',
    key: '2',
    labelMaori: 'Tapawhā Rite',
  },
  triangle: {
    colorClass: 'text-amber-500 dark:text-amber-450',
    bgClass: 'bg-white hover:bg-amber-50/70 dark:bg-slate-900 dark:hover:bg-amber-950/40 border-slate-350 hover:border-amber-400 dark:border-slate-800 dark:hover:border-amber-700 shadow-xs hover:shadow-md hover:scale-[1.015]',
    accentText: 'text-amber-700 dark:text-amber-400 font-extrabold',
    badgeClass: 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-705/60',
    key: '3',
    labelMaori: 'Tapatoru',
  },
  star: {
    colorClass: 'text-rose-500 dark:text-rose-450',
    bgClass: 'bg-white hover:bg-rose-50/70 dark:bg-slate-900 dark:hover:bg-rose-950/40 border-slate-350 hover:border-rose-400 dark:border-slate-800 dark:hover:border-rose-700 shadow-xs hover:shadow-md hover:scale-[1.015]',
    accentText: 'text-rose-700 dark:text-rose-400 font-extrabold',
    badgeClass: 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-705/60',
    key: '4',
    labelMaori: 'Whētu',
  },
};
