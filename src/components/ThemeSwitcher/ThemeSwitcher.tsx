import { useState } from 'react';
import { useTheme } from '../../context/Theme/useTheme';
import type { Theme } from '../../types/theme';
import css from './ThemeSwitcher.module.css';

const themes: { id: Theme; color: string }[] = [
  { id: 'red', color: '#f03f3b' },
  { id: 'blue', color: '#0957C3' },
  { id: 'green', color: '#103931' },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem('app-theme', theme);
    setIsOpen(false);
  };

  return (
    <div className={css.theme_container}>
      <div className={isOpen ? css.thems : css.hidden}>
        {themes.map(item => (
          <button
            key={item.id}
            className={css.option_btn}
            style={{ backgroundColor: item.color }}
            onClick={() => handleThemeChange(item.id)}
            aria-label={`Switch to ${item.id} theme`}
          >
            {theme === item.id && (
              <svg
                width="30"
                height="30"
                className={css.check_icon}
                aria-hidden="true"
              >
                <use href="/sprite.svg#check" />
              </svg>
            )}
          </button>
        ))}
      </div>
      <button
        className={css.theme_btn}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle theme switcher"
      ></button>
    </div>
  );
};

export default ThemeSwitcher;
