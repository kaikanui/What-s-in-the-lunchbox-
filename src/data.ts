import { LunchboxItem, Question, ShapeType } from './types';

export const LUNCHBOX_ITEMS: LunchboxItem[] = [
  {
    id: 'lunchbox',
    nameEnglish: 'Lunchbox',
    nameMaori: 'pouaka kai',
    category: 'container',
    description: 'The box to carry your delicious lunch.'
  },
  {
    id: 'drink_bottle',
    nameEnglish: 'Drink Bottle',
    nameMaori: 'pounamu wai',
    category: 'container',
    description: 'A bottle to keep your water fresh.'
  },
  {
    id: 'spoon',
    nameEnglish: 'Spoon',
    nameMaori: 'koko',
    category: 'utensil',
    description: 'Used for eating yogurt or soup.'
  },
  {
    id: 'fork',
    nameEnglish: 'Fork',
    nameMaori: 'paoka',
    category: 'utensil',
    description: 'Used for poking and eating pieces of fruit.'
  },
  {
    id: 'knife',
    nameEnglish: 'Knife',
    nameMaori: 'māripi',
    category: 'utensil',
    description: 'Used for cutting or spreading butter.'
  },
  {
    id: 'sandwich',
    nameEnglish: 'Sandwich',
    nameMaori: 'hanawiti',
    category: 'food',
    description: 'Bread filled with lettuce, cheese, or tomato.'
  },
  {
    id: 'apple',
    nameEnglish: 'Apple',
    nameMaori: 'āporo',
    category: 'food',
    description: 'A sweet, crunchy fruit, perfect for playcentre.'
  },
  {
    id: 'banana',
    nameEnglish: 'Banana',
    nameMaori: 'panana',
    category: 'food',
    description: 'A yellow, curved fruit that is easy to peel.'
  },
  {
    id: 'orange',
    nameEnglish: 'Orange',
    nameMaori: 'ārani',
    category: 'food',
    description: 'A round, juicy citrus fruit full of vitamin C.'
  },
  {
    id: 'cookie',
    nameEnglish: 'Cookie',
    nameMaori: 'pihikete',
    category: 'food',
    description: 'A golden biscuit with chocolate chips.'
  },
  {
    id: 'cheese',
    nameEnglish: 'Cheese',
    nameMaori: 'tīhi',
    category: 'food',
    description: 'A tasty yellow dairy slice rich in calcium.'
  },
  {
    id: 'carrot',
    nameEnglish: 'Carrot',
    nameMaori: 'kāreti',
    category: 'food',
    description: 'A crunchy orange root vegetable that helps your eyesight.'
  },
  {
    id: 'grapes',
    nameEnglish: 'Grapes',
    nameMaori: 'karepe',
    category: 'food',
    description: 'Small, sweet purple berries that grow on a vine.'
  },
  {
    id: 'milk',
    nameEnglish: 'Milk',
    nameMaori: 'miraka',
    category: 'food',
    description: 'A fresh, creamy drink to make your bones strong.'
  },
  {
    id: 'pear',
    nameEnglish: 'Pear',
    nameMaori: 'pea',
    category: 'food',
    description: 'A sweet green bell-shaped fruit.'
  },
  {
    id: 'peach',
    nameEnglish: 'Peach',
    nameMaori: 'pītiti',
    category: 'food',
    description: 'A sweet and fuzzy orange-pink fruit.'
  },
  {
    id: 'strawberry',
    nameEnglish: 'Strawberry',
    nameMaori: 'rōpere',
    category: 'food',
    description: 'A sweet, red berry with tiny seeds on the outside.'
  },
  {
    id: 'egg',
    nameEnglish: 'Egg',
    nameMaori: 'hēki',
    category: 'food',
    description: 'A hardboiled egg that is full of nutrition.'
  },
  {
    id: 'bread',
    nameEnglish: 'Bread',
    nameMaori: 'parāoa',
    category: 'food',
    description: 'Soft slice of bread, great for healthy energy.'
  },
  {
    id: 'tomato',
    nameEnglish: 'Tomato',
    nameMaori: 'tōmato',
    category: 'food',
    description: 'A juicy red fruit that tastes great in any lunch.'
  }
];

// Helper to shuffle an array
export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// Generate a random question for a specific target item
export function generateQuestion(targetItem: LunchboxItem): Question {
  // Get 3 random distractors
  const distractors = LUNCHBOX_ITEMS.filter(item => item.id !== targetItem.id);
  const shuffledDistractors = shuffleArray(distractors).slice(0, 3);
  
  // Combine target and distractors
  const optionsPool = [
    { word: targetItem.nameMaori, itemId: targetItem.id },
    ...shuffledDistractors.map(d => ({ word: d.nameMaori, itemId: d.id }))
  ];
  
  // Shuffle options so the correct answer is at a random position
  const shuffledOptions = shuffleArray(optionsPool);
  
  // Assign shapes to the 4 sorted spots
  const shapes: ShapeType[] = ['circle', 'square', 'triangle', 'star'];
  
  const options = shuffledOptions.map((opt, idx) => ({
    shape: shapes[idx],
    word: opt.word,
    itemId: opt.itemId
  }));
  
  return {
    item: targetItem,
    options
  };
}

// Generate the initial queue of 15 questions, one for each item, randomized
export function generateInitialQueue(): Question[] {
  const shuffledItems = shuffleArray(LUNCHBOX_ITEMS);
  return shuffledItems.map(item => generateQuestion(item));
}
