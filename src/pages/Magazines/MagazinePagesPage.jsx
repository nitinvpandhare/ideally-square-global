import { useState, useRef, forwardRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import '../../utils/pdfWorker';
import { magazines } from '../../data/mockData';
import MagazineCard from '../../components/home/MagazinesGrid/MagazineCard';
import styles from './MagazinePagesPage.module.css';

/* ─────────────────────────────────────────────────────────────────────────
   BookPage — each leaf inside react-pageflip
───────────────────────────────────────────────────────────────────────── */
const BookPage = forwardRef(({ src, width, height, isBlank, hasLinks, onClick }, ref) => (
  <div
    ref={ref}
    className={styles.bookPage}
    style={{ width, height, cursor: hasLinks ? 'pointer' : 'default' }}
    onClick={onClick}
  >
    {isBlank || !src ? (
      <div className={styles.blankPage} style={{ width, height }} />
    ) : (
      <img src={src} alt="" draggable={false} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
    )}
  </div>
));
BookPage.displayName = 'BookPage';

/* ─────────────────────────────────────────────────────────────────────────
   Main Page
───────────────────────────────────────────────────────────────────────── */
const MagazinePagesPage = () => {
  const { slug } = useParams();
  const magazine       = magazines.find((m) => m.slug === slug);
  const otherMagazines = magazines.filter((m) => m.slug !== slug).slice(0, 4);

  const [numPages, setNumPages]       = useState(null);
  const [pageImages, setPageImages]   = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfDoc, setPdfDoc]           = useState(null); // raw pdfjs doc for link parsing
  const bookRef = useRef(null);

  const isMobile   = typeof window !== 'undefined' && window.innerWidth <= 680;
  const pageHeight = isMobile
    ? Math.floor(((window.innerWidth - 48) / 2) * (842 / 595))
    : Math.floor(window.innerHeight * 0.82);
  const pageWidth = Math.floor(pageHeight * (595 / 842));

  const pageCanvasRefs = useRef({});

  const onDocumentLoadSuccess = ({ numPages: n, _pdfInfo }) => {
    setNumPages(n);
    setPageImages({});
    pageCanvasRefs.current = {};
  };

  // Store raw pdfjs document to extract annotations later
  const onDocumentLoad = (pdf) => {
    setPdfDoc(pdf);
  };

  const totalPages  = numPages ?? 0;
  const loadedCount = Object.keys(pageImages).length;
  const allReady    = totalPages > 0 && loadedCount >= totalPages;
  const paddedCount = totalPages % 2 === 0 ? totalPages : totalPages + 1;

  const goNext = () => bookRef.current?.pageFlip()?.flipNext();
  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const onFlip = (e) => setCurrentPage(e.data);

  /* ── Jump to a specific PDF page number ─────────────────────────────── */
  const goToPage = (targetPdfPage) => {
    if (!bookRef.current) return;
    // react-pageflip page index (0-based); page 1 = index 0
    const flipIndex = targetPdfPage - 1;
    bookRef.current.pageFlip().turnToPage(flipIndex);
  };

  /* ── Extract internal PDF links from every page after allReady ───────
     pdfjs annotations of type "Link" with a "GoTo" dest tell us
     which page number a link points to.                                  */
  const [pageLinks, setPageLinks] = useState({}); // { pdfPageNum: [{destPage, rect}] }

  useEffect(() => {
    if (!allReady || !pdfDoc) return;

    const extractLinks = async () => {
      const result = {};
      for (let pg = 1; pg <= totalPages; pg++) {
        try {
          const page  = await pdfDoc.getPage(pg);
          const annots = await page.getAnnotations();
          const links = [];
          for (const a of annots) {
            if (a.subtype !== 'Link') continue;
            let destPage = null;
            if (a.dest) {
              try {
                const dest = typeof a.dest === 'string'
                  ? await pdfDoc.getDestination(a.dest)
                  : a.dest;
                if (dest && dest[0]) {
                  const ref = dest[0];
                  const pageIndex = await pdfDoc.getPageIndex(ref);
                  destPage = pageIndex + 1; // 1-based
                }
              } catch { /* skip */ }
            } else if (a.action?.type === 'GoTo' && a.action.dest) {
              try {
                const dest = typeof a.action.dest === 'string'
                  ? await pdfDoc.getDestination(a.action.dest)
                  : a.action.dest;
                if (dest && dest[0]) {
                  const ref = dest[0];
                  const pageIndex = await pdfDoc.getPageIndex(ref);
                  destPage = pageIndex + 1;
                }
              } catch { /* skip */ }
            }
            if (destPage !== null) {
              links.push({ destPage, rect: a.rect }); // rect: [x1,y1,x2,y2] in PDF coords
            }
          }
          if (links.length) result[pg] = links;
        } catch { /* skip page */ }
      }
      setPageLinks(result);
    };

    extractLinks();
  }, [allReady, pdfDoc, totalPages]);

  /* ── Handle click on a BookPage image ───────────────────────────────── 
     Convert click coords → PDF coords → check if inside any link rect  */
  const handlePageClick = (e, pdfPageNum) => {
    const links = pageLinks[pdfPageNum];
    if (!links || !links.length) return;

    const img   = e.currentTarget.querySelector('img');
    if (!img) return;

    const rect  = img.getBoundingClientRect();
    const relX  = e.clientX - rect.left;
    const relY  = e.clientY - rect.top;

    // Rendered image size
    const rendW = rect.width;
    const rendH = rect.height;

    // PDF page natural size (A4 ≈ 595×842 pts)
    const pdfW  = 595;
    const pdfH  = 842;

    // Map click to PDF coordinate space (PDF y is bottom-up)
    const pdfX = (relX / rendW) * pdfW;
    const pdfY = pdfH - (relY / rendH) * pdfH;

    for (const link of links) {
      const [x1, y1, x2, y2] = link.rect;
      if (pdfX >= x1 && pdfX <= x2 && pdfY >= y1 && pdfY <= y2) {
        goToPage(link.destPage);
        return;
      }
    }
  };

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
              onLoadSuccess={(pdf) => {
                onDocumentLoadSuccess(pdf);
                onDocumentLoad(pdf);
              }}
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
                  {/* ── Step 1: Hidden preload layer ── */}
                  <div className={styles.preloadLayer} aria-hidden="true">
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

                  {/* ── Step 2: Flipbook ── */}
                  {allReady && (
                    <div className={styles.scene}>
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
                          drawShadow={false}
                          maxShadowOpacity={0}
                          startZIndex={10}
                          style={{}}
                        >
                          {Array.from({ length: paddedCount }, (_, i) => {
                            const pageNum = i + 1;
                            const isBlank = pageNum > totalPages;
                            const src     = pageImages[pageNum];
                            const hasLinks = !!(pageLinks[pageNum]?.length);
                            return (
                              <BookPage
                                key={i}
                                src={src === 'error' ? null : src}
                                width={pageWidth}
                                height={pageHeight}
                                isBlank={isBlank}
                                hasLinks={hasLinks}
                                onClick={hasLinks ? (e) => handlePageClick(e, pageNum) : undefined}
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