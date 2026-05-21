import React from 'react';

interface GameStatsProps {
  score: number;
  streak: number;
  maxStreak: number;
  questionsLeft: number;
  totalQuestions: number;
}

export const GameStats: React.FC<GameStatsProps> = ({
  score,
  streak,
  maxStreak,
  questionsLeft,
  totalQuestions,
}) => {
  // Compute multiplier value. If streak is 0, multiplier is 1x. Otherwise, it is streak + 1x?
  // Let's make the multiplier be directly linked to the streak:
  // e.g., 0 streak is 1x multiplier, 1 streak is 1x, 2 is 2x, 3 is 3x, etc. or simply:
  // Multiplier = 1 + streak. Or directly Multiplier = 1 + Math.floor(streak / 2)x, or simply Streak itself: e.g. "Streak: 3x"!
  // Let's make "Multiplier: {Math.max(1, streak)}x" so that if they get a streak, points are multiplied!
  const multiplier = Math.max(1, streak);
  
  // Decide the aesthetic of the multiplier flame
  let colorTheme = {
    bg: 'bg-indigo-950/80 border-indigo-400 text-indigo-100',
    text: 'text-amber-300 font-black',
    emoji: '❄️',
    glow: 'shadow-sm',
    label: 'KUPU STREAK',
  };

  if (streak >= 10) {
    colorTheme = {
      bg: 'bg-rose-700/85 border-rose-400 text-white animate-pulse',
      text: 'text-amber-300 font-black',
      emoji: '👑🚀',
      glow: 'shadow-md shadow-rose-500/20 ring-4 ring-rose-500/10',
      label: 'KA RAWE! SUPER STREAK!',
    };
  } else if (streak >= 7) {
    colorTheme = {
      bg: 'bg-violet-600 border-violet-400 text-white',
      text: 'text-amber-300 font-black',
      emoji: '⚡🔮',
      glow: 'shadow-sm shadow-violet-500/20 ring-2 ring-violet-500/10',
      label: 'TINO PAI! AWESOME!',
    };
  } else if (streak >= 4) {
    colorTheme = {
      bg: 'bg-amber-600 border-amber-400 text-white',
      text: 'text-indigo-950 font-black bg-white px-1.5 py-0.5 rounded-md',
      emoji: '🔥⚡',
      glow: 'shadow-sm shadow-amber-500/20',
      label: 'TINOPAI! GREAT SELECTIONS!',
    };
  } else if (streak >= 2) {
    colorTheme = {
      bg: 'bg-sky-600 border-sky-400 text-white',
      text: 'text-indigo-950 font-black bg-white px-1.5 py-0.5 rounded-md',
      emoji: '🔥',
      glow: 'shadow-xs',
      label: 'ON A ROLL!',
    };
  } else if (streak === 1) {
    colorTheme = {
      bg: 'bg-emerald-600 border-emerald-400 text-white',
      text: 'text-amber-200 font-black',
      emoji: '👍',
      glow: 'shadow-xs',
      label: 'CORRECT! KEEP IT UP!',
    };
  }

  // Calculate percentage of progress for overall visual feedback
  const progressPercent = Math.max(0, Math.min(100, ((totalQuestions - questionsLeft) / totalQuestions) * 100));

  return (
    <div id="game-stats-header" className="w-full bg-indigo-600 dark:bg-indigo-950 border-b border-indigo-700/60 p-4 sticky top-0 z-30 shadow-md">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Game Title Logo Area */}
        <div className="flex items-center gap-3">
          <div className="bg-white/10 dark:bg-white/5 border border-white/20 text-white p-2.5 rounded-2xl shadow-xs">
            {/* Tiny mini lunchbox SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="8" width="18" height="13" rx="4" />
              <path d="M8 8C8 5, 16 5, 16 8" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-black font-display tracking-tight text-white flex flex-col sm:flex-row sm:items-baseline">
              <span>Pouaka Kai</span>
              <span className="text-indigo-200 text-xs sm:text-sm font-semibold sm:ml-2 font-sans">Māori Lunchbox Academy</span>
            </h1>
          </div>
        </div>

        {/* Stats Panel (Score & Streak Multiplier) */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Current Score Display */}
          <div className="bg-indigo-700/50 dark:bg-indigo-900/60 border border-indigo-500/30 rounded-2xl px-4 py-2 flex flex-col items-center min-w-[100px]">
            <span className="text-[10px] font-bold text-indigo-200 dark:text-indigo-400 uppercase tracking-widest leading-none">
              TOTAL POINTS
            </span>
            <span className="text-xl font-extrabold text-white font-mono tracking-tight mt-0.5">
              {score.toLocaleString()}
            </span>
          </div>

          {/* Streak details and multiplying factor */}
          <div className={`transition-all duration-300 rounded-2xl px-4 py-1.5 border flex flex-col items-center min-w-[150px] ${colorTheme.bg} ${colorTheme.glow}`}>
            <span className="text-[10px] font-black uppercase tracking-wider leading-none mb-1 select-none flex items-center gap-1">
              {colorTheme.emoji} {colorTheme.label}
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl font-black ${colorTheme.text}`}>
                {multiplier}x
              </span>
              <span className="text-[11px] font-semibold text-white/50">
                Multiplier
              </span>
            </div>
          </div>

          {/* Record Display */}
          {maxStreak > 0 && (
            <div className="hidden sm:flex bg-indigo-700/30 dark:bg-indigo-900/40 border border-indigo-500/20 rounded-2xl px-3 py-2 flex-col items-center">
              <span className="text-[9px] font-semibold text-indigo-300 dark:text-indigo-400 uppercase tracking-widest">
                BEST STREAK
              </span>
              <span className="text-sm font-bold text-indigo-100 dark:text-indigo-200 mt-0.5">
                {maxStreak} 🔥
              </span>
            </div>
          )}

        </div>
      </div>

      {/* Modern thin sleek progress bar underneath */}
      <div className="w-full bg-indigo-800/80 dark:bg-indigo-950/85 h-2 mt-4 rounded-full overflow-hidden max-w-4xl mx-auto border border-indigo-700/30">
        <div
          className="bg-amber-400 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(251,191,36,0.6)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
