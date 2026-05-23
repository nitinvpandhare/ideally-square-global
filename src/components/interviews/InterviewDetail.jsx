import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatDateLong } from '../../utils/formatDate';
import { interviews } from '../../data/mockData';
import styles from './InterviewDetail.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: 'easeOut' },
});

const InterviewDetail = ({ interview }) => {
  if (!interview) return null;

  const related = interviews.filter((i) => i.id !== interview.id).slice(0, 3);

  return (
    <article className={styles.page}>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroBg}>
          {interview.image && (
            <img src={interview.image} alt={interview.name} className={styles.heroBgImg} />
          )}
          <div className={styles.heroBgOverlay} />
        </div>

        <div className={styles.heroContent}>
          <motion.div className={styles.heroInner} {...fadeUp(0.2)}>
            <Link to="/exclusive-interviews" className={styles.backLink}>
              ← Back to Exclusives
            </Link>
            <span className={styles.heroLabel}>iSG EXCLUSIVE</span>
            <h1 className={styles.heroName}>{interview.name}</h1>
            <p className={styles.heroRole}>{interview.role}</p>
            {interview.date && (
              <p className={styles.heroDate}>{formatDateLong(interview.date)}</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Profile strip ──────────────────────────────────────────── */}
      <div className={styles.profileStrip}>
        <div className={styles.profileStripInner}>
          <motion.div
            className={styles.avatarWrap}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img src={interview.image} alt={interview.name} className={styles.avatar} />
          </motion.div>
          <motion.div className={styles.profileMeta} {...fadeUp(0.4)}>
            <h2 className={styles.profileName}>{interview.name}</h2>
            <p className={styles.profileRole}>{interview.role}</p>
            <div className={styles.socialRow}>
              <a href="/" className={styles.socialBtn} aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a href="/" className={styles.socialBtn} aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                Twitter
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>

          {/* Excerpt / intro */}
          {interview.excerpt && (
            <motion.div className={styles.introBlock} {...fadeUp(0.1)}>
              <p className={styles.introText}>{interview.excerpt}</p>
            </motion.div>
          )}

          {/* Divider */}
          <div className={styles.divider} />

          {/* Q&A */}
          <motion.div
            className={styles.qa}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {interview.questions?.length > 0 ? (
              interview.questions.map((qa, idx) => (
                <motion.div
                  key={idx}
                  className={styles.qaItem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                >
                  <p className={styles.question}>
                    <span className={styles.qMark}>Q</span>
                    {qa.question}
                  </p>
                  <p className={styles.answer}>{qa.answer}</p>
                </motion.div>
              ))
            ) : (
              <div className={styles.placeholder}>
                <div className={styles.placeholderIcon}>💬</div>
                <p>Full interview content coming soon.</p>
                <p>Connect the <code>questions</code> array in mock data to display the Q&amp;A.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Related profiles ───────────────────────────────────────── */}
      {related.length > 0 && (
        <div className={styles.related}>
          <div className={styles.relatedInner}>
            <div className={styles.relatedHeader}>
              <span className={styles.relatedLabel}>MORE EXCLUSIVES</span>
              <h3 className={styles.relatedTitle}>More Profiles</h3>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link to={`/exclusive-interviews/${item.slug}`} className={styles.relatedCard}>
                    <div className={styles.relatedImgWrap}>
                      <img src={item.image} alt={item.name} loading="lazy" />
                      <div className={styles.relatedOverlay} />
                    </div>
                    <div className={styles.relatedBody}>
                      <span className={styles.relatedTag}>iSG EXCLUSIVE</span>
                      <h4 className={styles.relatedName}>{item.name}</h4>
                      <p className={styles.relatedRole}>{item.role}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default InterviewDetail;
