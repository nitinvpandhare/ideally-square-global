import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { articles, categories } from '../../data/mockData';
import { formatDate } from '../../utils/formatDate';

import pageStyles from '../Magazines/Magazines.module.css';
import './Articles.css';

const Articles = () => {
const displayArticles = articles;


  return (
    <>
      <Helmet>
        <title>Articles | iSG</title>
      </Helmet>
      <div className={pageStyles.pageHeader}>
        <div className={pageStyles.container}>
          <span className={pageStyles.label}>INSIGHTS</span>
          <h1 className={pageStyles.heading}>All Articles</h1>
          <p className={pageStyles.description}>
            Expert perspectives on technology, leadership, business strategy, and the
            forces shaping tomorrow's industries.
          </p>
        </div>
      </div>
      <section className="articles-grid-section">
        <div className="articles-grid-container">
          <div className="articles-grid">
            {displayArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  to={`/articles/${article.slug}`}
                  className="article-card"
                >
                  <div className="article-card-image">
                    <img
                      src={article.image}
                      alt={article.title}
                    />
                  </div>
                  <div className="article-card-content">

                    <span className="article-card-category">
                      {categories.find(c => c.id === article.category)?.name || article.category}
                    </span>

                    <h3 className="article-card-title">
                      {article.title}
                    </h3>
                    <p className="article-card-excerpt">
                      {article.excerpt}
                    </p>

                    <div className="article-card-meta">
                      <span>{article.author}</span>
                      <span className="article-card-dot"></span>
                      <span>{formatDate(article.date)}</span>
                      {article.readTime && (
                        <>
                          <span className="article-card-dot"></span>
                          <span>{article.readTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Articles;
