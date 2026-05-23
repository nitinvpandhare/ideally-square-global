import { useState, useRef, forwardRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Document, Page } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import '../../utils/pdfWorker';
import { magazines } from '../../data/mockData';
import MagazineCard from '../../components/home/MagazinesGrid/MagazineCard';
import styles from './MagazinePagesPage.module.css';

/* ─────────────────────────────────────────────────────────────────────────
   Each leaf inside react-pageflip must be a forwardRef.
   We use a pre-rendered <img> (data-URL captured from the hidden canvas)
   so the page is NEVER blank when react-pageflip flips to it.
───────────────────────────────────────────────────────────────────────── */
const BookPage = forwardRef(({ src, width, height, isBlank }, ref) => (
  <div ref={ref} className={styles.bookPage} style={{ width, height }}>
    {isBlank || !src ? (
      <div className={styles.blankPage} style={{ width, height }} />
    ) : (
      <img
        src={src}
        alt=""
        draggable={false}
        // style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', backgroundColor: '#fff' }}
      />
    )}
  </div>
));
BookPage.displayName = 'BookPage';

const MagazinePagesPage = () => {
  const { slug } = useParams();
  const magazine       = magazines.find((m) => m.slug === slug);
  const otherMagazines = magazines.filter((m) => m.slug !== slug).slice(0, 4);

  const [numPages, setNumPages]       = useState(null);
  const [pageImages, setPageImages]   = useState({});   // { pageNum: dataURL }
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef(null);

  const isMobile   = typeof window !== 'undefined' && window.innerWidth <= 680;
  const pageHeight = isMobile
    ? Math.floor(((window.innerWidth - 48) / 2) * (842 / 595))
    : Math.floor(window.innerHeight * 0.82);
  const pageWidth = Math.floor(pageHeight * (595 / 842));

  // const pageHeight = isMobile
  // ? Math.floor(((window.innerWidth - 48) / 2) * (842 / 595) * 1.2)
  // : Math.floor(window.innerHeight * 0.72 * 1.2);
  // const pageWidth = Math.floor(pageHeight * (595 / 842));

  const pageCanvasRefs = useRef({});  

  const onDocumentLoadSuccess = ({ numPages: n }) => {
    setNumPages(n);
    setPageImages({});
    pageCanvasRefs.current = {};
  };

  const totalPages  = numPages ?? 0;
  const loadedCount = Object.keys(pageImages).length;
  const allReady    = totalPages > 0 && loadedCount >= totalPages;
  /* react-pageflip needs even page count */
  const paddedCount = totalPages % 2 === 0 ? totalPages : totalPages + 1;

  const goNext = () => bookRef.current?.pageFlip()?.flipNext();
  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const onFlip = (e) => setCurrentPage(e.data);

  const pageLabel = numPages
    ? currentPage === 0
      ? `Page 1 of ${numPages}`
      : currentPage + 1 <= numPages
        ? `Pages ${currentPage} – ${currentPage + 1} of ${numPages}`
        : `Page ${currentPage} of ${numPages}`
    : 'Loading…';

  if (!magazine) {
    return (
      <div className={styles.notFound}>
        <h1>Magazine not found</h1>
        <Link to="/magazines">Go back to magazines</Link>
      </div>
    );
  }

  const pdfSrc = magazine.pdfUrl ? encodeURI(magazine.pdfUrl) : null;

  return (
    <>
      <Helmet>
        <title>{magazine.title} — Full Issue | iSG</title>
      </Helmet>

      <section className={styles.wrapper}>
        <div className={styles.container}>

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerText}>
              <p className={styles.label}>FULL ISSUE</p>
              <h1 className={styles.title}>{magazine.title}</h1>
              <p className={styles.subtitle}>{magazine.subtitle}</p>
            </div>
            <div className={styles.headerActions}>
              <Link className={styles.backLink} to="/magazines">← Back to Magazines</Link>
            </div>
          </div>

          {pdfSrc ? (
            <Document
              file={pdfSrc}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className={styles.loadingBox}>
                  <span className={styles.spinner} />
                  <p>Loading magazine…</p>
                </div>
              }
              error={
                <div className={styles.errorBox}>
                  Could not load PDF. Check <code>public/magazines/</code>.
                </div>
              }
            >
              {numPages && (
                <>
                  {/* ── Step 1: hidden render layer ────────────────────────
                      Every page renders here first. onRenderSuccess fires
                      after the canvas is painted; we capture it as a JPEG
                      data-URL. Once all pages are captured, react-pageflip
                      gets fully-loaded <img> tags — never a blank canvas.  */}
                  <div className={styles.preloadLayer} aria-hidden="true">
                    {/* Progress UI */}
                    {!allReady && (
                      <div className={styles.preloadProgress}>
                        <span className={styles.spinner} />
                        <p>Preparing magazine… {loadedCount} / {totalPages}</p>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: `${Math.round((loadedCount / totalPages) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Hidden pages — render but invisible */}
                    {Array.from({ length: totalPages }, (_, i) => {
                      const pg = i + 1;
                      if (pageImages[pg]) return null;
                      return (
                        <div key={pg} className={styles.preloadPage}>
                          <Page
                            pageNumber={pg}
                            width={pageWidth}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            canvasRef={(el) => { if (el) pageCanvasRefs.current[pg] = el; }}
                            onRenderSuccess={() => {
                              const canvas = pageCanvasRefs.current[pg];
                              if (!canvas) return;
                              try {
                                // Ensure transparent areas are rendered on a white background
                                const w = canvas.width;
                                const h = canvas.height;
                                const tmp = document.createElement('canvas');
                                tmp.width = w;
                                tmp.height = h;
                                const ctx = tmp.getContext('2d');
                                ctx.fillStyle = '#ffffff';
                                ctx.fillRect(0, 0, w, h);
                                ctx.drawImage(canvas, 0, 0);
                                const dataURL = tmp.toDataURL('image/jpeg', 0.92);
                                setPageImages((prev) => ({ ...prev, [pg]: dataURL }));
                              } catch {
                                setPageImages((prev) => ({ ...prev, [pg]: 'error' }));
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* ── Step 2: Flipbook (only when all images captured) ── */}
                  {allReady && (
                    <div className={styles.scene}>
                      {/* Book row — arrow | book | arrow */}
                      <div className={styles.bookRow}>
                        <button
                          className={styles.sideBtn}
                          onClick={goPrev}
                          disabled={currentPage === 0}
                          aria-label="Previous"
                        >‹</button>

                        <HTMLFlipBook
                          ref={bookRef}
                          width={pageWidth}
                          height={pageHeight}
                          size="fixed"
                          minWidth={pageWidth}
                          maxWidth={pageWidth}
                          minHeight={pageHeight}
                          maxHeight={pageHeight}
                          showCover={true}
                          mobileScrollSupport={true}
                          onFlip={onFlip}
                          className={styles.flipBook}
                          flippingTime={700}
                          usePortrait={false}
                          drawShadow={true}
                          maxShadowOpacity={0.5}
                          startZIndex={10}
                          style={{}}
                        >
                          {Array.from({ length: paddedCount }, (_, i) => {
                            const pageNum = i + 1;
                            const isBlank = pageNum > totalPages;
                            const src     = pageImages[pageNum];
                            return (
                              <BookPage
                                key={i}
                                src={src === 'error' ? null : src}
                                width={pageWidth}
                                height={pageHeight}
                                isBlank={isBlank}
                              />
                            );
                          })}
                        </HTMLFlipBook>

                        <button
                          className={styles.sideBtn}
                          onClick={goNext}
                          disabled={currentPage >= totalPages - 1}
                          aria-label="Next"
                        >›</button>
                      </div>

                      {/* Page indicator below */}
                      <div className={styles.navBar}>
                        <span className={styles.pageIndicator}>{pageLabel}</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </Document>
          ) : (
            <p className={styles.noPdf}>No PDF available for this issue.</p>
          )}
        </div>
      </section>

      {otherMagazines.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>Other Magazines</h2>
          <div className={styles.relatedGrid}>
            {otherMagazines.map((m, i) => (
              <MagazineCard key={m.id} magazine={m} index={i} />
            ))}
          </div>
          <Link to="/magazines" className={styles.viewAllLink}>View All Magazines →</Link>
        </section>
      )}
    </>
  );
};

export default MagazinePagesPage;
