import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { leaderQuotes } from '../../../data/quotes';
import styles from './HeroSection.module.css';

const QuoteCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % leaderQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.quoteContainer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={styles.quote}
        >
          <p className={styles.quoteText}>
            "{leaderQuotes[current].quote}"
          </p>
          <p className={styles.quoteAuthor}>
            — {leaderQuotes[current].author}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className={styles.dots}>
        {leaderQuotes.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Quote ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default QuoteCarousel;
