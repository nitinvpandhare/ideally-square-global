import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { newsItems } from '../../data/mockData';
import styles from './NewsSection.module.css';

const NewsSection = () => {
  const latestNews = newsItems[0];

  if (!latestNews) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Left — news image */}
        <motion.div
          className={styles.imageSide}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className={styles.featuredCategory}>
            {latestNews.category} <span className={styles.chevron}>&rsaquo;</span>
          </span>
          <div className={styles.imageFrame}>
            <img src={latestNews.image} alt={latestNews.title} className={styles.imageImg} loading="lazy" />
          </div>
        </motion.div>

        {/* Right — text */}
        <motion.div
          className={styles.textSide}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <span className={styles.label}>LATEST NEWS</span>
          <h2 className={styles.heading}>{latestNews.title}</h2>
          <p className={styles.excerpt}>{latestNews.excerpt}</p>
          <Link to={`/news/${latestNews.slug}`} className={styles.readMore}>
            Read More →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;

