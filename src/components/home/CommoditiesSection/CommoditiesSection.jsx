import { useEffect, useRef } from 'react';
import styles from './CommoditiesSection.module.css';

const WIDGET_HEIGHT = 400;

const CommoditiesSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.innerHTML = '<div class="tradingview-widget-container__widget"></div>';

    const script = document.createElement('script');
    script.type  = 'text/javascript';
    script.src   = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;

    script.innerHTML = JSON.stringify({
      colorTheme:          'dark',
      dateRange:           '1D',
      showChart:           false,
      locale:              'en',
      width:               '100%',
      height:              WIDGET_HEIGHT,
      isTransparent:       false,
      showSymbolLogo:      false,
      showFloatingTooltip: true,

      plotLineColorGrowing:            'rgba(34,197,94,1)',
      plotLineColorFalling:            'rgba(239,68,68,1)',
      gridLineColor:                   'rgba(255,255,255,0.05)',
      scaleFontColor:                  'rgba(200,200,200,0.6)',
      belowLineFillColorGrowing:       'rgba(34,197,94,0.12)',
      belowLineFillColorFalling:       'rgba(239,68,68,0.12)',
      belowLineFillColorGrowingBottom: 'rgba(34,197,94,0)',
      belowLineFillColorFallingBottom: 'rgba(239,68,68,0)',
      symbolActiveColor:               'rgba(201,169,97,0.15)',

      tabs: [
        {
          title: 'MCX',
          symbols: [
            { s: 'MCX:GOLD1!',       d: 'GOLD'       },
            { s: 'MCX:SILVER1!',     d: 'SILVER'     },
            { s: 'MCX:COPPER1!',     d: 'COPPER'     },
            { s: 'MCX:CRUDEOIL1!',   d: 'CRUDEOIL'   },
            { s: 'MCX:NATURALGAS1!', d: 'NATURALGAS' },
            { s: 'MCX:ZINC1!',       d: 'ZINC'       },
          ],
          originalTitle: 'MCX',
        },
        {
          title: 'International',
          symbols: [
            { s: 'COMEX:GC1!', d: 'GOLD (COMEX)'  },
            { s: 'NYMEX:CL1!', d: 'CRUDE OIL'     },
            { s: 'NYMEX:NG1!', d: 'NATURAL GAS'   },
            { s: 'COMEX:SI1!', d: 'SILVER'        },
            { s: 'COMEX:HG1!', d: 'COPPER'        },
          ],
          originalTitle: 'International',
        },
      ],
    });

    el.appendChild(script);
    return () => { if (el) el.innerHTML = ''; };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>Major Commodities</h2>
          <span className={styles.badge}>
            <span className={styles.dot} />
            Live MCX Prices
          </span>
        </div>

        {/* Full-width split widget — list left, chart right */}
        <div
          className={`tradingview-widget-container ${styles.widget}`}
          style={{ height: WIDGET_HEIGHT }}
          ref={containerRef}
        >
          <div
            className="tradingview-widget-container__widget"
            style={{ height: WIDGET_HEIGHT, width: '100%' }}
          />
        </div>

      </div>
    </section>
  );
};

export default CommoditiesSection;
