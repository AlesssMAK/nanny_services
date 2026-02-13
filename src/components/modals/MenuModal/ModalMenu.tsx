import { createPortal } from 'react-dom';
import css from './ModalMenu.module.css';
import { useEffect } from 'react';
import { useAuthStore } from '../../../service/store/authStore';
import { Link } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import Button from '../../UI/Button';

export interface ModalMenuProps {
  onClose: () => void;
}

const ModalMenu = ({ onClose }: ModalMenuProps) => {
  // const { isAuthenticated, user } = useAuthStore();
  const isAuthenticated = true;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal_container}>
        <div className={css.logo_container}>
          <Logo />
          <button type="button" onClick={onClose} className={css.close_btn}>
            <svg width="24" height="24" className={css.close_btn_icon}>
              <use href="sprite.svg#x"></use>
            </svg>
          </button>
        </div>
        <div className={css.nav_container}>
          {isAuthenticated ? (
            <>
              <nav>
                <ul className={css.nav_list}>
                  <li className={css.nav_list_item}>
                    <Link to="/">Home</Link>
                  </li>
                  <li className={css.nav_list_item}>
                    <Link to="/nannies">Nannies</Link>
                  </li>
                  <li className={css.nav_list_item}>
                    <Link to="/favorites">Favorites</Link>
                  </li>
                </ul>
              </nav>
              <div className={css.btn_container}>
                <div className={css.user_container}>
                  <span className={css.user_avatar}>
                    <svg width="24" height="24" className={css.user_icon}>
                      <use href="/sprite.svg#user"></use>
                    </svg>
                  </span>
                  <p className={css.user_name}>Ilona</p>
                </div>
                <Button className="button button_link" width={124}>
                  Log out
                </Button>
              </div>
            </>
          ) : (
            <>
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
                <Button className="button button_link" width={114}>
                  Log In
                </Button>
                <Button className="button button_link" width={148}>
                  Registration
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalMenu;
