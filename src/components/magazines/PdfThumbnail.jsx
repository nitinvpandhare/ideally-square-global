import { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import '../../utils/pdfWorker';
import styles from './PdfThumbnail.module.css';

const isSafari =
  typeof navigator !== 'undefined' &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/* Stamp white background onto a canvas in-place */
const whiteBackCanvas = (canvas) => {
  if (!canvas) return;
  try {
    const w = canvas.width;
    const h = canvas.height;
    if (!w || !h) return;
    const tmp = document.createElement('canvas');
    tmp.width = w;
    tmp.height = h;
    const ctx = tmp.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(canvas, 0, 0);
    const srcCtx = canvas.getContext('2d');
    srcCtx.clearRect(0, 0, w, h);
    srcCtx.drawImage(tmp, 0, 0);
  } catch (_) {}
};

const PdfThumbnail = ({ pdfUrl, width = 300 }) => {
  const [ready, setReady] = useState(false);
  const canvasRef = useRef(null);
  const wrapRef   = useRef(null);

  /* After render: for Safari, fix the canvas then show it */
  const handleRenderSuccess = () => {
    const apply = () => {
      if (isSafari && canvasRef.current) {
        whiteBackCanvas(canvasRef.current);
      }
      setReady(true);
    };
    /* Safari paints the canvas asynchronously — wait two frames */
    if (isSafari) {
      requestAnimationFrame(() => requestAnimationFrame(apply));
    } else {
      apply();
    }
  };

  /* Extra safety: MutationObserver watches for canvas appearing inside wrap */
  useEffect(() => {
    if (!isSafari || !wrapRef.current) return;
    const observer = new MutationObserver(() => {
      const canvas = wrapRef.current?.querySelector('canvas');
      if (canvas && ready) whiteBackCanvas(canvas);
    });
    observer.observe(wrapRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      {!ready && <div className={styles.skeleton} />}
      <Document
        file={pdfUrl}
        loading={null}
        error={null}
      >
        <Page
          pageNumber={1}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className={ready ? styles.canvas : styles.canvasHidden}
          canvasRef={(el) => { canvasRef.current = el; }}
          onRenderSuccess={handleRenderSuccess}
        />
      </Document>
    </div>
  );
};

export default PdfThumbnail;