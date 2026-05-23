import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FabMenu.module.css';
import AdBanner from '../AdBanner/AdBanner';

const FabMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { id: 'ad', label: 'Ad', icon: '📢', content: <AdBanner /> },
    { id: 'share', label: 'Share', icon: '📤' },
    { id: 'quick', label: 'Quick Search', icon: '🔍' },
  ];

  return (
    <>
      <motion.button 
        className={styles.fab}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 135 : 0 }}
      >
        +
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <div className={styles.menu}>
              {actions.map((action, index) => (
                <motion.div
                  key={action.id}
                  className={styles.actionItem}
                  initial={{ scale: 0, y: 20 }}
                  animate={{ 
                    scale: 1, 
                    y: 0,
                    transition: {
                      delay: 0.1 + index * 0.05,
                      type: 'spring',
                      stiffness: 400
                    }
                  }}
                  exit={{ scale: 0, y: 20, transition: { duration: 0.15 } }}
                  style={{ originX: 1, originY: 0 }}
                  onClick={() => {
                    // Handle action
                    if (action.id === 'ad') {
                      // Popup ad or navigate
                      alert('Ad clicked!');
                    }
                    setIsOpen(false);
                  }}
                >
                  <div className={styles.actionIcon}>{action.icon}</div>
                  <span>{action.label}</span>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FabMenu;
