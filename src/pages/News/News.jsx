import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { newsItems } from '../../data/mockData';
import NewsSection from '../../components/articles/NewsSection';
import NewsList from '../../components/articles/NewsList';
import pageStyles from '../Magazines/Magazines.module.css';
import styles from './News.module.css';

const News = () => {
  const featuredId = newsItems[0]?.id;
  const sortedNews = [...newsItems]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter(item => item.id !== featuredId);

  return (
    <>
      <Helmet>
        <title>News | iSG</title>
      </Helmet>

      <div className={pageStyles.pageHeader}>
        <div className={pageStyles.container}>
          <span className={pageStyles.label}>LATEST</span>
          <h1 className={pageStyles.heading}>News & Updates</h1>
          <p className={pageStyles.description}>
            The latest headlines, breaking stories, and analysis from across the
            business and technology world.
          </p>
        </div>
      </div>

      <NewsSection />

      <section className={styles.section}>
        <div className={styles.container}>
          <NewsList newsItems={sortedNews} />
        </div>
      </section>
    </>
  );
};

export default News;

