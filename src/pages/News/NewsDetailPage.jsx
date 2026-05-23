import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { newsItems } from '../../data/mockData';
import styles from './NewsDetailPage.module.css';

const NewsDetailPage = () => {
  const { slug } = useParams();
  const item = newsItems.find((n) => n.slug === slug);
  const related = newsItems.filter((n) => n.slug !== slug).slice(0, 4);

  if (!item) {
    return (
      <div className={styles.notFound}>
        <h1>News article not found.</h1>
        <Link to="/news" className={styles.backLink}>&larr; Back to News</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{item.title} | iSG</title>
        <meta name="description" content={item.excerpt} />
      </Helmet>

      <motion.div
        className={styles.page}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        {/* Full-width hero image
        <div className={styles.heroWrap}>
          <img src={item.image} alt={item.title} className={styles.heroImg} />
        </div> */}

        {/* Two-column layout */}
        <div className={styles.pageInner}>

          {/* ── Main content ── */}
          <article className={styles.mainContent}>
            <Link to="/news" className={styles.backLink}>&larr; Back to News</Link>

            <span className={styles.category}>{item.category}</span>
            <h1 className={styles.title}>{item.title}</h1>
            {/* <p className={styles.date}>
              {new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p> */}

            <hr className={styles.divider} />

            {/* Full-width hero image */}
            <div className={styles.heroWrap}>
              <img src={item.image} alt={item.title} className={styles.heroImg} />
            </div>

            <p className={styles.excerpt}>{item.excerpt}</p>
            {item.leadParagraph && (
              <p className={styles.lead}>{item.leadParagraph}</p>
            )}

            {item.sections && item.sections.map((section, i) => (
              <div key={i} className={styles.section}>
                <h2 className={styles.sectionHeading}>{section.heading}</h2>
                {section.body.split('\n\n').map((para, j) => (
                  <p key={j} className={styles.para}>{para}</p>
                ))}
              </div>
            ))}

            {item.tags && item.tags.length > 0 && (
              <div className={styles.tags}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}

            {item.originalUrl && (
              <p className={styles.source}>
                Original article:{' '}
                <a
                  href={item.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sourceLink}
                >
                  {item.originalUrl}
                </a>
              </p>
            )}
          </article>

          {/* ── Related news sidebar ── */}
          <aside className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Related News</h3>

            {related.map((rel, i) => (
              <motion.div
                key={rel.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link to={`/news/${rel.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedImgWrap}>
                    <img src={rel.image} alt={rel.title} loading="lazy" />
                  </div>
                  <div className={styles.relatedBody}>
                    <span className={styles.relatedCategory}>{rel.category}</span>
                    <h4 className={styles.relatedTitle}>{rel.title}</h4>
                    {/* <p className={styles.relatedDate}>
                      {new Date(rel.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p> */}
                  </div>
                </Link>
              </motion.div>
            ))}

            <Link to="/news" className={styles.viewAllLink}>View all news &rarr;</Link>
          </aside>

        </div>
      </motion.div>
    </>
  );
};

export default NewsDetailPage;
