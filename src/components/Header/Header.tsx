import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import ModalMenu from '../modals/MenuModal/ModalMenu';
import Button from '../UI/Button/Button';
import css from './Header.module.css';
import AuthForm from '../forms/AuthForm/AuthForm';
import { logout } from '../../service/firebase/auth.service';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Auth/useAuth';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogIn, setOpenLogIn] = useState(false);
  const [isOpenRegistration, setOpenRegistration] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const { pathname } = useLocation();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const onLogout = async () => {
    await logout();
  };
  return (
    <header className={pathname === '/' ? css.header_home : css.header}>
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
          {isAuthenticated ? (
            <div className={css.nav_container}>
              <nav>
                <ul className={css.nav_list}>
                  <li className={css.nav_list_item}>
                    <Link
                      to="/"
                      className={`${css.nav_list_item_link} ${
                        isActive('/') ? css.active : ''
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className={css.nav_list_item}>
                    <Link
                      to="/nannies"
                      className={`${css.nav_list_item_link} ${
                        isActive('/nannie') ? css.active : ''
                      }`}
                    >
                      Nannies
                    </Link>
                  </li>
                  <li className={css.nav_list_item}>
                    <Link
                      to="/favorites"
                      className={`${css.nav_list_item_link} ${
                        isActive('/favorites') ? css.active : ''
                      }`}
                    >
                      Favorites
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className={css.user_btn_container}>
                <div className={css.user_container}>
                  <span className={css.user_avatar}>
                    <svg width="24" height="24" className={css.user_icon}>
                      <use href="/sprite.svg#user"></use>
                    </svg>
                  </span>
                  <p className={css.user_name}>{user?.displayName}</p>
                </div>
                <Button
                  className="button button_link auth_button"
                  width={124}
                  onClick={onLogout}
                >
                  Log out
                </Button>
              </div>
            </div>
          ) : (
            <div className={css.nav_container}>
              <nav>
                <ul className={css.nav_list}>
                  <li className={css.nav_list_item}>
                    <Link
                      to="/"
                      className={`${css.nav_list_item_link} ${
                        isActive('/') ? css.active : ''
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className={css.nav_list_item}>
                    <Link
                      to="/nannies"
                      className={`${css.nav_list_item_link} ${
                        isActive('/nannies') ? css.active : ''
                      }`}
                    >
                      Nannies
                    </Link>
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
                  className={
                    pathname === '/'
                      ? 'button auth_button'
                      : 'button button_link auth_button '
                  }
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
