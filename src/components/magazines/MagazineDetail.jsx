import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { formatDateLong } from '../../utils/formatDate';
import PdfThumbnail from './PdfThumbnail';
import styles from './Magazines.module.css';

const MagazineDetail = ({ magazine }) => {
  const navigate = useNavigate();

  if (!magazine) return null;

  return (
    <article className={styles.detail}>
      <div className={styles.detailGrid}>
        <motion.div
          className={styles.coverWrapper}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {magazine.pdfUrl ? (
            <div className={styles.coverImage}>
              <PdfThumbnail pdfUrl={magazine.pdfUrl} width={320} />
            </div>
          ) : (
            <img src={magazine.image} alt={magazine.title} className={styles.coverImage} />
          )}
        </motion.div>

        <motion.div
          className={styles.detailContent}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/magazines" className={styles.backLink}>
            ← Back to Magazines
          </Link>
          <span className={styles.issueLabel}>{magazine.subtitle || 'Cover Story'}</span>
          <h1 className={styles.detailTitle}>{magazine.title}</h1>
          {magazine.publishedAt && (
            <p className={styles.date}>Published {formatDateLong(magazine.publishedAt)}</p>
          )}
          {magazine.description && (
            <p className={styles.summary}>{magazine.description}</p>
          )}
          <div className={styles.btnRow}>
            <button
              className={styles.readBtn}
              onClick={() => navigate(`/magazines/${magazine.slug}/pages`)}
              type="button"
            >
              READ FULL ISSUE
            </button>
            {/* {magazine.pdfUrl && (
              <a
                className={styles.downloadBtn}
                // href={encodeURI(magazine.pdfUrl)}
                // download
              >
                Download PDF
              </a>
            )} */}
          </div>
        </motion.div>
      </div>
    </article>
  );
};

export default MagazineDetail;
