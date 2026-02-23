import { useState } from 'react';
import type { Nanny, SortOption } from '../../types/nanny';
import css from './Filter.module.css';

interface FilterProps {
  onChange: (option: SortOption) => void;
  nannies?: Nanny[];
  setFilteredNannies?: React.Dispatch<React.SetStateAction<Nanny[]>>;
}

const FILTERS: { label: string; value: SortOption }[] = [
  { label: 'A to Z', value: 'alphabet-asc' },
  { label: 'Z to A', value: 'alphabet-desc' },
  { label: 'Less then $10', value: 'price-less-10' },
  { label: 'Greater then $10', value: 'price-more-10' },
  { label: 'Popular', value: 'popular' },
  { label: 'Not popular', value: 'not-popular' },
  { label: 'Show All', value: 'all' },
];

const Filter = ({ onChange }: FilterProps) => {
  const [selected, setSelected] = useState<SortOption>('alphabet-asc');
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  const handleSelect = (option: SortOption) => {
    setSelected(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={css.filter_container}>
      <p className={css.filter_name}>Filters</p>
      <div className={css.btn_container}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={css.filter_btn}
        >
          {FILTERS.find(f => f.value === selected)?.label}
          <svg
            width="20"
            height="20"
            className={`${css.chevron_icon} ${isOpen ? css.open_chevron_icon : ''}`}
            aria-label="arrow"
          >
            <use href="sprite.svg#chevron"></use>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className={css.filter_menu}>
          <ul className={css.filters_list}>
            {FILTERS.map(f => (
              <li className={css.filters_list_item} key={f.value}>
                <button
                  className={css.filters_list_item_btn}
                  type="button"
                  key={f.value}
                  onClick={() => handleSelect(f.value)}
                >
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filter;
