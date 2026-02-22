import type { Nanny } from '../../types/nanny';
import css from './NanniesCard.module.css';

interface NanniesCardProps {
  nanny: Nanny;
}

const NanniesCard = ({ nanny }: NanniesCardProps) => {
  console.log(nanny);

  return (
    <div className={css.nanny_container}>
      <div className={css.avatar_container}>
        <img
          src={nanny.avatar_url}
          alt={nanny.name}
          width="96"
          height="96"
          className={css.img}
        />
      </div>
      <div className={css.card_container}>
        <div className={css.name_info_container}>
          <div className={css.name_container}>
            <h3 className={css.name_title}>Nanny</h3>
            <p className={css.name}>{nanny.name}</p>
          </div>
          <div className={css.meta_container}>
            <div className={css.blocks_container}>
              <div className={css.block_item_container}>
                <svg
                  width="16"
                  height="16"
                  className={css.location_icon}
                  aria-label="location"
                >
                  <use href="sprite.svg#map-pin"></use>
                </svg>
                <p className={css.block_text}>{nanny.location}</p>
              </div>
              <span className={css.divider} aria-hidden="true" />
              <div className={css.block_item_container}>
                <svg
                  width="16"
                  height="16"
                  className={css.rating_icon}
                  aria-label="rating"
                >
                  <use href="sprite.svg#star"></use>
                </svg>
                <p className={css.block_text}>Rating: {nanny.rating}</p>
              </div>
              <span className={css.divider} aria-hidden="true" />
              <p className={css.block_text}>
                Price / 1 hour:{' '}
                <span className={css.price}>{nanny.price_per_hour}$</span>
              </p>
            </div>
            <button type="button" className={css.heart_btn}>
              <svg
                width="26"
                height="26"
                className={css.heart_btn_icon}
                aria-label="heart"
              >
                <use href="sprite.svg#heart"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NanniesCard;
