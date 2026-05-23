import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { coverStories, magazines } from '../../data/mockData';
import PdfThumbnail from '../../components/magazines/PdfThumbnail';
import styles from './CoverStoryDetailPage.module.css';

const SOCIAL = [
  {
    label: 'LinkedIn',
    color: '#0077B5',
    url: 'https://www.linkedin.com/in/drchrisstout/',
    path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
  },
  {
    label: 'Facebook',
    color: '#1877F2',
    url: 'https://www.facebook.com/drchrisstout',
    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    label: 'Twitter',
    color: '#1DA1F2',
    url: 'https://x.com/drchrisstout',
    path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
  },
  {
    label: 'Instagram',
    color: '#E4405F',
    url: 'https://www.instagram.com/drchrisstout/',
    path: 'M2 2h20v20H2z M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm4.5-.5h.01',
  },
  {
    label: 'Pinterest',
    color: '#E60023',
    url: 'https://pinterest.com/DrChrisStout',
    path: 'M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.136-1.867 3.136-4.563 0-2.386-1.715-4.052-4.163-4.052-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 01.069.286c-.076.315-.244.995-.277 1.134-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z',
  },
];


const CoverStoryDetailPage = () => {
  const { slug } = useParams();
  const story = coverStories.find((s) => s.slug === slug);
  const magazine = story ? magazines.find((m) => m.slug === story.magazineSlug) : null;
  // Only show related magazines that have a cover story (so clicking opens story details)
  const related = coverStories
    .filter((s) => s.slug !== slug)
    .map((s) => {
      const mag = magazines.find((m) => m.slug === s.magazineSlug);
      // Use coverStory fields first (authoritative for cover story cards)
      return {
        id: mag?.id ?? s.id,
        title: mag?.title ?? s.coverTitle,
        subtitle: mag?.subtitle ?? s.category,
        description: mag?.description,
        category: mag?.category ?? s.category,
        publishDate: mag?.publishDate,
        pdfUrl: mag?.pdfUrl,
        slug: mag?.slug ?? s.magazineSlug,
        image: s.coverImage,
        coverStorySlug: s.slug,
      };
    });


  if (!story) {
    return (
      <div className={styles.notFound}>
        <h1>Story not found</h1>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{story.coverTitle} | iSG</title>
        <meta name="description" content={story.excerpt} />
      </Helmet>

      <div className={styles.page}>
        <div className={styles.layout}>

          {/* ── Main content ─────────────────────────────────────── */}
          <motion.main
            className={styles.main}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.title}>{story.coverTitle}</h1>

            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                {new Date(story.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className={styles.metaItem}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                5 min read
              </span>
              <Link to={`/magazines`} className={styles.categoryTag}>{story.category}</Link>
            </div>

            {/* Cover image
            <div className={styles.coverImageWrap}>
              {magazine?.pdfUrl ? (
                <PdfThumbnail pdfUrl={magazine.pdfUrl} width={700} />
              ) : (
                <img src={story.coverImage} alt={story.coverTitle} />
              )}
            </div> */}
            <div className={styles.coverFrame}>
              <img src={story.coverImage} alt={story.coverTitle} className={styles.coverImg} loading="lazy" />
              <div className={styles.coverGlow} />
            </div>

            {/* Excerpt intro */}
            <p className={styles.intro}>{story.excerpt}</p>

            {/* Article sections */}
            {story.sections.map((sec, i) => (
              <div key={i} className={styles.section}>
                <h2 className={styles.sectionHeading}>{sec.heading}</h2>
                <p className={styles.sectionBody}>{sec.body}</p>
              </div>
            ))}

            {/* Read magazine CTA */}
            {magazine && (
              <div className={styles.magazineCta}>
                <p>Read the full issue</p>
                <Link to={`/magazines/${magazine.slug}/pages`} className={styles.readIssueBtn}>
                  Open Magazine →
                </Link>
              </div>
            )}
          </motion.main>

          {/* ── Sidebar ──────────────────────────────────────────── */}
          <aside className={styles.sidebar}>

            {/* Client Spotlight
            <div className={styles.sideCard}>
              <div className={styles.socialRow}>
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label={s.label}
                    style={{ background: s.label === 'Instagram' ? "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" : s.color }}
                  >
                    {s.label === 'Instagram' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <defs>
                          <linearGradient id="instaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fdf497" />
                            <stop offset="45%" stopColor="#fd5949" />
                            <stop offset="60%" stopColor="#d6249f" />
                            <stop offset="90%" stopColor="#285AEB" />
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#instaGrad)"
                          d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                        />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={s.path} />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div> */}

            {/* Related cover stories — large stacked images */}
            <div className={styles.sideCardCovers}>
              <h3 className={styles.sideTitle}>Related Covers</h3>
              <div className={styles.relatedList}>
                {related.map((m) => (
                  <Link key={m.id} to={`/exclusive-interviews/${m.coverStorySlug}`} className={styles.relatedItem}>
                    <div className={styles.relatedThumb}>
                      <img src={m.image} alt={m.title} loading="lazy" />
                    </div>
                    <div className={styles.relatedInfo}>
                      <span className={styles.relatedCat}>{m.subtitle}</span>
                      <p className={styles.relatedTitle}>{m.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </>
  );
};

export default CoverStoryDetailPage;
