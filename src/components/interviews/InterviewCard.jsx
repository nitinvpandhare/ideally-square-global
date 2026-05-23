import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './InterviewCard.module.css';

const InterviewCard = ({ interview, index = 0 }) => {
  if (!interview) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <Link to={`/exclusive-interviews/${interview.slug}`} className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={interview.image} alt={interview.name} className={styles.image} loading="lazy" />
          <div className={styles.overlay}>
            <span className={styles.overlayLabel}>READ PROFILE</span>
          </div>
        </div>
        <div className={styles.body}>
          <span className={styles.label}>iSG EXCLUSIVE</span>
          <h3 className={styles.name}>{interview.name}</h3>
          <p className={styles.role}>{interview.role}</p>
          {interview.excerpt && <p className={styles.excerpt}>{interview.excerpt}</p>}
          <span className={styles.cta}>Read More →</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default InterviewCard;
