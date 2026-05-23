import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { magazines } from '../../data/mockData';
import MagazineDetail from '../../components/magazines/MagazineDetail';
import MagazineCard from '../../components/home/MagazinesGrid/MagazineCard';
import styles from './MagazineDetailPage.module.css';

const MagazineDetailPage = () => {
  const { slug } = useParams();
  const magazine = magazines.find((m) => m.slug === slug);
const otherMagazines = magazines.filter((m) => m.slug !== slug).slice(0, 4);

  if (!magazine) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Magazine not found</h1>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{magazine.title} | iSG</title>
      </Helmet>
      <MagazineDetail magazine={magazine} />
      
      {otherMagazines.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>Other Magazines</h2>
          <div className={styles.relatedGrid}>
            {otherMagazines.map((m, index) => (
              <MagazineCard key={m.id} magazine={m} index={index} />
            ))}
          </div>
          <Link to="/magazines" className={styles.viewAllLink}>
            View All Magazines →
          </Link>
        </section>
      )}
    </>
  );
};

export default MagazineDetailPage;
