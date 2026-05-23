import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { articles, categories } from '../../data/mockData';
import ArticleList from '../../components/articles/ArticleList';
import pageStyles from '../Magazines/Magazines.module.css';
import styles from './CategoryPage.module.css';

const CategoryPage = () => {
  const { category } = useParams();
  const categoryInfo = categories.find((c) => c.id === category);
  const filteredArticles = articles.filter((a) => a.category === category);

  return (
    <>
      <Helmet>
        <title>{categoryInfo?.name || 'Category'} | iSG</title>
      </Helmet>

      <div className={pageStyles.pageHeader}>
        <div className={pageStyles.container}>
          <span className={pageStyles.label}>CATEGORY</span>
          <h1 className={pageStyles.heading}>{categoryInfo?.name || 'Articles'}</h1>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.container}>
          <ArticleList articles={filteredArticles} />
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
