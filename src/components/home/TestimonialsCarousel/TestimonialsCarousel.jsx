import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TestimonialsCarousel.module.css';

const testimonials = [
  {
    id: 7,
    name: "Dr. Chris E. Stout",
    title: "OUTSTANDING MAGAZINE",
    quote:
      "I’m deeply honored to be featured by Ideally Square Magazine. The piece was thoughtfully written, respectful, and reflective of my work. I appreciate their commitment to intelligent storytelling, editorial integrity, and highlighting meaningful contributions. In a fast-moving media world, they took the time to create something personal and lasting. I’m grateful for their professionalism and fully support their mission to elevate important voices with care and depth.",
  },
  {
    id: 8,
    name: "Ron Klink",
    title: "SPOTLIGHTING INSPIRING STORIES",
    quote:
      "It was a pleasure working with Ideally Square Global. My experience with their team was very coordinated and supportive. Whenever I had questions, they were always there to provide the help I needed. I worked closely with Pradip from the team, and the workflow went smoothly.",
  },
  {
    id: 1,
    name: 'Dr Elie Metri',
    title: 'OUTSTANDING MAGAZINE',
    quote: 'The iSG Magazine is truly outstanding ymagazine with a professional and dedicated team. Their support has helped me showcase my impact across the globe.',
  },
  {
    id: 2,
    name: 'Col Ajai Lal',
    title: 'SPOTLIGHTING INSPIRING STORIES',
    quote: 'I want to extend my heartfelt appreciation to the iSG Magazine team for featuring my story in such a compelling and thoughtful manner. The entire experience was marked by exceptional professionalism, attention to detail, and a genuine commitment to capturing the essence of my journey.',
  },
  {
    id: 3,
    name: 'Dr. Stoyana Natseva',
    title: 'SUPPORT SERVICES ARE EXCELLENT',
    quote: 'I am delighted to be featured in The iSG Magazine. The entire team demonstrated great professionalism from start to end. The coordination was seamless, and the editor beautifully captured my story with depth and authenticity.',
  },
  {
    id: 4,
    name: 'Rajesh Mehta',
    title: 'PREMIUM PUBLISHING EXPERIENCE',
    quote: 'The editorial quality and thought leadership coverage exceeded our expectations. A truly premium publishing partner for organisations serious about brand credibility.',
  },
  {
    id: 5,
    name: 'Priya Sharma',
    title: 'A VOICE THAT RESONATED',
    quote: 'iSG gave our brand a voice that resonated with the right audience. The process was seamless, professional, and the results spoke for themselves.',
  },
  {
    id: 6,
    name: 'Meera Nair',
    title: 'AMPLIFYING EXECUTIVE VOICES',
    // image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=85',
    quote: 'Every interaction with the iSG team was professional and insightful. They truly understand how to amplify executive voices at scale.',
  },
];

const total = testimonials.length;

const getVisibleCount = () => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
};

const TestimonialsCarousel = () => {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(0);

  // Update visible count on resize and reset to first page
  useEffect(() => {
    const onResize = () => {
      const next = getVisibleCount();
      setVisibleCount((prev) => {
        if (prev !== next) setPage(0);
        return next;
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const steps = Math.ceil(total / visibleCount);

  const go = useCallback((next) => {
    setDir(next > page ? 1 : -1);
    setPage(((next % steps) + steps) % steps);
  }, [page, steps]);

  const next = useCallback(() => go(page + 1), [go, page]);
  const prev = useCallback(() => go(page - 1), [go, page]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  const start = page * visibleCount;
  const visible = Array.from({ length: visibleCount }, (_, i) => testimonials[(start + i) % total]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.heading}>Testimonials</h2>
          <span className={styles.rule} />
        </div>

        <div
          className={styles.carouselWrap}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchX.current - e.changedTouches[0].clientX;
            if (diff > 40) next();
            if (diff < -40) prev();
          }}
        >
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className={styles.track}>
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={`${page}-${visibleCount}`}
                custom={dir}
                initial={{ opacity: 0, x: dir > 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir > 0 ? -80 : 80 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className={styles.cardRow}
                style={{ gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))` }}
              >
                {visible.map((t) => (
                  <div key={t.id} className={styles.cardWrap}>
                    <div className={styles.avatarRing}>
                      <div className={styles.avatarInitials} aria-label={t.name}>
                        {t.name
                          .split(' ')
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join('')}
                      </div>
                    </div>
                    <div className={styles.card}>
                      <h4 className={styles.cardTitle}>{t.title}</h4>
                      <p className={styles.quote}>{t.quote}</p>
                      <p className={styles.name}>{t.name}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        <div className={styles.dots}>
          {Array.from({ length: steps }, (_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === page ? styles.dotActive : ''}`}
              onClick={() => go(i)}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsCarousel;
