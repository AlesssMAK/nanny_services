import css from './Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div>
      <Link to="/" className={css.logo}>
        Nanny.Services
      </Link>
    </div>
  );
};

export default Logo;
