import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { navLinks } from '../../../data/navLinks';
import styles from './Header.module.css';

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={styles.mobileNav}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={onClose}
              end={link.path === '/'}
            >
              {link.name}
            </NavLink>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

