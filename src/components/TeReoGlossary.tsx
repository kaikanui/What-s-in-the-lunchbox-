import React from 'react';
import { LUNCHBOX_ITEMS } from '../data';
import { FoodIllustration } from './FoodIllustration';

interface TeReoGlossaryProps {
  onClose?: () => void;
}

export const TeReoGlossary: React.FC<TeReoGlossaryProps> = ({ onClose }) => {
  return (
    <div id="te-reo-glossary" className="p-1 px-3">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Kupu Aromatawai — Pouaka Kai Dictionary
          </h2>
          <p className="text-sm text-slate-500">
            Learn the names of standard lunchbox foods and items in Te Reo Māori beforehand or use this to help you review.
          </p>
        </div>
        
        {onClose && (
          <button
            id="close-glossary"
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            title="Return to the game"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {LUNCHBOX_ITEMS.map((item) => (
          <div
            id={`glossary-item-${item.id}`}
            key={item.id}
            className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/50 dark:border-slate-800 text-center hover:scale-[1.02] hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300"
          >
            {/* Visual Mini illustration */}
            <div className="w-24 h-24 mb-3 flex items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-900 shadow-xs">
              <FoodIllustration itemId={item.id} size={84} />
            </div>

            {/* Te Reo term with macrons */}
            <span className="text-lg font-black text-rose-500 tracking-tight leading-tight lowercase">
              {item.nameMaori}
            </span>

            {/* English meaning */}
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-wide">
              {item.nameEnglish}
            </span>

            {/* Little description summary */}
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
