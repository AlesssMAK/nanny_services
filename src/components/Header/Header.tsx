import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import ModalMenu from '../modals/MenuModal/ModalMenu';
import Button from '../UI/Button/Button';
import css from './Header.module.css';
import AuthForm from '../forms/AuthForm/AuthForm';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogIn, setOpenLogIn] = useState(false);
  const [isOpenRegistration, setOpenRegistration] = useState(false);

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

          {isOpen && (
            <ModalMenu
              onClose={close}
              openLogin={() => {
                setIsOpen(false);
                setOpenLogIn(true);
              }}
              openRegistration={() => {
                setIsOpen(false);
                setOpenRegistration(true);
              }}
            />
          )}
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
              <Button
                className="button button_link auth_button"
                width={124}
                onClick={() => setOpenLogIn(true)}
              >
                Log In
              </Button>
              <Button
                className="button auth_button"
                width={168}
                onClick={() => setOpenRegistration(true)}
              >
                Registration
              </Button>
            </div>
            {isOpenLogIn && (
              <AuthForm onClose={() => setOpenLogIn(false)} mode="login" />
            )}
            {isOpenRegistration && (
              <AuthForm
                onClose={() => setOpenRegistration(false)}
                mode="registration"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
