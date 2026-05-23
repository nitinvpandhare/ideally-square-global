import { useState } from 'react';
import { motion } from 'framer-motion';
import { articles, categories } from '../../../data/mockData';
import ArticleCard from './ArticleCard';
import styles from './ArticlesSection.module.css';

const ArticlesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(article => article.category === activeCategory);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Articles</h2>
        <p className={styles.subtitle}>Insights across industries and disciplines</p>

        <div className={styles.filterBar}>
          <button
            className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.active : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <motion.div
          className={styles.grid}
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {filteredArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection;
