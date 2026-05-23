import { motion } from 'framer-motion';
import NewsCard from './NewsCard';
import gridStyles from '../home/ArticlesSection/ArticlesSection.module.css';

const NewsList = ({ newsItems = [] }) => {
  if (!newsItems.length) {
    return <p>No news found.</p>;
  }

  return (
    <div className={gridStyles.grid}>
      {newsItems.map((item, index) => (
        <NewsCard key={item.id} newsItem={item} index={index} />
      ))}
    </div>
  );
};

export default NewsList;

