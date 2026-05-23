                                                                                                                                                                                                                                                                                                                                                                              import { Link } from 'react-router-dom';
import { footerLinks, contactInfo } from '../../../data/navLinks';
import { SOCIAL_LINKS } from '../../../utils/constants';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <Link to="/" className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/Logo/Ideally Square logo.png" alt="Ideally Square Global" className={styles.logoImg} />
            </Link>
            <p className={styles.description}>
              A trusted global business magazine providing research-backed leadership insights,
              sector intelligence, and strategic perspectives across industries worldwide.
            </p>
          </div>

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

        

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Follow Us</h4>
            <ul className={styles.socialList}>
              <li>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className={styles.socialLink}>
                  <span className={styles.socialIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </span>
                  <span className={styles.socialLabel}>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" className={styles.socialLink}>
                  <span className={styles.socialIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </span>
                  <span className={styles.socialLabel}>Twitter</span>
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className={styles.socialLink}>
                  <span className={styles.socialIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </span>
                  <span className={styles.socialLabel}>Facebook</span>
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className={styles.socialLink}>
                  <span className={styles.socialIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  </span>
                  <span className={styles.socialLabel}>Instagram</span>
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.threads} target="_blank" rel="noreferrer" className={styles.socialLink}>
                  <span className={styles.socialIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01v-.017c.024-3.579 1.205-6.332 3.509-8.182C7.158 2.161 10.012 1.5 13.59 1.5h.017c2.615.017 4.972.791 6.792 2.24 1.72 1.37 2.751 3.257 2.973 5.457l-2.965.299c-.156-1.528-.826-2.787-1.95-3.666-1.22-.958-2.926-1.45-5.003-1.465h-.014c-2.577.017-4.545.629-5.85 1.82C6.29 7.17 5.62 8.964 5.5 11.44h-.001v.57c.12 2.473.792 4.268 2.09 5.456 1.305 1.193 3.273 1.805 5.85 1.82h.014c2.006-.013 3.6-.501 4.69-1.45.95-.831 1.43-2.05 1.43-3.624 0-1.547-.5-2.744-1.49-3.563-.885-.728-2.124-1.128-3.638-1.192-.072.826-.277 1.632-.624 2.385-.479 1.036-1.233 1.836-2.184 2.313-.803.408-1.69.548-2.564.408-.831-.135-1.576-.534-2.087-1.122-.546-.631-.81-1.48-.758-2.39.055-.984.459-1.82 1.165-2.418.666-.563 1.545-.88 2.557-.916.508-.018 1.033.03 1.562.143-.083-.507-.273-.937-.558-1.261-.352-.404-.86-.617-1.468-.617h-.003c-.618 0-1.135.192-1.497.556-.334.334-.51.796-.51 1.337v.06h-2.97v-.06c0-1.31.481-2.407 1.392-3.171.861-.726 2.038-1.11 3.402-1.11h.006c1.38.001 2.542.392 3.368 1.132.817.733 1.28 1.794 1.356 3.07.558.175 1.083.407 1.56.69 1.773 1.046 2.75 2.784 2.75 4.905 0 2.31-.797 4.14-2.303 5.29-1.388 1.064-3.37 1.627-5.733 1.642z"/>
                    </svg>
                  </span>
                  <span className={styles.socialLabel}>Threads</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>Copyright © {currentYear} Ideally Square Global Pvt. Ltd. All rights reserved.</p>
          <ul className={styles.legalLinks}>
            {footerLinks.legal.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
