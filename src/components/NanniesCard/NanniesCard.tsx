import { useState } from 'react';
import type { Nanny } from '../../types/nanny';
import css from './NanniesCard.module.css';
import Button from '../UI/Button/Button';

interface NanniesCardProps {
  nanny: Nanny;
  setOnSelectNanny: (nanny: Nanny) => void;
  isFavorite: boolean;
  onToggleFavorite: () => Promise<void>;
}

const NanniesCard = ({
  nanny,
  setOnSelectNanny,
  isFavorite,
  onToggleFavorite,
}: NanniesCardProps) => {
  const [isShow, setIsShow] = useState(false);

  const calcAge = (birthday: string) => {
    const birthdayDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthdayDate.getFullYear();
    const month = today.getMonth() - birthdayDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthdayDate.getDate()))
      age--;
    return age;
  };

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

      {/* ------- info ------- */}
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
            <button
              type="button"
              className={`${css.heart_btn} ${isFavorite ? css.active : ''}`}
              onClick={onToggleFavorite}
            >
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

        {/* ------- profile ------- */}
        <ul className={css.profile_list}>
          <li className={css.profile_item_list}>
            <p className={css.profile_item_text}>
              Age:{' '}
              <span
                className={`${css.profile_item_details} ${css.profile_item_age_details}`}
              >
                {calcAge(nanny.birthday)}
              </span>
            </p>
          </li>
          <li className={css.profile_item_list}>
            <p className={css.profile_item_text}>
              Experience:{' '}
              <span className={css.profile_item_details}>
                {nanny.experience}
              </span>
            </p>
          </li>
          <li className={css.profile_item_list}>
            <p className={css.profile_item_text}>
              Kids Age:{' '}
              <span className={css.profile_item_details}>{nanny.kids_age}</span>
            </p>
          </li>
          <li className={css.profile_item_list}>
            <p className={css.profile_item_text}>
              Characters:{' '}
              <span className={css.profile_item_details}>
                {nanny.characters.join(', ')}
              </span>
            </p>
          </li>
          <li className={css.profile_item_list}>
            <p className={css.profile_item_text}>
              Education:{' '}
              <span className={css.profile_item_details}>
                {nanny.education}
              </span>
            </p>
          </li>
        </ul>

        {/* ------- about ------- */}
        <p className={`${css.about_text} ${isShow ? css.add_margin : ''}`}>
          {nanny.about}
        </p>

        {/* ------- reviews ------- */}
        <button
          type="button"
          onClick={() => {
            setIsShow(true);
          }}
          className={`${css.read_more_btn} ${isShow ? css.hidden : ''}`}
        >
          Read more
        </button>

        {isShow && (
          <div className={css.reviews_block_container}>
            <div className={css.reviews_container}>
              {nanny.reviews.map(review => (
                <div className={css.review_container}>
                  <div className={css.reviewer_container}>
                    <div className={css.reviewer_avatar}>
                      {review.reviewer.charAt(0).toUpperCase()}
                    </div>
                    <div className={css.user_review_container}>
                      <p className={css.reviewer_name}>{review.reviewer}</p>
                      <div className={css.review_rating_container}>
                        <svg
                          width="16"
                          height="26"
                          className={css.review_rating_icon}
                          aria-label="star"
                        >
                          <use href="sprite.svg#star"></use>
                        </svg>
                        <p className={css.reviewer_rating}>{review.rating}</p>
                      </div>
                    </div>
                  </div>
                  <p className={css.reviewer_comment}>{review.comment}</p>
                </div>
              ))}
            </div>
            <Button
              type="button"
              className="button"
              width={215}
              onClick={() => {
                setOnSelectNanny(nanny);
              }}
            >
              Make an appointment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NanniesCard;
