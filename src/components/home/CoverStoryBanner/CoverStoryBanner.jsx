import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { coverStories } from '../../../data/mockData';
import styles from './CoverStoryBanner.module.css';

const CoverStoryBanner = () => {
  const story = [...coverStories].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0];


  if (!story) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left — magazine cover */}
        <motion.div
          className={styles.coverSide}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className={styles.coverFrame}>
            <img src={story.coverImage} alt={story.coverTitle} className={styles.coverImg} loading="lazy" />
            <div className={styles.coverGlow} />
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
          <span className={styles.label}>LATEST COVER STORY</span>
          <h2 className={styles.heading}>{story.coverTitle}</h2>
          <p className={styles.excerpt}>{story.excerpt}</p>
          <Link to={`/exclusive-interviews/${story.slug}`} className={styles.readMore}>
            Read More
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default CoverStoryBanner;
