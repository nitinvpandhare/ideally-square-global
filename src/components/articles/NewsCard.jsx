import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/formatDate';
import newsCardStyles from './NewsCard.module.css';

const NewsCard = ({ newsItem, index }) => {
  return (
    <motion.article
      className={newsCardStyles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/news/${newsItem.slug}`} className={newsCardStyles.cardLink}>
        <div className={newsCardStyles.imageWrapper}>
          <img src={newsItem.image} alt={newsItem.title} loading="lazy" />
        </div>
        <div className={newsCardStyles.content}>
          <span className={newsCardStyles.categoryTag}>
            {newsItem.category} <span className={newsCardStyles.chevron}>&rsaquo;</span>
          </span>
          <h3 className={newsCardStyles.cardTitle}>{newsItem.title}</h3>
          <p className={newsCardStyles.excerpt}>{newsItem.excerpt}</p>
          <div className={newsCardStyles.meta}>
            <span>{formatDate(newsItem.date)}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default NewsCard;

