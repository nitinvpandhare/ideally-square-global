import { categories } from '../../../data/mockData';
import styles from './ArticlesSection.module.css';

const CategoryFilter = ({ activeCategory, onCategoryChange, limit = 6 }) => {
  return (
    <div className={styles.filterBar}>
      <button
        className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.active : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        All
      </button>
      {categories.slice(0, limit).map((cat) => (
        <button
          key={cat.id}
          className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.active : ''}`}
          onClick={() => onCategoryChange(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
