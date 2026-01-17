import { create } from 'zustand';
import { Phone, SearchFilters, ComparisonPhone } from '@/types/phone';

interface PhoneStore {
  // البحث والتصفية
  searchFilters: SearchFilters;
  setSearchFilters: (filters: SearchFilters) => void;
  
  // المقارنة
  comparisonPhones: ComparisonPhone[];
  addToComparison: (phone: Phone) => void;
  removeFromComparison: (phoneId: string) => void;
  clearComparison: () => void;
  
  // المفضلة
  favorites: string[];
  addToFavorites: (phoneId: string) => void;
  removeFromFavorites: (phoneId: string) => void;
  isFavorite: (phoneId: string) => boolean;
  
  // الإعدادات
  currency: 'egp' | 'usd' | 'sar' | 'aed';
  setCurrency: (currency: 'egp' | 'usd' | 'sar' | 'aed') => void;
  
  language: 'ar' | 'en';
  setLanguage: (language: 'ar' | 'en') => void;
  
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export const usePhoneStore = create<PhoneStore>((set, get) => ({
  // البحث والتصفية
  searchFilters: {
    searchQuery: '',
    brands: [],
    priceRange: { min: 0, max: 100000 },
    categories: [],
    minRating: 0,
    currency: 'egp'
  },
  setSearchFilters: (filters) => set({ searchFilters: filters }),
  
  // المقارنة
  comparisonPhones: [],
  addToComparison: (phone) => set((state) => {
    if (state.comparisonPhones.length >= 4) {
      return state;
    }
    const exists = state.comparisonPhones.some(p => p.id === phone.id);
    if (exists) return state;
    
    return {
      comparisonPhones: [...state.comparisonPhones, {
        id: phone.id,
        name: phone.name,
        image: phone.image,
        price: phone.prices[state.searchFilters.currency],
        ratings: phone.ratings
      }]
    };
  }),
  removeFromComparison: (phoneId) => set((state) => ({
    comparisonPhones: state.comparisonPhones.filter(p => p.id !== phoneId)
  })),
  clearComparison: () => set({ comparisonPhones: [] }),
  
  // المفضلة
  favorites: [],
  addToFavorites: (phoneId) => set((state) => {
    if (!state.favorites.includes(phoneId)) {
      return { favorites: [...state.favorites, phoneId] };
    }
    return state;
  }),
  removeFromFavorites: (phoneId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== phoneId)
  })),
  isFavorite: (phoneId) => get().favorites.includes(phoneId),
  
  // الإعدادات
  currency: 'egp',
  setCurrency: (currency) => set({ currency }),
  
  language: 'ar',
  setLanguage: (language) => set({ language }),
  
  darkMode: false,
  setDarkMode: (darkMode) => set({ darkMode })
}));
