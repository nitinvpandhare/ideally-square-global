import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | iSG</title>
      </Helmet>
      <div className={styles.container}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className={styles.homeBtn}>
          RETURN HOME
        </Link>
      </div>
    </>
  );
};

export default NotFound;
