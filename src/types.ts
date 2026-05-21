export type ShapeType = 'circle' | 'square' | 'triangle' | 'star';

export interface LunchboxItem {
  id: string;
  nameEnglish: string;
  nameMaori: string;
  category: 'food' | 'utensil' | 'container';
  description: string;
}

export interface Question {
  item: LunchboxItem;
  options: {
    shape: ShapeType;
    word: string; // Māori word
    itemId: string; // The item ID of the option (for checking correctness)
  }[];
}

export interface GameState {
  view: 'intro' | 'playing' | 'completed';
  queue: Question[];
  currentQuestionIndex: number;
  score: number;
  streak: number;
  maxStreak: number;
  totalCorrect: number;
  totalAttempts: number;
  questionsAnsweredCount: number; // to calculate how many completed
}
