import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  userId: string;
  favorites: any[];
  ratings: any[];
  setUserId: (id: string) => void;
  addFavorite: (phone: any) => void;
  removeFavorite: (phoneId: string) => void;
  isFavorite: (phoneId: string) => boolean;
  addRating: (phoneId: string, rating: number, comment: string) => void;
  getRating: (phoneId: string) => any;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      userId: localStorage.getItem('userId') || `user_${Date.now()}`,
      favorites: [],
      ratings: [],

      setUserId: (id: string) => {
        set({ userId: id });
        localStorage.setItem('userId', id);
      },

      addFavorite: (phone: any) => {
        const { favorites } = get();
        if (!favorites.find((f) => f.id === phone.id)) {
          set({ favorites: [...favorites, phone] });
        }
      },

      removeFavorite: (phoneId: string) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((f) => f.id !== phoneId) });
      },

      isFavorite: (phoneId: string) => {
        const { favorites } = get();
        return favorites.some((f) => f.id === phoneId);
      },

      addRating: (phoneId: string, rating: number, comment: string) => {
        const { ratings } = get();
        const existingIndex = ratings.findIndex((r) => r.phoneId === phoneId);
        if (existingIndex >= 0) {
          ratings[existingIndex] = { phoneId, rating, comment };
          set({ ratings: [...ratings] });
        } else {
          set({ ratings: [...ratings, { phoneId, rating, comment }] });
        }
      },

      getRating: (phoneId: string) => {
        const { ratings } = get();
        return ratings.find((r) => r.phoneId === phoneId);
      },
    }),
    {
      name: 'user-store',
    }
  )
);
