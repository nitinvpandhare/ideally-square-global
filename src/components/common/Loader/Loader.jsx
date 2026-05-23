import styles from './Loader.module.css';

const Loader = ({ size = 'md', fullscreen = false }) => {
  return (
    <div className={`${styles.wrapper} ${fullscreen ? styles.fullscreen : ''}`}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
    </div>
  );
};

export default Loader;
