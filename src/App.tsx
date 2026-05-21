import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Info, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Keyboard,
  Award,
  Zap
} from 'lucide-react';

import { Question, GameState } from './types';
import { LUNCHBOX_ITEMS, generateInitialQueue, generateQuestion } from './data';
import { ShapeIcon, SHAPE_THEMES } from './components/ShapeIcon';
import { FoodIllustration } from './components/FoodIllustration';
import { GameStats } from './components/GameStats';
import { TeReoGlossary } from './components/TeReoGlossary';

// Web Audio API Synthesizer setup for delightful offline sound effects
let audioCtx: AudioContext | null = null;
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

function playSynthesizedSound(type: 'correct' | 'incorrect' | 'victory' | 'click', isMuted: boolean) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;
    
    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.1);
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'correct') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc2.frequency.setValueAtTime(783.99, now + 0.16); // G5
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.002, now + 0.4);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start(now);
      osc1.stop(now + 0.4);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.4);
    } else if (type === 'incorrect') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(170, now);
      osc.frequency.linearRampToValueAtTime(95, now + 0.3);
      
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'victory') {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.07);
        gain.gain.setValueAtTime(0.08, now + index * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.07 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.07);
        osc.stop(now + index * 0.07 + 0.6);
      });
    }
  } catch (err) {
    console.warn('Sound synthesis error:', err);
  }
}

export default function App() {
  // Sound Muted state
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Glossary overlay toggle
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  
  // Clues toggles
  const [showClue, setShowClue] = useState<boolean>(false);
  
  // Keyboard shortcut toggle info
  const [showKeyboardHelp, setShowKeyboardHelp] = useState<boolean>(false);

  // Main game state
  const [gameState, setGameState] = useState<GameState>({
    view: 'intro',
    queue: [],
    currentQuestionIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    totalCorrect: 0,
    totalAttempts: 0,
    questionsAnsweredCount: 0,
  });

  // Mastered list (to display dots progress mapping back to original 15 items)
  const [masteredItemIds, setMasteredItemIds] = useState<string[]>([]);
  // Shuffled back items to list which items have had mistakes to summarize at final screen
  const [mistakenItemIds, setMistakenItemIds] = useState<Set<string>>(new Set());

  // Interactive feedback triggers
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCorrectSelection, setIsCorrectSelection] = useState<boolean | null>(null);
  const [shakeTrigger, setShakeTrigger] = useState<boolean>(false);

  // Keyboard shortcut bindings (1, 2, 3, 4 represent Circle, Square, Triangle, Star)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (gameState.view !== 'playing' || isGlossaryOpen) return;
      if (selectedWord !== null) {
        // If feedback is showing, pressing space or enter advances to the next question
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleNextQuestion();
        }
        return;
      }
      
      const currentQuestion = gameState.queue[0];
      if (!currentQuestion) return;

      if (e.key === '1') {
        const opt = currentQuestion.options.find(o => o.shape === 'circle');
        if (opt) handleOptionSelect(opt.word);
      } else if (e.key === '2') {
        const opt = currentQuestion.options.find(o => o.shape === 'square');
        if (opt) handleOptionSelect(opt.word);
      } else if (e.key === '3') {
        const opt = currentQuestion.options.find(o => o.shape === 'triangle');
        if (opt) handleOptionSelect(opt.word);
      } else if (e.key === '4') {
        const opt = currentQuestion.options.find(o => o.shape === 'star');
        if (opt) handleOptionSelect(opt.word);
      } else if (e.key === 'h' || e.key === 'H') {
        setShowClue(prev => !prev);
      } else if (e.key === 'g' || e.key === 'G') {
        setIsGlossaryOpen(prev => !prev);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, selectedWord, isGlossaryOpen]);

  // Start/Restart the game routine
  function startGame() {
    playSynthesizedSound('click', isMuted);
    const initialQueue = generateInitialQueue();
    
    setGameState({
      view: 'playing',
      queue: initialQueue,
      currentQuestionIndex: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      totalCorrect: 0,
      totalAttempts: 0,
      questionsAnsweredCount: 0,
    });
    setMasteredItemIds([]);
    setMistakenItemIds(new Set());
    setSelectedWord(null);
    setIsCorrectSelection(null);
    setShowClue(false);
  }

  // Handle when a student selects one of the 4 Māori words on the right
  function handleOptionSelect(word: string) {
    if (selectedWord !== null) return; // Prevent double clicks
    
    playSynthesizedSound('click', isMuted);
    setSelectedWord(word);
    
    const currentQuestion = gameState.queue[0];
    const isCorrect = currentQuestion.item.nameMaori === word;
    setIsCorrectSelection(isCorrect);
    
    setGameState(prev => {
      const nextAttempts = prev.totalAttempts + 1;
      let nextStreak = prev.streak;
      let nextMaxStreak = prev.maxStreak;
      let nextScore = prev.score;
      let nextCorrect = prev.totalCorrect;
      
      if (isCorrect) {
        nextStreak = prev.streak + 1;
        nextMaxStreak = Math.max(nextMaxStreak, nextStreak);
        nextCorrect = prev.totalCorrect + 1;
        
        // Multiplying Point calculation: streak multiplies base score
        const pointsAwarded = 100 * nextStreak;
        nextScore = prev.score + pointsAwarded;
        
        playSynthesizedSound('correct', isMuted);
        
        // Add to mastered list if not already there
        if (!masteredItemIds.includes(currentQuestion.item.id)) {
          setMasteredItemIds(m => [...m, currentQuestion.item.id]);
        }
      } else {
        // Red flashing error
        setShakeTrigger(true);
        setTimeout(() => setShakeTrigger(false), 500);
        
        nextStreak = 0; // reset streak back to zero
        playSynthesizedSound('incorrect', isMuted);
        
        // Track mistake for list review at completion
        setMistakenItemIds(prevMistakes => {
          const updated = new Set(prevMistakes);
          updated.add(currentQuestion.item.id);
          return updated;
        });
      }

      return {
        ...prev,
        score: nextScore,
        streak: nextStreak,
        maxStreak: nextMaxStreak,
        totalAttempts: nextAttempts,
        totalCorrect: nextCorrect,
      };
    });
  }

  // Advance to next question or complete game
  function handleNextQuestion() {
    if (selectedWord === null) return;
    
    playSynthesizedSound('click', isMuted);
    const currentQuestion = gameState.queue[0];
    const remainingQueue = [...gameState.queue];
    
    // Deque target
    remainingQueue.shift();
    
    if (isCorrectSelection) {
      // Correct! Permanent removal from the queue
      if (remainingQueue.length === 0) {
        // Game Completed!
        setGameState(prev => ({
          ...prev,
          view: 'completed',
          queue: [],
          questionsAnsweredCount: prev.questionsAnsweredCount + 1,
        }));
        playSynthesizedSound('victory', isMuted);
      } else {
        // Next slide appears
        setGameState(prev => ({
          ...prev,
          queue: remainingQueue,
          questionsAnsweredCount: prev.questionsAnsweredCount + 1,
        }));
      }
    } else {
      // WRONG answer. It must slide back up later!
      // Generate a fresh question distraction layout so it's not simply repeating coordinates
      const freshQuestion = generateQuestion(currentQuestion.item);
      
      // We insert it 3-4 slides downstream so they practice others first, then recall it
      const insertPosition = Math.min(remainingQueue.length, 3);
      remainingQueue.splice(insertPosition, 0, freshQuestion);
      
      setGameState(prev => ({
        ...prev,
        queue: remainingQueue,
      }));
    }

    // Reset temporary states
    setSelectedWord(null);
    setIsCorrectSelection(null);
    setShowClue(false);
  }

  // Toggle audio
  function toggleMute() {
    setIsMuted(prev => !prev);
  }

  const currentQuestion = gameState.queue[0];
  const questionsLeftCount = gameState.queue.length;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b101d] font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300 flex flex-col justify-between selection:bg-indigo-500/10 selection:text-indigo-600">
      
      {/* --- TOP HUD BAR --- */}
      {gameState.view === 'playing' && (
        <GameStats 
          score={gameState.score} 
          streak={gameState.streak} 
          maxStreak={gameState.maxStreak}
          questionsLeft={questionsLeftCount}
          totalQuestions={20} // Always 20 mastered targets
        />
      )}

      {/* --- EXTRA CONTROLS UTILITY LINE --- */}
      <div className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/50 dark:border-slate-800/80 px-4 py-2.5 text-xs flex justify-between items-center z-10 select-none">
        <div className="flex gap-4 items-center">
          {gameState.view === 'playing' && (
            <button
              id="shortcuts-btn"
              onClick={() => setShowKeyboardHelp(p => !p)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 border border-slate-200/50 dark:border-slate-700 transition-all font-bold cursor-pointer"
            >
              <Keyboard size={13} className="text-indigo-500" />
              Keyboard Shortcuts
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Audio toggle button */}
          <button
            id="toggle-audio"
            onClick={toggleMute}
            className="p-1 px-4 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-2 font-bold cursor-pointer select-none transition-all"
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
          >
            {isMuted ? <VolumeX size={14} className="text-rose-500" /> : <Volume2 size={14} className="text-indigo-500 animate-pulse" />}
            <span>{isMuted ? 'Muted' : 'Sounds On'}</span>
          </button>

          {/* Reference Book Toggle */}
          <button
            id="toggle-glossary-hud"
            onClick={() => setIsGlossaryOpen(prev => !prev)}
            className="p-1 px-4 py-1 rounded-full bg-indigo-600 dark:bg-indigo-900 hover:bg-indigo-700 dark:hover:bg-indigo-850 text-white flex items-center gap-1.5 font-black cursor-pointer transition-all shadow-xs"
          >
            <BookOpen size={13} />
            <span>Kupu Library</span>
          </button>
        </div>
      </div>

      {/* --- KEYBOARD SHORTCUT ASSISTANCE FLOATER --- */}
      {showKeyboardHelp && gameState.view === 'playing' && (
        <div id="keyboard-help-panel" className="bg-amber-50 dark:bg-amber-950/20 border-b border-amber-200 dark:border-amber-900/60 py-2 px-4 text-xs text-amber-800 dark:text-amber-300">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <p className="flex items-center gap-2">
              <Zap size={14} className="text-amber-500 shrink-0" />
              <span>
                <strong>Quick Keys:</strong> Press <kbd className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900 border border-amber-300 font-mono">1</kbd> for Circle, <kbd className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900 border border-amber-300 font-mono">2</kbd> for Square, <kbd className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900 border border-amber-300 font-mono">3</kbd> for Triangle, and <kbd className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/40 border border-amber-300 font-mono">4</kbd> for Star. Press <kbd className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/40 border border-amber-300 font-mono">H</kbd> for translation clue. Press <kbd className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/40 border border-amber-300 font-mono">Space</kbd> to continue!
              </span>
            </p>
            <button 
              id="dismiss-shortcut-help"
              onClick={() => setShowKeyboardHelp(false)} 
              className="text-amber-600 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-200 font-bold ml-4"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* --- MAIN INTERFACE VIEWS --- */}
      <main id="main-content-area" className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 flex items-center justify-center">
        
        {/* Glossary Overlay Screen Modal */}
        {isGlossaryOpen && (
          <div id="glossary-modal-container" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-5xl max-h-[85vh] overflow-y-auto p-6 md:p-8 relative">
              <TeReoGlossary onClose={() => setIsGlossaryOpen(false)} />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* 1. INTRO SCREEN */}
          {gameState.view === 'intro' && (
            <motion.div
              id="intro-screen"
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full text-center"
            >
              {/* Cover Lunchbox Animation Box */}
              <div className="inline-flex p-6 rounded-3xl bg-indigo-50/40 dark:bg-indigo-950/15 border border-indigo-100/60 dark:border-indigo-900/40 mb-6 drop-shadow-xl justify-center items-center backdrop-blur-xs">
                <FoodIllustration itemId="lunchbox" size={140} className="hover:scale-105 transition-transform duration-300" />
              </div>

              <div className="flex justify-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-4 py-1.5 rounded-full border border-indigo-150/50 dark:border-indigo-900/50 select-none">
                  Māori Language Academy Game
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black font-display text-slate-800 dark:text-slate-100 tracking-tight mt-1 max-w-xl mx-auto leading-tight">
                Master the Reo Māori <br />
                <span className="text-indigo-600 dark:text-indigo-400">Pouaka Kai</span> Words!
              </h2>

              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-4 text-base leading-relaxed">
                Open up the lunchbox! Test your knowledge of 20 essential foods and lunchbox utensils. Select the correct Māori word mapped to each unique shape card.
              </p>

              {/* Instructions Brief Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto my-8 text-left">
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xs">
                  <div className="flex gap-3">
                    <div className="p-2 h-10 w-10 flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold font-mono">
                      20
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 border-none">Target Items</h4>
                      <p className="text-xs text-slate-500">Master every single object inside the lunchbox to win.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xs">
                  <div className="flex gap-3">
                    <div className="p-2 h-10 w-10 flex items-center justify-center bg-rose-50 dark:bg-rose-950/30 text-rose-500 rounded-xl font-bold">
                      🔥
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">Streak Multiplier</h4>
                      <p className="text-xs text-slate-500">Answer correctly in a row to multiply your points reward!</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xs">
                  <div className="flex gap-3">
                    <div className="p-2 h-10 w-10 flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-xl font-bold">
                      🔄
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">Spaced Recovery</h4>
                      <p className="text-xs text-slate-500">Got one wrong? Don&apos;t worry! It slides back up later until you master it.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xs">
                  <div className="flex gap-3">
                    <div className="p-2 h-10 w-10 flex items-center justify-center bg-amber-50 dark:bg-amber-950/30 text-amber-500 rounded-xl font-bold">
                      ▲
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">Vibrant Shapes</h4>
                      <p className="text-xs text-slate-500">Pick options by words or their matching shapes.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <button
                  id="start-game-btn"
                  onClick={startGame}
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-base font-black tracking-tight rounded-2xl shadow-md shadow-indigo-600/15 flex items-center justify-center gap-2 cursor-pointer transition-all duration-150"
                >
                  <span>TĪMATA TE TĀKARO / START GAME</span>
                  <ArrowRight size={18} />
                </button>
                
                <button
                  id="open-library-btn"
                  onClick={() => setIsGlossaryOpen(true)}
                  className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 text-sm font-bold border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-150"
                >
                  <BookOpen size={16} className="text-indigo-600" />
                  <span>Kupu Dictionary</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. THE GAME STAGE */}
          {gameState.view === 'playing' && currentQuestion && (
            <motion.div
              id="gameplay-stage"
              key={currentQuestion.item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch"
            >
              {/* --- LEFT HAND SECTION: Item Vector Illustration --- */}
              <div className="md:col-span-5 flex flex-col justify-between items-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative transition-all duration-300 hover:shadow-md">
                
                {/* Background soft ambient radial glow behind food */}
                <div className="absolute inset-0 bg-radial from-indigo-500/5 via-transparent to-transparent pointer-events-none rounded-3xl opacity-80" />

                {/* Category Indicator Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-black uppercase bg-indigo-100 dark:bg-indigo-950 px-3 py-1 rounded-full text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800 tracking-wider select-none">
                    {currentQuestion.item.category}
                  </span>
                </div>

                {/* Study Hint Trigger */}
                <div className="absolute top-3 right-3 z-10">
                  <button
                    id="show-hint-btn"
                    onClick={() => {
                      playSynthesizedSound('click', isMuted);
                      setShowClue(true);
                    }}
                    disabled={showClue}
                    className={`p-1.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                      showClue 
                        ? 'bg-slate-150 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700' 
                        : 'bg-amber-50 hover:bg-amber-100 border-amber-205 text-amber-700 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-450 cursor-pointer active:scale-95'
                    }`}
                  >
                    <HelpCircle size={13} fill="currentColor" fillOpacity="0.1" />
                    <span>Clue</span>
                  </button>
                </div>

                {/* Big Illustration Stage */}
                <div className="w-full flex-1 flex items-center justify-center p-8 min-h-[220px] relative">
                  <motion.div
                    id={`illustration-container-${currentQuestion.item.id}`}
                    animate={shakeTrigger ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="w-full flex items-center justify-center relative z-10"
                  >
                    <FoodIllustration itemId={currentQuestion.item.id} size={180} />
                  </motion.div>
                </div>

                {/* Interactive labels */}
                <div className="text-center w-full mt-4 border-t border-slate-150 dark:border-slate-800/60 pt-4 relative z-10">
                  <h3 className="text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest leading-none select-none font-sans">
                    He aha tēnei?
                  </h3>
                  <p className="text-slate-900 dark:text-slate-100 text-lg font-bold font-display mt-1.5 tracking-tight leading-none">
                    What is this lunchbox item?
                  </p>

                  {/* Inline English clue display */}
                  <div className="h-6 mt-1 flex justify-center items-center">
                    <AnimatePresence>
                      {showClue && (
                        <motion.span
                          id="english-clue"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs font-bold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800"
                        >
                          English: <span className="underline italic ml-1">{currentQuestion.item.nameEnglish}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>


              {/* --- RIGHT HAND SECTION: Four Shape Options --- */}
              <div className="md:col-span-7 flex flex-col justify-between gap-4">
                
                {/* 2x2 Grid of the 4 shape-words boxes */}
                <div id="words-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  {currentQuestion.options.map((opt) => {
                    const theme = SHAPE_THEMES[opt.shape];
                    const isSelected = selectedWord === opt.word;
                    const isCorrectWord = currentQuestion.item.nameMaori === opt.word;
                         // Style determinators based on state
                    let borderClass = 'border-slate-300 dark:border-slate-700 shadow-sm hover:shadow-md hover:scale-[1.015]';
                    let bgClass = theme.bgClass;
                    let textClass = 'text-slate-950 dark:text-white font-display font-black tracking-tight text-xl md:text-2xl';
                    let badgeStyles = theme.badgeClass;

                    if (selectedWord !== null) {
                      if (isCorrectWord) {
                        // Highlight the correct answer instantly
                        borderClass = 'border-emerald-500 ring-4 ring-emerald-500/20 shadow-md shadow-emerald-500/10 scale-[1.02]';
                        bgClass = 'bg-emerald-600 dark:bg-emerald-800';
                        textClass = 'text-white font-black font-display text-xl md:text-2xl';
                        badgeStyles = 'bg-white/20 text-white border-none font-bold';
                      } else if (isSelected) {
                        // Clicking wrong highlights this red
                        borderClass = 'border-rose-500 ring-4 ring-rose-500/20 shadow-md shadow-rose-500/10 scale-[0.98]';
                        bgClass = 'bg-rose-600 dark:bg-rose-800';
                        textClass = 'text-white font-black font-display text-xl md:text-2xl';
                        badgeStyles = 'bg-white/20 text-white border-none font-bold';
                      } else {
                        // Fades others
                        borderClass = 'border-slate-200/20 dark:border-slate-800/20 opacity-25';
                        bgClass = 'bg-slate-50 dark:bg-slate-950/20';
                        textClass = 'text-slate-400 dark:text-slate-500 font-display font-medium text-lg md:text-xl';
                        badgeStyles = 'bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-500 border-none';
                      }
                    }

                    return (
                      <button
                        id={`option-${opt.shape}`}
                        key={opt.shape}
                        onClick={() => handleOptionSelect(opt.word)}
                        disabled={selectedWord !== null}
                        className={`group relative text-center p-6 rounded-3xl border-2 flex flex-col items-center justify-center min-h-[145px] transition-all duration-200 select-none ${
                          selectedWord === null ? 'cursor-pointer active:scale-95' : ''
                        } ${borderClass} ${bgClass}`}
                      >
                        {/* Box Keyboard Indicator Badge */}
                        <div className="absolute top-3 left-3 flex gap-1">
                          <span className={`text-[9.5px] font-black uppercase rounded-lg px-2.5 py-1 tracking-wider select-none ${badgeStyles}`}>
                            {theme.labelMaori}
                          </span>
                        </div>
                        
                        <div className="absolute top-3 right-3 opacity-80 group-hover:opacity-100 transition-opacity">
                          <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded-md border font-black ${badgeStyles}`}>
                            Key {theme.key}
                          </span>
                        </div>

                        {/* Shape icon above the word */}
                        <div className="mb-3 mt-3 h-14 flex items-center justify-center">
                          <ShapeIcon 
                            shape={opt.shape} 
                            size={44} 
                            className={selectedWord !== null && (isCorrectWord || isSelected) ? 'text-white' : theme.colorClass} 
                          />
                        </div>

                        {/* Te Reo Māori word with large macrons */}
                        <span className={`tracking-tight block ${textClass}`}>
                          {opt.word}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* --- FEEDBACK CONSOLE AT LOWER RIGHT --- */}
                <div className="min-h-[90px] flex items-center justify-center font-sans">
                  <AnimatePresence mode="wait">
                    {selectedWord !== null ? (
                      <motion.div
                        id="feedback-console"
                        key="feedback"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full"
                      >
                        {isCorrectSelection ? (
                          <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-500/20 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                            <div className="flex items-center gap-3.5">
                              <span className="p-3 bg-emerald-500 text-white rounded-2xl shadow-sm shrink-0">
                                <CheckCircle size={22} />
                              </span>
                              <div>
                                <h4 className="font-extrabold text-emerald-800 dark:text-emerald-350 font-display">
                                  Kei te pai! Correct! [+{(100 * gameState.streak).toLocaleString()} pts]
                                </h4>
                                <p className="text-xs text-emerald-600/90 dark:text-emerald-400 capitalize mt-0.5">
                                  <strong>{currentQuestion.item.nameMaori}</strong> means <strong>{currentQuestion.item.nameEnglish}</strong>.
                                </p>
                              </div>
                            </div>

                            <button
                              id="next-question-btn"
                              onClick={handleNextQuestion}
                              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs tracking-wider uppercase rounded-2xl shadow-sm transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
                            >
                              <span>Next Item</span>
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="p-5 bg-rose-50/50 dark:bg-rose-950/20 border-2 border-rose-500/20 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                            <div className="flex items-center gap-3.5">
                              <span className="p-3 bg-rose-500 text-white rounded-2xl shadow-sm shrink-0">
                                <AlertCircle size={22} />
                              </span>
                              <div>
                                <h4 className="font-extrabold text-rose-800 dark:text-rose-350 font-display">
                                  Aue! Not quite!
                                </h4>
                                <p className="text-xs text-rose-600/90 dark:text-rose-400 mt-0.5">
                                  <strong>{currentQuestion.item.nameMaori}</strong> is English: <strong>{currentQuestion.item.nameEnglish}</strong>. Shuffled back to see later.
                                </p>
                              </div>
                            </div>

                            <button
                              id="next-question-btn"
                              onClick={handleNextQuestion}
                              className="w-full sm:w-auto px-6 py-3.5 bg-rose-605 hover:bg-rose-700 text-white font-black text-xs tracking-wider uppercase rounded-2xl shadow-sm transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
                            >
                              <span>Continue</span>
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <div className="text-center p-3 text-xs text-slate-400 flex items-center gap-2 justify-center leading-relaxed">
                        <Info size={14} className="text-slate-300 dark:text-slate-600 scale-95 shrink-0" />
                        <span>Tap a box above, press <kbd className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded border">1-4</kbd> keys, or click to check your Reo Māori knowledge!</span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          )}

          {/* 3. GAME COMPLETED SCREEN */}
          {gameState.view === 'completed' && (
            <motion.div
              id="completion-screen"
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl mx-auto p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 rounded-3xl text-center shadow-md flex flex-col items-center"
            >
              <div className="p-5 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 mb-6 border border-indigo-100 dark:border-indigo-900/40">
                <Award size={48} className="animate-bounce" />
              </div>

              <div className="flex justify-center mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                  Kia Ora! Completed!
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black font-display text-slate-800 dark:text-slate-100 tracking-tight mt-1 leading-tight">
                Kua motuhake te Pouaka! <br />
                <span className="text-indigo-600 dark:text-indigo-400 font-black">Awesome Lunchbox Mastered!</span>
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 max-w-sm">
                Congratulations! You successfully matched all 20 Pouaka Kai vocabulary items in Māori with correct shape associations.
              </p>

              {/* Core metrics readout */}
              <div className="grid grid-cols-2 gap-4 w-full my-6 bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                
                <div className="text-center p-2">
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-extrabold font-sans">
                    Final Score
                  </span>
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight font-mono">
                    {gameState.score.toLocaleString()}
                  </span>
                </div>

                <div className="text-center p-2 border-l border-slate-200 dark:border-slate-800 w-full">
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-extrabold font-sans">
                    Mistakes Made
                  </span>
                  <span className="text-2xl font-black text-slate-700 dark:text-slate-300 tracking-tight">
                    {gameState.totalAttempts - gameState.totalCorrect}
                  </span>
                </div>

                <div className="text-center p-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-extrabold font-sans">
                    Total Attempts
                  </span>
                  <span className="text-2xl font-black text-slate-700 dark:text-slate-300 tracking-tight">
                    {gameState.totalAttempts}
                  </span>
                </div>

                <div className="text-center p-2 border-l border-t border-slate-200 dark:border-slate-800 pt-3">
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-extrabold font-sans">
                    Max Streak
                  </span>
                  <span className="text-2xl font-black text-amber-500 tracking-tight flex items-center justify-center gap-1">
                    {gameState.maxStreak} <Zap size={14} className="fill-amber-500 text-amber-500 inline" />
                  </span>
                </div>
              </div>

              {/* Review section if they got some wrong */}
              {mistakenItemIds.size > 0 && (
                <div className="w-full text-left mb-6 bg-amber-50/20 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-4">
                  <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wide mb-2 font-display">
                    🔄 Words Shuffled Back For Retention:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(mistakenItemIds).map(itemId => {
                      const vocab = LUNCHBOX_ITEMS.find(item => item.id === itemId);
                      return vocab ? (
                        <span 
                          id={`mistake-tag-${itemId}`}
                          key={itemId} 
                          className="text-[11px] font-semibold bg-white dark:bg-slate-800/80 border border-amber-200 px-2.5 py-1 rounded-lg lowercase text-amber-700 dark:text-amber-300 shadow-xs"
                        >
                          {vocab.nameMaori} ({vocab.nameEnglish})
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* Reset trigger */}
              <button
                id="reset-game-btn"
                onClick={startGame}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-base tracking-wide rounded-2xl cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-indigo-600/15 duration-150"
              >
                <RotateCcw size={18} />
                <span>TĀKARO ANŌ / PLAY AGAIN</span>
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* --- BOTTOM HUD BAR: Question Counters and Mastered Dots --- */}
      <footer id="footer-navigator" className="w-full max-w-4xl mx-auto py-5 px-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
        
        {/* Count left info */}
        <div>
          {gameState.view === 'playing' ? (
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500 animate-ping"></span>
              <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-display">
                {questionsLeftCount} {questionsLeftCount === 1 ? 'item' : 'items'} remaining!
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold text-slate-400">
              {gameState.view === 'intro' ? 'Press Start Game' : '20/20 Items Mastered'}
            </span>
          )}
        </div>

        {/* 20 Mastery Indicator Dots */}
        <div id="mastery-matrix" className="flex items-center gap-1.5 select-none" title="Mastery tracker panel">
          {LUNCHBOX_ITEMS.map((item, idx) => {
            const isMastered = masteredItemIds.includes(item.id);
            const isCurrentlyPlaying = currentQuestion && currentQuestion.item.id === item.id;
            
            let circleColor = 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700';
            let pulseStyle = '';
            
            if (isMastered) {
              circleColor = 'bg-indigo-600 dark:bg-indigo-500 border-indigo-600';
            } else if (isCurrentlyPlaying) {
              circleColor = 'bg-amber-100 border-amber-500 dark:bg-amber-950/20';
              pulseStyle = 'animate-pulse scale-110';
            }

            return (
              <div
                id={`mastery-dot-${idx}`}
                key={item.id}
                className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${circleColor} ${pulseStyle}`}
                title={`${idx + 1}. ${item.nameEnglish} - ${isMastered ? 'Mastered' : 'To Go'}`}
              />
            );
          })}
        </div>

      </footer>
    </div>
  );
}
