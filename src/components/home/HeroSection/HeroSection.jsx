import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { leaderQuotes } from '../../../data/quotes';
import styles from './HeroSection.module.css';

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * 6,
}));

const WORDS = ['Leaders.', 'Innovators.', 'Visionaries.', 'Founders.'];

const HeroSection = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [wordIndex, setWordIndex]        = useState(0);
  const [displayed, setDisplayed]        = useState('');
  const [deleting, setDeleting]          = useState(false);
  const typingRef = useRef(null);

  /* ── Typewriter ── */
  useEffect(() => {
    const word  = WORDS[wordIndex];
    const speed = deleting ? 60 : 100;
    typingRef.current = setTimeout(() => {
      if (!deleting) {
        setDisplayed(word.slice(0, displayed.length + 1));
        if (displayed.length + 1 === word.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setDisplayed(word.slice(0, displayed.length - 1));
        if (displayed.length === 0) {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % WORDS.length);
        }
      }
    }, speed);
    return () => clearTimeout(typingRef.current);
  }, [displayed, deleting, wordIndex]);

  /* ── Quote + background cycle ── */
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentQuote((p) => (p + 1) % leaderQuotes.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.hero}>

      {/* ── Background image carousel ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentQuote}
          className={styles.bgLayer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <img
            src={leaderQuotes[currentQuote].image}
            alt=""
            className={styles.bgImg}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay to keep text legible */}
      {/* <div className={styles.bgOverlay} /> */}

      {/* Orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Particles */}
      <div className={styles.particles}>
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className={styles.particle}
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -30, 0], opacity: [0.12, 0.45, 0.12] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* <div className={styles.gridOverlay} /> */}

      {/* ── Main content ── */}
      <div className={styles.container}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          GLOBAL BUSINESS INTELLIGENCE
        </motion.span>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Insights That Shape
          <br />
          <span className={styles.titleAccent}>
            {displayed}
            <span className={styles.cursor} />
          </span>
        </motion.h1>

        {/* <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          Research-backed leadership stories, sector intelligence, and strategic
          perspectives for founders and decision-makers.
        </motion.p> */}

        {/* <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          <Link to="/magazines" className={styles.ctaPrimary}>
            <span>Explore Magazines</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link to="/about-us" className={styles.ctaSecondary}>Our Story</Link>
        </motion.div> */}

        {/* ── Quote carousel ── */}
        <motion.div
          className={styles.quoteWrap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <div className={styles.quoteLine} />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className={styles.quote}
            >
              <p className={styles.quoteText}>"{leaderQuotes[currentQuote].quote}"</p>
              <p className={styles.quoteAuthor}>— {leaderQuotes[currentQuote].author}</p>
            </motion.div>
          </AnimatePresence>
          <div className={styles.dots}>
            {leaderQuotes.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === currentQuote ? styles.dotActive : ''}`}
                onClick={() => setCurrentQuote(i)}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
