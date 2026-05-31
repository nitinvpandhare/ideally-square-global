import { useState, useRef, forwardRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Document, Page } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import '../../utils/pdfWorker';
import { magazines } from '../../data/mockData';
import MagazineCard from '../../components/home/MagazinesGrid/MagazineCard';
import styles from './MagazinePagesPage.module.css';

const isSafari =
  typeof navigator !== 'undefined' &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/* ── BookPage ──────────────────────────────────────────────────────────── */
const BookPage = forwardRef(({ src, width, height, isBlank }, ref) => (
  <div ref={ref} className={styles.bookPage} style={{ width, height }}>
    {isBlank || !src ? (
      <div className={styles.blankPage} style={{ width, height }} />
    ) : (
      <img
        src={src}
        alt=""
        draggable={false}
        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
      />
    )}
  </div>
));
BookPage.displayName = 'BookPage';

/* ── Main ──────────────────────────────────────────────────────────────── */
const MagazinePagesPage = () => {
  const { slug } = useParams();
  const magazine       = magazines.find((m) => m.slug === slug);
  const otherMagazines = magazines.filter((m) => m.slug !== slug).slice(0, 4);

  const [numPages, setNumPages]     = useState(null);
  const [pageImages, setPageImages] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfDoc, setPdfDoc]         = useState(null);
  const [pageLinks, setPageLinks]   = useState({});
  const bookRef        = useRef(null);
  const pageCanvasRefs = useRef({});

  const isMobile   = typeof window !== 'undefined' && window.innerWidth <= 680;
  const pageHeight = isMobile
    ? Math.floor(((window.innerWidth - 48) / 2) * (842 / 595))
    : Math.floor(window.innerHeight * 0.82);
  const pageWidth = Math.floor(pageHeight * (595 / 842));

  const onDocumentLoadSuccess = (pdf) => {
    setNumPages(pdf.numPages);
    setPageImages({});
    pageCanvasRefs.current = {};
    setPdfDoc(pdf);
  };

  const totalPages  = numPages ?? 0;
  const loadedCount = Object.keys(pageImages).length;
  const allReady    = totalPages > 0 && loadedCount >= totalPages;
  const paddedCount = totalPages % 2 === 0 ? totalPages : totalPages + 1;

  const goNext = () => bookRef.current?.pageFlip()?.flipNext();
  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  /* ── Jump to page input ── */
  const [jumpInput, setJumpInput] = useState('');

  const handleJump = (e) => {
    e.preventDefault();
    const n = parseInt(jumpInput, 10);
    if (!isNaN(n) && n >= 1 && n <= totalPages) {
      goToPage(n);
    }
    setJumpInput('');
  };

  const goToPage = (targetPdfPage) => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().turnToPage(targetPdfPage - 1);
  };

  /* ── Extract PDF internal links ── */
  useEffect(() => {
    if (!allReady || !pdfDoc) return;
    const extractLinks = async () => {
      const result = {};
      for (let pg = 1; pg <= totalPages; pg++) {
        try {
          const page   = await pdfDoc.getPage(pg);
          const annots = await page.getAnnotations();
          const links  = [];
          for (const a of annots) {
            if (a.subtype !== 'Link') continue;
            let destPage = null;
            try {
              const raw  = a.dest || a.action?.dest;
              if (raw) {
                const dest = typeof raw === 'string'
                  ? await pdfDoc.getDestination(raw) : raw;
                if (dest?.[0]) {
                  destPage = (await pdfDoc.getPageIndex(dest[0])) + 1;
                }
              }
            } catch { /* skip */ }
            if (destPage !== null) links.push({ destPage, rect: a.rect });
          }
          if (links.length) result[pg] = links;
        } catch { /* skip */ }
      }
      setPageLinks(result);
      console.log('[PDF Links extracted]', result);
    };
    extractLinks();
  }, [allReady, pdfDoc, totalPages]);

  /* ── PDF link click handler ── */
  const handlePageClick = (e, pdfPageNum) => {
    const links = pageLinks[pdfPageNum];
    if (!links?.length) return;
    const img = e.currentTarget.querySelector('img');
    if (!img) return;
    const rect  = img.getBoundingClientRect();
    const pdfX  = ((e.clientX - rect.left) / rect.width) * 595;
    const pdfY  = 842 - ((e.clientY - rect.top) / rect.height) * 842;
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
                  {/* ── Step 1: Hidden preload ── */}
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

                              const capture = () => {
                                try {
                                  const w = canvas.width;
                                  const h = canvas.height;
                                  const tmp = document.createElement('canvas');
                                  tmp.width = w;
                                  tmp.height = h;
                                  const ctx = tmp.getContext('2d');
                                  ctx.globalCompositeOperation = 'source-over';
                                  ctx.fillStyle = '#ffffff';
                                  ctx.fillRect(0, 0, w, h);
                                  ctx.drawImage(canvas, 0, 0, w, h);
                                  const dataURL = tmp.toDataURL('image/jpeg', 0.92);
                                  if (dataURL.length < 1000) {
                                    setTimeout(capture, 150);
                                    return;
                                  }
                                  setPageImages((prev) => ({ ...prev, [pg]: dataURL }));
                                } catch {
                                  setPageImages((prev) => ({ ...prev, [pg]: 'error' }));
                                }
                              };

                              // Safari needs extra time before pixels are ready
                              if (isSafari) {
                                requestAnimationFrame(() => requestAnimationFrame(capture));
                              } else {
                                capture();
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

                        {/* flipWrap: position relative so corner zones sit on top */}
                        <div className={styles.flipWrap}>
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
                            mobileScrollSupport={false}
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
                              const pageNum  = i + 1;
                              const isBlank  = pageNum > totalPages;
                              const src      = pageImages[pageNum];
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

                          {/* ── PDF link overlay — sits above flipbook, handles link clicks ── */}
                          {(() => {
                            // currentPage is react-pageflip's 0-based page index
                            // Page 0 = cover (single), then pairs: 1-2, 3-4, 5-6, 7-8...
                            // PDF page number = flipbook index + 1
                            const leftPdfPage  = currentPage + 1;
                            const rightPdfPage = currentPage + 2;

                            const visiblePages = currentPage === 0
                              ? [1]
                              : [leftPdfPage, rightPdfPage].filter(p => p >= 1 && p <= totalPages);

                            return visiblePages.map((pdfPageNum, slotIndex) => {
                              const links = pageLinks[pdfPageNum];
                              if (!links?.length) return null;

                              return links.map((link, li) => {
                                const pdfW = 595, pdfH = 842;
                                const [x1, y1, x2, y2] = link.rect;

                                // PDF coords: origin bottom-left → convert to top-left
                                const leftPct   = (x1 / pdfW) * 100;
                                const topPct    = ((pdfH - y2) / pdfH) * 100;
                                const widthPct  = ((x2 - x1) / pdfW) * 100;
                                const heightPct = ((y2 - y1) / pdfH) * 100;

                                // 2-page spread: slot 0 = left page, slot 1 = right page
                                const xOffset = slotIndex * pageWidth;

                                return (
                                  <div
                                    key={`${pdfPageNum}-${li}`}
                                    className={styles.linkHotspot}
                                    style={{
                                      left:   `${xOffset + (leftPct / 100) * pageWidth}px`,
                                      top:    `${(topPct / 100) * pageHeight}px`,
                                      width:  `${(widthPct / 100) * pageWidth}px`,
                                      height: `${(heightPct / 100) * pageHeight}px`,
                                    }}
                                    onClick={() => goToPage(link.destPage)}
                                    title={`Go to page ${link.destPage}`}
                                  />
                                );
                              });
                            });
                          })()}

                          {/* ── Corner click zones ── */}
                          <div className={`${styles.cornerZone} ${styles.cornerTL}`} onClick={goPrev} title="Previous page" />
                          <div className={`${styles.cornerZone} ${styles.cornerBL}`} onClick={goPrev} title="Previous page" />
                          <div className={`${styles.cornerZone} ${styles.cornerTR}`} onClick={goNext} title="Next page" />
                          <div className={`${styles.cornerZone} ${styles.cornerBR}`} onClick={goNext} title="Next page" />
                        </div>

                        <button
                          className={styles.sideBtn}
                          onClick={goNext}
                          disabled={currentPage >= totalPages - 1}
                          aria-label="Next"
                        >›</button>
                      </div>

                      <div className={styles.navBar}>
                        <span className={styles.pageIndicator}>{pageLabel}</span>
                        <form onSubmit={handleJump} className={styles.jumpForm}>
                          <input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={jumpInput}
                            onChange={(e) => setJumpInput(e.target.value)}
                            placeholder="Go to page…"
                            className={styles.jumpInput}
                          />
                          <button type="submit" className={styles.jumpBtn}>Go</button>
                        </form>
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