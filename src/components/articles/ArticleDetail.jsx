import { motion } from 'framer-motion';
import { formatDateLong } from '../../utils/formatDate';
import CategoryBadge from './CategoryBadge';
import styles from './ArticleDetail.module.css';

const ArticleDetail = ({ article, showHeader = true }) => {
  if (!article) return null;

  return (
    <motion.article
      className={styles.article}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.inner}>
        {showHeader && (
          <>
            <CategoryBadge category={article.category} />

            <h1 className={styles.title}>{article.title}</h1>

            <div className={styles.meta}>
              <span>By {article.author}</span>
              <span className={styles.metaDot}>·</span>
              <span>{formatDateLong(article.date)}</span>
            </div>

            {article.image && (
              <img src={article.image} alt={article.title} className={styles.image} />
            )}
          </>
        )}

        {/* ── Sectioned article (has sections array) ── */}
        {article.sections ? (
          <div className={styles.body}>
            <p className={styles.excerpt}>{article.excerpt}</p>
            {article.leadParagraph && (
              <>
                <p className={styles.lead}>{article.leadParagraph}</p>
              </>
            )}



            {article.sections.map((section, i) => (
              <div key={i} className={styles.section}>
                <h2 className={styles.sectionHeading}>{section.heading}</h2>
                {section.body.split('\n\n').map((para, j) => (
                  <p key={j} className={styles.para}>{para}</p>
                ))}
              </div>
            ))}

            {article.conclusion && (
              <div className={styles.section}>
                <h2 className={styles.sectionHeading}>Conclusion</h2>
                {article.conclusion.split('\n\n').map((para, j) => (
                  <p key={j} className={styles.para}>{para}</p>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── Plain body fallback ── */
          <div className={styles.body}>
            <p className={styles.excerpt}>{article.excerpt}</p>
            {article.body && <p>{article.body}</p>}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ArticleDetail;

