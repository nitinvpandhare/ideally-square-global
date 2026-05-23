import { useState } from 'react';
import SearchIcon from '../../../assets/icons/SearchIcon';
import styles from './SearchBar.module.css';

const SearchBar = ({ placeholder = 'Search articles...', onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.iconWrapper}>
        <SearchIcon size={18} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className={styles.clearBtn}
          aria-label="Clear"
        >
          ×
        </button>
      )}
    </form>
  );
};

export default SearchBar;
