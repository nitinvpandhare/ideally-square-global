import ArticleCard from '../home/ArticlesSection/ArticleCard';
import styles from '../home/ArticlesSection/ArticlesSection.module.css';
import listStyles from './ArticleList.module.css';

const ArticleList = ({ articles = [] }) => {
  if (!articles.length) {
    return <p className={listStyles.empty}>No articles found.</p>;
  }

  return (
    <div className={styles.grid}>
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </div>
  );
};

export default ArticleList;
