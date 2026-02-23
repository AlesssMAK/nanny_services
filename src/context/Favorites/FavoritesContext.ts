import { createContext } from 'react';

export interface FavoritesContextValue {
  favoriteIds: string[];
  toggle: (nannyId: string, isFavorite: boolean) => Promise<void>;
}

export const FavoritesContext = createContext<FavoritesContextValue>({
  favoriteIds: [],
  toggle: async () => {},
});
