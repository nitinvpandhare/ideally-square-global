import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { newsItems } from '../../../data/mockData';
import styles from './HomeNewsSection.module.css';

const cardReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
};

const HomeNewsSection = () => {
  const latestNews = newsItems[0];
  const displayed = newsItems.slice(1, 5);

  if (!latestNews) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>News</h2>
          <span className={styles.rule} />
          <Link to="/news" className={styles.viewMore}>View More &rarr;</Link>
        </motion.div>

        {/* Merged NewsSection half layout */}
        <motion.section
          className={styles.newsHalfSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.newsInner}>
            {/* Left — news image */}
            <motion.div
              className={styles.imageSide}
              initial={{ opacity: 0, x: -40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className={styles.featuredCategory}>{latestNews.category} <span className={styles.chevron}>&rsaquo;</span></span>
              <motion.div
                className={styles.imageFrame}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <img src={latestNews.image} alt={latestNews.title} className={styles.imageImg} loading="lazy" />
              </motion.div>
            </motion.div>

            {/* Right — text */}
            <motion.div
              className={styles.textSide}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              <motion.span
                className={styles.label}
                initial={{ letterSpacing: '0.1em' }}
                whileInView={{ letterSpacing: '0.4em' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                LATEST NEWS
              </motion.span>
              <motion.h2
                className={styles.heading2}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {latestNews.title}
              </motion.h2>
              <motion.p
                className={styles.excerpt}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {latestNews.excerpt}
              </motion.p>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link to={`/news/${latestNews.slug}`} className={styles.readMore}>
                  Read More →
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {displayed.map((item, i) => (
            <motion.article
              key={item.id}
              className={styles.card}
              {...cardReveal}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <span className={styles.category}>{item.category} <span className={styles.chevron}>&rsaquo;</span></span>
              <Link to={`/news/${item.slug}`} className={styles.imageLink}>
                <motion.div
                  className={styles.imgWrap}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
                </motion.div>
              </Link>
              <div className={styles.cardBody}>
                <Link to={`/news/${item.slug}`} className={styles.titleLink}>
                  <motion.h3
                    className={styles.title}
                    whileHover={{ color: 'var(--color-gold)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.title}
                  </motion.h3>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeNewsSection;
