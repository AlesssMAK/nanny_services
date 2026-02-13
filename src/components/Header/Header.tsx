import { Link } from 'react-router-dom';
import css from './Header.module.css';
import Button from '../UI/Button';
import { useState } from 'react';
import ModalMenu from '../modals/MenuModal/ModalMenu';
import Logo from '../Logo/Logo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <header className={css.header}>
      <div className={`${css.header_container} container`}>
        <div className={css.content_container}>
          <Logo />
          <button
            type="button"
            className={css.btn_menu}
            onClick={open}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <svg width="28" height="28" className={css.menu}>
              <use href="/sprite.svg#menu"></use>
            </svg>
          </button>

          {isOpen && <ModalMenu onClose={close} />}
          <div className={css.nav_container}>
            <nav>
              <ul className={css.nav_list}>
                <li className={css.nav_list_item}>
                  <Link to="/">Home</Link>
                </li>
                <li className={css.nav_list_item}>
                  <Link to="/nannies">Nannies</Link>
                </li>
              </ul>
            </nav>
            <div className={css.btn_container}>
              <Button className="button button_link" width={124}>
                Log In
              </Button>
              <Button className="button" width={168}>
                Registration
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
