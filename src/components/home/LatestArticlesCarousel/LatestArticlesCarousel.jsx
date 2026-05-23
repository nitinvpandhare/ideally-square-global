import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../../../data/mockData';
import styles from './LatestArticlesCarousel.module.css';

const total = articles.length;

// Which slot (0-based) gets the zoom treatment
const FEATURED_SLOT = 1;

const getVisibleCount = () => {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 960) return 2;
  return 4;
};

const slotScale   = (slot, n) => {
  if (n <= 1) return 1;
  const d = Math.abs(slot - FEATURED_SLOT);
  return d === 0 ? 1.10 : d === 1 ? 0.94 : 0.84;
};
const slotOpacity = (slot, n) => {
  if (n <= 1) return 1;
  const d = Math.abs(slot - FEATURED_SLOT);
  return d === 0 ? 1 : d === 1 ? 0.80 : 0.55;
};

const LatestArticlesCarousel = () => {
  const [start,   setStart]   = useState(0);
  const [visible, setVisible] = useState(getVisibleCount);
  const [paused,  setPaused]  = useState(false);
  const touchX = useRef(0);

  /* ── Resize ── */
  useEffect(() => {
    const onResize = () => setVisible(getVisibleCount());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Navigation ── */
  const prev = useCallback(() => setStart(s => ((s - 1) + total) % total), []);
  const next = useCallback(() => setStart(s => (s + 1) % total), []);

  /* ── Auto-play ── */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next, paused]);

  /* ── Derive shown cards ── */
  const count = Math.min(visible, total);
  const shown = Array.from({ length: count }, (_, i) => ({
    art:  articles[(start + i) % total],
    slot: i,
  }));

  // Which article the active dot tracks (the featured slot)
  const activeDotIdx = (start + Math.min(FEATURED_SLOT, count - 1)) % total;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.heading}>Latest Articles</h2>
            <Link to="/articles" className={styles.viewMore}>View More &rsaquo;&rsaquo;</Link>
          </div>
          <div className={styles.accentLine} />
          <span className={styles.hashTag}>#LatestArticles</span>
        </div>

        {/* ── Carousel ── */}
        <div
          className={styles.carouselWrap}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchX.current - e.changedTouches[0].clientX;
            if (diff > 40)  next();
            if (diff < -40) prev();
          }}
        >
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className={styles.track}>
            {shown.map(({ art, slot }) => (
              <motion.div
                key={art.id}
                className={styles.slide}
                animate={{
                  scale:   slotScale(slot, count),
                  opacity: slotOpacity(slot, count),
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              >
                <Link
                  to={`/articles/${art.slug}`}
                  className={`${styles.card} ${slot === FEATURED_SLOT ? styles.cardFeatured : ''}`}
                >
                  <div className={styles.imgWrap}>
                    <img src={art.image} alt={art.title} loading="lazy" />
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{art.title}</h3>
                    <p className={styles.cardExcerpt}>{art.excerpt}</p>
                    <span className={styles.readMore}>Read More &rarr;</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        {/* ── Dots ── */}
        <div className={styles.dots}>
          {articles.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeDotIdx ? styles.dotActive : ''}`}
              onClick={() => setStart(((i - FEATURED_SLOT) + total) % total)}
              aria-label={`Article ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LatestArticlesCarousel;
