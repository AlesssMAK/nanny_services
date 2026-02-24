import { useEffect, useState } from 'react';
import NanniesCard from '../components/NanniesCard/NanniesCard';
import Button from '../components/UI/Button/Button';
import AppointmentForm from '../components/forms/AppointmentForm/AppointmentForm';
import { useFavorites } from '../context/Favorites/useFavorites';
import { useNannies } from '../context/Nannies/useNannies';
import css from './Pages.module.css';
import Filter from '../components/Filter/Filter';
import { filterNannies } from '../utils/nanny.utils';
import type { Nanny, SortOption } from '../types/nanny';

const PER_PAGE = 3;

const Nannies = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);
  const [currentFilter, setCurrentFilter] = useState<SortOption>('all');
  const [filteredNannies, setFilteredNannies] = useState<Nanny[]>([]);

  const { nannies } = useNannies();
  const { favoriteIds, toggle } = useFavorites();

  useEffect(() => {
    const order = filterNannies(nannies, currentFilter);
    const pagination = () => {
      setFilteredNannies(order.slice(0, visibleCount));
    };
    pagination();
  }, [nannies, currentFilter, visibleCount]);

  const handleFilterChange = (option: SortOption) => {
    setCurrentFilter(option);
    setVisibleCount(PER_PAGE);
  };

  console.log(filteredNannies);

  const loadMore = () => setVisibleCount(prev => prev + PER_PAGE);

  const hasMore =
    filteredNannies.length < filterNannies(nannies, currentFilter).length;

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className={css.nannies_page_container}>
            <Filter onChange={handleFilterChange} />
            {filteredNannies.map(nanny => {
              const isFav = favoriteIds.includes(nanny.id);
              return (
                <NanniesCard
                  key={nanny.id}
                  nanny={nanny}
                  isFavorite={isFav}
                  onToggleFavorite={() => toggle(nanny.id, isFav)}
                  onOpen={() => setIsOpen(true)}
                />
              );
            })}
          </div>
          <div className={css.btn_container}>
            {hasMore && (
              <Button
                type="button"
                className="button"
                width={159}
                onClick={loadMore}
              >
                Load more
              </Button>
            )}
          </div>
        </div>
        {isOpen && <AppointmentForm onClose={() => setIsOpen(false)} />}
      </section>
    </main>
  );
};

export default Nannies;
