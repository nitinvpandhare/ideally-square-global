import styles from './Card.module.css';

const Card = ({ children, hover = false, padding = 'md', className = '', onClick }) => {
  return (
    <div
      className={`${styles.card} ${hover ? styles.hover : ''} ${styles[padding]} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
