import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../../../data/mockData';
import { formatDate } from '../../../utils/formatDate';
import styles from './ArticlesSection.module.css';

const ArticleCard = ({ article, index }) => {
  const category = categories.find(c => c.id === article.category);

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/articles/${article.slug}`} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <img src={article.image} alt={article.title} loading="lazy" />
        </div>
        <div className={styles.content}>
          <span className={styles.categoryTag}>{category?.name}</span>
          <h3 className={styles.cardTitle}>{article.title}</h3>
          <p className={styles.excerpt}>{article.excerpt}</p>

          {/* <div className={styles.meta}>
            <span>{article.author}</span>
            <span className={styles.dot}>·</span>
            <span>{formatDate(article.date)}</span>
            {article.readTime && (
              <>
                <span className={styles.dot}>·</span>
                <span>{article.readTime}</span>
              </>
            )}
          </div> */}

        </div>
      </Link>
    </motion.article>
  );
};

export default ArticleCard;

