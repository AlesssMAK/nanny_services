import { useEffect, useState } from 'react';
import AppointmentForm from '../components/forms/AppointmentForm/AppointmentForm';
import NanniesCard from '../components/NanniesCard/NanniesCard';
import Button from '../components/UI/Button/Button';
import { useFavorites } from '../context/Favorites/useFavorites';
import { useNannies } from '../context/Nannies/useNannies';
import css from './Pages.module.css';
import Filter from '../components/Filter/Filter';
import { filterNannies } from '../utils/nanny.utils';
import type { Nanny, SortOption } from '../types/nanny';
import Loader from '../components/Loader/Loader';
import NoFound from '../components/NoFound/NoFound';

const PER_PAGE = 3;

const Favorites = () => {
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);
  const [currentFilter, setCurrentFilter] = useState<SortOption>('all');
  const [filteredNannies, setFilteredNannies] = useState<Nanny[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [onSelectNanny, setOnSelectNanny] = useState<Nanny | null>(null);

  const { nannies, loading, error } = useNannies();
  const { favoriteIds, toggle } = useFavorites();
  const favoriteNannies = nannies.filter(nanny =>
    favoriteIds.includes(nanny.id)
  );

  useEffect(() => {
    const order = filterNannies(favoriteNannies, currentFilter);
    const pagination = () => {
      setFilteredNannies(order.slice(0, visibleCount));
    };
    pagination();
  }, [favoriteNannies, currentFilter, visibleCount]);

  const handleFilterChange = (option: SortOption) => {
    setCurrentFilter(option);
    setVisibleCount(PER_PAGE);
  };

  const loadMore = () => {
    setIsLoadingMore(true);
    setVisibleCount(prev => prev + PER_PAGE);
    setIsLoadingMore(false);
  };
  const hasMore =
    filteredNannies.length <
    filterNannies(favoriteNannies, currentFilter).length;

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className={css.nannies_page_container}>
            <Filter onChange={handleFilterChange} />

            {error && (
              <NoFound
                title="Server Error"
                message="We couldn’t load the nannies. Please try again later."
              />
            )}

            {!error && !loading && favoriteNannies.length === 0 && (
              <NoFound
                title="No Favorite Nannies Found"
                message="Save nannies to your favorites to quickly find them later."
              />
            )}

            {!error &&
              !loading &&
              favoriteNannies.length > 0 &&
              filteredNannies.length === 0 && (
                <NoFound
                  title="No Matches Found"
                  message="Your filters didn’t match any nannies."
                />
              )}

            {!error && (
              <>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {filteredNannies.map(nanny => {
                      const isFav = favoriteIds.includes(nanny.id);
                      return (
                        <NanniesCard
                          key={nanny.id}
                          nanny={nanny}
                          isFavorite={isFav}
                          onToggleFavorite={() => toggle(nanny.id, isFav)}
                          setOnSelectNanny={() => setOnSelectNanny(nanny)}
                        />
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
          <div className={css.btn_container}>
            {hasMore && (
              <Button
                type="button"
                className="button"
                width={159}
                onClick={loadMore}
              >
                {isLoadingMore ? 'Loading...' : 'Load more'}
              </Button>
            )}
          </div>
        </div>
        {onSelectNanny && (
          <AppointmentForm
            onClose={() => setOnSelectNanny(null)}
            nanny={onSelectNanny}
          />
        )}
      </section>
    </main>
  );
};

export default Favorites;
