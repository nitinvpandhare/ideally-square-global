import ArticleCard from '../home/ArticlesSection/ArticleCard';
import styles from './RelatedArticles.module.css';

const RelatedArticles = ({ articles = [], limit = 3 }) => {
  if (!articles.length) return null;

  const displayed = articles.slice(0, limit);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Related Articles</h2>
        <div className={styles.grid}>
          {displayed.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
