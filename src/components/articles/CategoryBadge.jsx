import { categories } from '../../data/mockData';
import styles from './CategoryBadge.module.css';

const CategoryBadge = ({ category, size = 'md' }) => {
  const categoryInfo = categories.find((c) => c.id === category);
  if (!categoryInfo) return null;

  return (
    <span className={`${styles.badge} ${styles[size]}`}>
      {categoryInfo.name}
    </span>
  );
};

export default CategoryBadge;
