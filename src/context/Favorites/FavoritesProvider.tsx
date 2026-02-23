import { useEffect, useState } from 'react';
import { useAuth } from '../Auth/useAuth';
import {
  getFavoriteIds,
  toggleFavorite,
} from '../../service/firebase/favorites.service';
import { FavoritesContext } from './FavoritesContext';

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!userId) {
        setFavoriteIds([]);
        return;
      }
      const ids = await getFavoriteIds(userId);
      setFavoriteIds(ids);
    };
    load();
  }, [userId]);

  const toggle = async (nannyId: string, isFavorite: boolean) => {
    if (!userId) return;

    await toggleFavorite(userId, nannyId, isFavorite);

    setFavoriteIds(prev =>
      isFavorite ? prev.filter(id => id !== nannyId) : [...prev, nannyId]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
};
