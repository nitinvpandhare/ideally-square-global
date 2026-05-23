import { motion } from 'framer-motion';
import PdfThumbnail from '../../magazines/PdfThumbnail';
import styles from './MagazinesGrid.module.css';

const MagazineCard = ({ magazine, index = 0 }) => {
  return (
    <motion.a
      href={`/magazines/${magazine.slug}`}
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <div className={styles.imageWrapper}>
        {magazine.pdfUrl ? (
          <PdfThumbnail pdfUrl={magazine.pdfUrl} width={340} />
        ) : (
          <img src={magazine.image} alt={magazine.title} loading="lazy" />
        )}
        <div className={styles.overlay}>
          <span className={styles.viewBtn}>VIEW ISSUE</span>
        </div>
      </div>
      <div className={styles.info}>
        {magazine.category && <span className={styles.issueTag}>{magazine.category}</span>}
        <h3 className={styles.cardTitle}>{magazine.title}</h3>
        <p className={styles.cardSubtitle}>{magazine.subtitle}</p>
        {magazine.description && (
          <p className={styles.cardDesc}>{magazine.description}</p>
        )}
      </div>
    </motion.a>
  );
};

export default MagazineCard;
