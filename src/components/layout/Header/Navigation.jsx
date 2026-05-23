import { NavLink } from 'react-router-dom';
import { navLinks } from '../../../data/navLinks';
import styles from './Header.module.css';

const Navigation = ({ onLinkClick, isOpen }) => {
  return (
    <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
          onClick={onLinkClick}
          end={link.path === '/'}
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
