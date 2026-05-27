import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { magazines as allMagazines } from '../../../data/mockData';
import PdfThumbnail from '../../magazines/PdfThumbnail';
import styles from './MagazinesGrid.module.css';

const CATEGORY_LABELS = {
  'cover-story': 'Cover Story',
  feature: 'Feature',
  'special-edition': 'Special Edition',
  'upcoming-issue': 'Upcoming Issue',
};

const getVisibleCount = () => {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
};

const MagazinesGrid = ({ magazines = allMagazines, showHeader = true }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(getVisibleCount());
  const [paused, setPaused] = useState(false);

  const [loopIndex, setLoopIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const trackRef = useRef(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  const total = magazines.length;
  const maxIdx = Math.max(0, total - visible);

  const visibleSafe = Math.max(1, visible);
  // Only clone when there are more items than visible slides.
  // This avoids duplicated cards when the filtered set is smaller than the carousel width.
  const shouldClone = total > visible;
  const cloneCount = shouldClone ? Math.min(total, visible) : 0;

  const items = shouldClone
    ? [
        ...magazines.slice(total - cloneCount, total),
        ...magazines,
        ...magazines.slice(0, cloneCount),
      ]
    : magazines;

  const baseIndex = shouldClone ? cloneCount : 0;


  const realCenterIndex =
    total > 0 ? ((loopIndex % total) + total) % total : 0;

  useEffect(() => {
    const onResize = () => {
      setVisible(getVisibleCount());
      setIndex(0);
      setLoopIndex(0);
      setIsJumping(false);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const prev = useCallback(() => {
    setIsJumping(false);
    setLoopIndex((i) => i - 1);
  }, []);

  const next = useCallback(() => {
    setIsJumping(false);
    setLoopIndex((i) => i + 1);
  }, []);

  // autoplay
  useEffect(() => {
    if (paused || total <= visible) return;

    const id = setInterval(() => {
      setLoopIndex((i) => i + 1);
    }, 3500);

    return () => clearInterval(id);
  }, [paused, total, visible]);

  // LOOP FIX (IMPORTANT)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleEnd = () => {
      if (loopIndex >= total) {
        setIsJumping(true);
        setLoopIndex(0);
      }

      if (loopIndex < 0) {
        setIsJumping(true);
        setLoopIndex(total - 1);
      }
    };

    track.addEventListener('transitionend', handleEnd);
    return () => track.removeEventListener('transitionend', handleEnd);
  }, [loopIndex, total]);

  // remove jump transition glitch
  useEffect(() => {
    if (isJumping) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsJumping(false);
        });
      });
    }
  }, [isJumping]);

  const onPointerDown = (e) => {
    touchStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    isDragging.current = true;
    setPaused(true);
  };

  const onPointerUp = (e) => {
    if (!isDragging.current) return;

    touchEndX.current =
      e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;

    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) next();
    if (diff < -50) prev();

    isDragging.current = false;
    setPaused(false);
  };

  if (total === 0) return null;

  const slideWidthPct = 100 / visibleSafe;

  const translateX =
    -(baseIndex + loopIndex) * slideWidthPct;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {showHeader && (
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className={styles.sectionLabel}>EDITIONS</span>
            <h2 className={styles.title}>Featured Magazines</h2>
            <p className={styles.subtitle}>
              Celebrating visionary leaders and industry-defining stories
            </p>
          </motion.div>
        )}

        <div
          className={styles.carouselWrap}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            isDragging.current = false;
          }}
        >
          {/* Prev */}
          <button
            className={styles.arrow}
            onClick={prev}
            aria-label="Previous"
          >
            ◀
          </button>

          {/* Track */}
          <div
            className={styles.trackOuter}
            onMouseDown={onPointerDown}
            onMouseUp={onPointerUp}
            onTouchStart={onPointerDown}
            onTouchEnd={onPointerUp}
          >
            <div
              ref={trackRef}
              className={styles.track}
              style={{
                transform: `translateX(${translateX}%)`,
                transition: isJumping
                  ? 'none'
                  : 'transform 0.5s ease',
              }}
            >
              {items.map((magazine, i) => {
                const center =
                  baseIndex + loopIndex;

                const dist = Math.abs(i - center);

                const isCenter = dist === 0;
                const isSide = dist === 1;

                const scale = isCenter ? 1 : isSide ? 0.88 : 0.78;
                const opacity = isCenter ? 1 : isSide ? 0.72 : 0.45;

                return (
                  <div
                    key={`${magazine.id}-${i}`}
                    className={styles.slide}
                    style={{ width: `${slideWidthPct}%` }}
                  >
                    <div
                      className={styles.slideInner}
                      style={{
                        transform: `scale(${scale})`,
                        opacity,
                        transition:
                          'transform 0.45s ease, opacity 0.45s ease',
                      }}
                    >
                      <Link
                        to={magazine.category === 'upcoming-issue' ? undefined : `/magazines/${magazine.slug}`}
                        aria-disabled={magazine.category === 'upcoming-issue' ? 'true' : 'false'}
                        onClick={(e) => {
                          if (magazine.category === 'upcoming-issue') e.preventDefault();
                        }}
                        className={`${styles.card} ${magazine.category === 'upcoming-issue' ? styles.cardDisabled : ''}`}
                        draggable={false}
                      >
                        <div className={styles.imageWrapper}>
                          {magazine.pdfUrl ? (
                            <PdfThumbnail
                              pdfUrl={magazine.pdfUrl}
                              width={340}
                            />
                          ) : (
                            <img
                              src={magazine.image}
                              alt={magazine.title}
                              loading="lazy"
                              draggable={false}
                            />
                          )}

                          <div className={styles.overlay}>
                            <span className={styles.viewBtn}>
                              VIEW ISSUE
                            </span>
                          </div>

                          {magazine.category && (
                            <span className={styles.badge}>
                              {CATEGORY_LABELS[
                                magazine.category
                              ] || magazine.category}
                            </span>
                          )}
                        </div>

                        <div className={styles.info}>
                          <p className={styles.issueTag}>
                            {magazine.subtitle || 'ISSUE'}
                          </p>
                          <h3 className={styles.cardTitle}>
                            {magazine.title}
                          </h3>

                          {magazine.description && (
                            <p className={styles.cardDesc}>
                              {magazine.description}
                            </p>
                          )}

                          <span className={styles.readMore}>
                            Read Issue →
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next */}
          <button
            className={styles.arrow}
            onClick={next}
            aria-label="Next"
          >
            ▶
          </button>
        </div>

        {/* Dots */}
        {total > 1 && (
          <div className={styles.dots}>
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${
                  i === realCenterIndex
                    ? styles.dotActive
                    : ''
                }`}
                onClick={() => {
                  setIsJumping(false);
                  setLoopIndex(i);
                }}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default MagazinesGrid;