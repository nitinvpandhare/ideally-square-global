import { useEffect, useRef } from 'react';
import styles from './MarketTicker.module.css';

// Module-level flag — persists across React StrictMode's double-invoke
let _widgetReady = false;

const WIDGET_CONFIG = {
  symbols: [
    { proName: 'BSE:SENSEX',           description: 'SENSEX'       },
    { proName: 'NSE:NIFTY50',          description: 'NIFTY 50'     },
    { proName: 'NSE:BANKNIFTY',        description: 'NIFTY BANK'   },
    { proName: 'NSE:NIFTY_MIDCAP_100', description: 'NIFTY Midcap' },
  ],
  showSymbolLogo: false,
  isTransparent:  true,
  displayMode:    'adaptive',
  colorTheme:     'dark',
  locale:         'en',
};

const MarketTicker = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Skip second invocation from React StrictMode
    if (_widgetReady) return;

    const el = containerRef.current;
    if (!el) return;

    _widgetReady = true;

    // TradingView requires this inner div to exist before the script runs
    el.innerHTML = '<div class="tradingview-widget-container__widget"></div>';

    const script = document.createElement('script');
    script.type      = 'text/javascript';
    script.src       = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async     = true;
    script.innerHTML = JSON.stringify(WIDGET_CONFIG);
    el.appendChild(script);
  }, []);

  return (
    <div className={styles.bar}>
      <span className={styles.label}>
        <span className={styles.dot} />
        LIVE MARKET
      </span>
      <div className={styles.sep} />
      <div
        className={`tradingview-widget-container ${styles.widget}`}
        ref={containerRef}
      >
        <div className="tradingview-widget-container__widget" />
      </div>
    </div>
  );
};

export default MarketTicker;
