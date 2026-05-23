import { motion } from 'framer-motion';
import styles from './CoverStory.module.css';

const CoverStory = ({ magazine }) => {
  if (!magazine) return null;

  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.inner}>
        <img
          src={magazine.image}
          alt={magazine.title}
          className={styles.image}
        />
        <div>
          <span className={styles.label}>FEATURED COVER STORY</span>
          <h2 className={styles.title}>{magazine.title}</h2>
          <p className={styles.summary}>
            {magazine.summary ||
              'An exclusive look at the leaders and visionaries shaping the future of global business.'}
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default CoverStory;
