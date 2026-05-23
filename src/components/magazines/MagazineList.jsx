import MagazineCard from '../home/MagazinesGrid/MagazineCard';
import styles from '../home/MagazinesGrid/MagazinesGrid.module.css';
import listStyles from './MagazineList.module.css';

const MagazineList = ({ magazines = [] }) => {
  if (!magazines.length) {
    return <p className={listStyles.empty}>No magazines available.</p>;
  }

  return (
    <div className={styles.grid}>
      {magazines.map((magazine, index) => (
        <MagazineCard key={magazine.id} magazine={magazine} index={index} />
      ))}
    </div>
  );
};

export default MagazineList;
