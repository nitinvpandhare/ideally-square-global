import { useEffect, useRef } from 'react';
import styles from './IndexCharts.module.css';

const CHARTS = [
  { id: 'nifty',  symbol: 'NSE:NIFTY50', label: 'NIFTY 50'  },
  { id: 'sensex', symbol: 'BSE:SENSEX',  label: 'SENSEX'    },
];

const ChartWidget = ({ symbol }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.innerHTML = '<div class="tradingview-widget-container__widget"></div>';

    const script = document.createElement('script');
    script.type  = 'text/javascript';
    script.src   = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.async = true;

    script.innerHTML = JSON.stringify({
      symbols:            [[symbol]],
      chartOnly:          false,
      width:              '100%',
      height:             '100%',
      locale:             'en',
      colorTheme:         'dark',
      autosize:           true,
      showVolume:         false,
      showMA:             false,
      hideDateRanges:     false,
      hideMarketStatus:   false,
      hideSymbolShortName: false,
      scalePosition:      'right',
      scaleMode:          'Normal',
      fontSize:           '10',
      noTimeScale:        false,
      valuesTracking:     '1',
      changeMode:         'price-and-percent',
      chartType:          'area',
      maLineColor:        '#2962FF',
      maLineWidth:        1,
      maLength:           9,
      lineWidth:          2,
      lineType:           0,
      dateRanges:         ['1d|1', '1m|30', '3m|60', '12m|1D', '60m|1W', 'all|1M'],
      isTransparent:      false,
    });

    el.appendChild(script);
    return () => { if (el) el.innerHTML = ''; };
  }, [symbol]);

  return (
    <div
      className={`tradingview-widget-container ${styles.widgetWrap}`}
      ref={ref}
    >
      <div className="tradingview-widget-container__widget" />
    </div>
  );
};

const IndexCharts = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Live Index Charts</h2>
        <span className={styles.badge}>
          <span className={styles.dot} />
          Real-time
        </span>
      </div>

      <div className={styles.grid}>
        {CHARTS.map((c) => (
          <div key={c.id} className={styles.card}>
            <ChartWidget symbol={c.symbol} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default IndexCharts;
