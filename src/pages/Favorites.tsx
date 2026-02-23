import { useState } from 'react';
import AppointmentForm from '../components/forms/AppointmentForm/AppointmentForm';
import NanniesCard from '../components/NanniesCard/NanniesCard';
import Button from '../components/UI/Button/Button';
import { useFavorites } from '../context/Favorites/useFavorites';
import { useNannies } from '../context/Nannies/useNannies';
import css from './Pages.module.css';

const Favorites = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { nannies } = useNannies();
  const { favoriteIds, toggle } = useFavorites();
  const favoriteNannies = nannies.filter(nanny =>
    favoriteIds.includes(nanny.id)
  );

  console.log(favoriteNannies);

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className={css.nannies_page_container}>
            {favoriteNannies.map(nanny => {
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
            <Button type="button" className="button" width={159}>
              Load more
            </Button>
          </div>
        </div>
        {isOpen && <AppointmentForm onClose={() => setIsOpen(false)} />}
      </section>
    </main>
  );
};

export default Favorites;
