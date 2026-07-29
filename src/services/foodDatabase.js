// Calori Food Database & Macro Reference

export const PRESET_FOODS = [
  // Proteins & Meals
  { id: 'f1', name: 'Chicken Breast (Cooked)', category: 'Proteins', serving: '100g', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 'f2', name: 'Salmon Filet (Baked)', category: 'Proteins', serving: '120g', calories: 240, protein: 25, carbs: 0, fat: 14 },
  { id: 'f3', name: 'Eggs (Whole, Large)', category: 'Proteins', serving: '2 eggs (100g)', calories: 144, protein: 12.6, carbs: 0.8, fat: 9.6 },
  { id: 'f4', name: 'Greek Yogurt (0% Fat)', category: 'Proteins', serving: '170g container', calories: 100, protein: 18, carbs: 6, fat: 0 },
  { id: 'f5', name: 'Whey Protein Powder', category: 'Proteins', serving: '1 scoop (30g)', calories: 120, protein: 24, carbs: 3, fat: 1.5 },
  { id: 'f6', name: 'Lean Ground Beef (90/10)', category: 'Proteins', serving: '100g', calories: 176, protein: 20, carbs: 0, fat: 10 },
  { id: 'f7', name: 'Tofu (Firm)', category: 'Proteins', serving: '100g', calories: 83, protein: 10, carbs: 2, fat: 5 },
  { id: 'f8', name: 'Cottage Cheese (Low Fat)', category: 'Proteins', serving: '150g', calories: 120, protein: 16, carbs: 5, fat: 2.5 },

  // Carbs & Grains
  { id: 'f10', name: 'Rolled Oats (Raw)', category: 'Carbs', serving: '50g (1/2 cup)', calories: 190, protein: 7, carbs: 34, fat: 3 },
  { id: 'f11', name: 'Jasmine Rice (Cooked)', category: 'Carbs', serving: '150g (1 cup)', calories: 195, protein: 4, carbs: 43, fat: 0.4 },
  { id: 'f12', name: 'Sweet Potato (Baked)', category: 'Carbs', serving: '150g medium', calories: 135, protein: 3, carbs: 31, fat: 0.2 },
  { id: 'f13', name: 'Whole Wheat Bread', category: 'Carbs', serving: '2 slices (70g)', calories: 160, protein: 8, carbs: 28, fat: 2 },
  { id: 'f14', name: 'Banana (Medium)', category: 'Carbs', serving: '1 medium (118g)', calories: 105, protein: 1.3, carbs: 27, fat: 0.3 },
  { id: 'f15', name: 'Quinoa (Cooked)', category: 'Carbs', serving: '150g', calories: 180, protein: 6, carbs: 32, fat: 2.5 },
  { id: 'f16', name: 'Apple (Honeycrisp)', category: 'Carbs', serving: '1 medium (182g)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },

  // Healthy Fats & Nuts
  { id: 'f20', name: 'Avocado', category: 'Fats', serving: '1/2 medium (75g)', calories: 120, protein: 1.5, carbs: 6, fat: 11 },
  { id: 'f21', name: 'Peanut Butter (Natural)', category: 'Fats', serving: '2 tbsp (32g)', calories: 190, protein: 8, carbs: 7, fat: 16 },
  { id: 'f22', name: 'Almonds (Raw)', category: 'Fats', serving: '1 oz (28g)', calories: 160, protein: 6, carbs: 6, fat: 14 },
  { id: 'f23', name: 'Extra Virgin Olive Oil', category: 'Fats', serving: '1 tbsp (14ml)', calories: 120, protein: 0, carbs: 0, fat: 14 },

  // Veggies & Greens
  { id: 'f30', name: 'Steamed Broccoli', category: 'Veggies', serving: '150g', calories: 50, protein: 3.8, carbs: 10, fat: 0.5 },
  { id: 'f31', name: 'Spinach (Fresh)', category: 'Veggies', serving: '100g', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { id: 'f32', name: 'Mixed Berries', category: 'Fruits', serving: '140g (1 cup)', calories: 70, protein: 1, carbs: 17, fat: 0.5 }
];

import { loadSavedCustomFoods } from './cloudStorage';

export const searchFoodDatabase = (query) => {
  const customFoods = loadSavedCustomFoods();
  const allFoods = [...customFoods, ...PRESET_FOODS];
  
  if (!query.trim()) return allFoods;
  const q = query.toLowerCase().trim();
  return allFoods.filter(item => 
    item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
  );
};
