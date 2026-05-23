import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { articles, categories } from '../../data/mockData';
import { formatDate } from '../../utils/formatDate';
import CategoryBadge from '../../components/articles/CategoryBadge';
import ArticleDetail from '../../components/articles/ArticleDetail';
import styles from './ArticleDetailPage.module.css';





const ArticleDetailPage = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Article not found</h1>
        <Link to="/articles" className={styles.backLinkNotFound}>&larr; Back to Articles</Link>
      </div>
    );
  }

  // Same-category first, then fill with most-recent others
  const sameCategory = articles.filter(
    (a) => a.category === article.category && a.id !== article.id,
  );
  const others = articles
    .filter((a) => a.category !== article.category && a.id !== article.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const related = [...sameCategory, ...others].slice(0, 5);

  const getCategoryName = (catId) =>
    categories.find((c) => c.id === catId)?.name ?? catId;

  return (
    <>
      <Helmet>
        <title>{article.title} | iSG</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <motion.div
        className={styles.page}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className={styles.pageInner}>
          {/* ── Main content ── */}
          <article className={styles.mainContent}>
            <Link to="/articles" className={styles.backLink}>&larr; Back to Articles</Link>

            <CategoryBadge category={article.category} />

            <h1 className={styles.title}>{article.title}</h1>


            {/* <div className={styles.date}>
              {formatDate(article.date)}
              {article.readTime && (
                <>
                  {' '}· {' '}
                  <span className={styles.readTime}>{article.readTime}</span>
                </>
              )}
            </div> */}


            {/* <p className={styles.excerptHeader}>{article.excerpt}</p> */}

            <hr className={styles.divider} />

            {/* Full-width hero image */}
            <div className={styles.heroWrap}>
              <img
                src={article.image}
                alt={article.title}
                className={styles.heroImg}
              />
            </div>


            {/* Article body (header suppressed) */}
            <ArticleDetail article={article} showHeader={false} />
          </article>



          {/* ── Related articles sidebar ── */}
          <aside className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Related Articles</h3>

            {related.map((rel, i) => (
              <motion.div
                key={rel.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link to={`/articles/${rel.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedImgWrap}>
                    <img src={rel.image} alt={rel.title} loading="lazy" />
                  </div>
                  <div className={styles.relatedBody}>
                    <span className={styles.relatedCategory}>
                      {getCategoryName(rel.category)}
                    </span>
                    <h4 className={styles.relatedTitle}>{rel.title}</h4>
                    {/* <p className={styles.relatedDate}>{formatDate(rel.date)}</p> */}
                  </div>
                </Link>
              </motion.div>
            ))}

            <Link to="/articles" className={styles.viewAllLink}>
              View all articles &rarr;
            </Link>
          </aside>
        </div>
      </motion.div>
    </>
  );
};

export default ArticleDetailPage;
