import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import '../../utils/pdfWorker';
import styles from './PdfThumbnail.module.css';

const PdfThumbnail = ({ pdfUrl, width = 300 }) => {
  const [ready, setReady] = useState(false);

  return (
    <div className={styles.wrap}>
      {!ready && <div className={styles.skeleton} />}
      <Document
        file={pdfUrl}
        loading={null}
        error={null}
        onLoadSuccess={() => {
          // Force Safari to repaint
          setTimeout(() => setReady(true), 50);
        }}
      >
        <Page
          pageNumber={1}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className={ready ? styles.canvas : styles.canvasHidden}
        />
      </Document>
    </div>
  );
};

export default PdfThumbnail;
