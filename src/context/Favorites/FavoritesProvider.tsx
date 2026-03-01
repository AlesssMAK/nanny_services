import { useEffect, useState } from 'react';
import { useAuth } from '../Auth/useAuth';
import {
  getFavoriteIds,
  toggleFavorite,
} from '../../service/firebase/favorites.service';
import { FavoritesContext } from './FavoritesContext';
import { toast } from 'react-toastify';

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
    if (!userId) {
      toast.error('You need to log in to add this to favorites.');
      return;
    }

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
