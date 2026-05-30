import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import MagazinesGrid from '../../components/home/MagazinesGrid/MagazinesGrid';
import { magazines, magazineCategories } from '../../data/mockData';
import styles from './Magazines.module.css';

const ALL = 'all';

const Magazines = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return magazines.filter((m) => {
      const matchesCategory = activeCategory === ALL || m.category === activeCategory;
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.subtitle?.toLowerCase().includes(q) ||
        m.description?.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <>
      <Helmet>
        <title>Magazines | iSG</title>
      </Helmet>
      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <span className={styles.label}>ISSUES</span>
          <h1 className={styles.heading}>Our Magazines</h1>
          <p className={styles.description}>
            A curated collection of our featured editions celebrating global leaders,
            visionary entrepreneurs, and industry-shaping companies.
          </p>
        </div>
      </div>

      <div className={styles.filtersBar}>
        <div className={styles.filtersInner}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search magazines…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.searchClear} onClick={() => setSearch('')} type="button">
                &times;
              </button>
            )}
          </div>

          <div className={styles.categories}>
            {/* <button
              className={`${styles.catBtn} ${activeCategory === ALL ? styles.catActive : ''}`}
              onClick={() => setActiveCategory(ALL)}
            >
              All
            </button> */}

            {magazineCategories
              .filter(
                (cat) =>
                  ![
                    'cover-story',
                    'feature',
                    'special-edition',
                    'upcoming-issue',
                  ].includes(cat.id)
              )
              .map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.catBtn} ${activeCategory === cat.id ? styles.catActive : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
          </div>
        </div>
      </div>

      <MagazinesGrid magazines={filtered} showHeader={false} />
    </>
  );
};

export default Magazines;
