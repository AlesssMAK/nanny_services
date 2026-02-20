import { Link } from 'react-router-dom';
import css from './Home.module.css';

const Home = () => {
  return (
    <main>
      <section className={css.hero}>
        <div className={`${css.page_container} container`}>
          <div className={css.info_container}>
            <h1 className={css.title}>Make Life Easier for the Family:</h1>
            <p className={css.text}>
              Find Babysitters Online for All Occasions
            </p>
            <Link to="/nannies" className={` button button_link ${css.link}`}>
              Get started
              <svg width="14" height="18" className={css.arrow_icom}>
                <use href="/sprite.svg#arrow"></use>
              </svg>
            </Link>
          </div>
          <div className={css.img_container}>
            <div className={css.block_container}>
              <span className={css.check_container}>
                <svg width="30" height="30" className={css.check_icon}>
                  <use href="sprite.svg#check"></use>
                </svg>
              </span>
              <div className={css.text_container}>
                <h3 className={css.block_title}>Experienced nannies</h3>
                <p className={css.block_text}>15,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
