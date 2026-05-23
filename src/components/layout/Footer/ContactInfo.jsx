import { contactInfo } from '../../../data/navLinks';
import styles from './Footer.module.css';

const ContactInfo = () => {
  return (
    <div className={styles.column}>
      <h4 className={styles.columnTitle}>Contact</h4>
      <ul className={styles.linkList}>
        <li>
          <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
            {contactInfo.phone}
          </a>
        </li>
        <li>
          <a href={`mailto:${contactInfo.email}`}>
            {contactInfo.email}
          </a>
        </li>
        <li>{contactInfo.location}</li>
      </ul>
    </div>
  );
};

export default ContactInfo;
