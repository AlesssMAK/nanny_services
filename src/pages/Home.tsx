import { Link } from 'react-router-dom';
import css from './Home.module.css';

const Home = () => {
  return (
    <main>
      <section className={css.section}>
        <div className={`${css.page_container} container`}>
          <div className={css.info_container}>
            <h1 className={css.title}>Make Life Easier for the Family:</h1>
            <p className={css.text}>
              Find Babysitters Online for All Occasions
            </p>
            <Link to="/nannies" className={css.link}>
              Get started
            </Link>
          </div>
          <div className={css.img_container}></div>
        </div>
      </section>
    </main>
  );
};

export default Home;
