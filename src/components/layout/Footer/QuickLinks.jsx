import { Link } from 'react-router-dom';
import { footerLinks } from '../../../data/navLinks';
import styles from './Footer.module.css';

const QuickLinks = () => {
  return (
    <div className={styles.column}>
      <h4 className={styles.columnTitle}>Quick Links</h4>
      <ul className={styles.linkList}>
        {footerLinks.quickLinks.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
