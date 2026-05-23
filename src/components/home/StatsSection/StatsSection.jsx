import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './StatsSection.module.css';

const STATS = [
  { value: 50,  suffix: '+', label: 'Magazine Editions' },
  { value: 100, suffix: '+', label: 'Leaders Featured' },
  { value: 10,  suffix: '+', label: 'Industries Covered' },
  { value: 1,  suffix: 'k+', label: 'Global Readers' },
];

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(value / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(id); }
      else setCount(start);
    }, 16);
    return () => clearInterval(id);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatsSection = () => (
  <section className={styles.section}>
    <div className={styles.inner}>
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          className={styles.stat}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: i * 0.1 }}
        >
          <div className={styles.number}>
            <Counter value={s.value} suffix={s.suffix} />
          </div>
          <p className={styles.label}>{s.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default StatsSection;
