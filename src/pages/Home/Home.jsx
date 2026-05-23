import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '../../components/home/HeroSection/HeroSection';
import MagazinesGrid from '../../components/home/MagazinesGrid/MagazinesGrid';
import ArticlesSection from '../../components/home/ArticlesSection/ArticlesSection';
import NewsletterBanner from '../../components/home/NewsletterBanner/NewsletterBanner';
import StatsSection from '../../components/home/StatsSection/StatsSection';
import MarketTicker from '../../components/home/MarketTicker/MarketTicker';
import CoverStoryBanner from '../../components/home/CoverStoryBanner/CoverStoryBanner';
import HomeNewsSection from '../../components/home/HomeNewsSection/HomeNewsSection';
import LatestArticlesCarousel from '../../components/home/LatestArticlesCarousel/LatestArticlesCarousel';
import TestimonialsCarousel from '../../components/home/TestimonialsCarousel/TestimonialsCarousel';
import styles from './Home.module.css';

const latestMagazines = [
  { id: 1, title: 'Best franchises to open in 2026', subtitle: 'Franchise opportunities for entrepreneurs', image: '/magazines/Best franchises to open in 2026.png' },
  { id: 2, title: 'High res file', subtitle: 'High resolution magazine edition', image: '/iSG Story Img/Dr. Chris Stout Founding Director.jpg' },
];

const coverFeatures = [
  { id: 1, title: 'Top Leaders To Watch',          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=640&fit=crop&q=85' },
  { id: 2, title: 'Companies Transforming Markets', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=640&fit=crop&q=85' },
  { id: 3, title: 'Innovation Champions',           image: 'https://images.unsplash.com/photo-1550751827-4bd374173312?w=900&h=640&fit=crop&q=85' },
  { id: 4, title: 'Next-Gen Decision Makers',       image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&h=640&fit=crop&q=85' },
];

const articles = [
  { id: 1, type: 'Article', title: 'Building Better Go-To-Market Systems',                        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&q=85' },
  { id: 2, type: 'Article', title: 'The Future-Ready Leadership Playbook',                        image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=300&h=200&fit=crop&q=85' },
  { id: 3, type: 'Article', title: 'Electric Vehicles Driving India Toward a Cleaner Future',    image: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=300&h=200&fit=crop&q=85' },
];

const blogs = [
  { id: 1, type: 'Blog', title: 'How Teams Build Momentum During Change' },
  { id: 2, type: 'Blog', title: 'What Practical Innovation Looks Like' },
  { id: 3, type: 'Blog', title: 'The Raw Truth of Why People Buy' },
];

const standoutPoints = [
  { icon: '⚡', text: 'Dynamic distribution across digital and print touchpoints.' },
  { icon: '📣', text: 'Social media spotlight that extends thought leadership reach.' },
  { icon: '✍️', text: 'Powerful brand positioning through high-quality editorial storytelling.' },
  { icon: '🎨', text: 'Remarkable visual design that improves readability and recall.' },
];

const roadmap = [
  { id: 1, step: 'Step I',   title: 'Editorial',                desc: 'Research-first curation with strong narrative development and clarity.',    color: '#c9a961', bg: '#fdf6e3' },
  { id: 2, step: 'Step II',  title: 'Design',                   desc: 'Clean premium layouts crafted for strong visual storytelling.',             color: '#4a90d9', bg: '#eaf3fb' },
  { id: 3, step: 'Step III', title: 'Publishing & Social Media', desc: 'Multi-channel publication to maximize visibility and engagement.',         color: '#6dbf6d', bg: '#edf8ed' },
  { id: 4, step: 'Step IV',  title: 'Print & Distribution',     desc: 'Quality print output distributed through high-intent communities.',         color: '#d9694a', bg: '#fdf0ec' },
];

const roadmapVisuals = [
  { id: 1, image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=540&h=740&fit=crop&q=85', alt: 'Magazine cover visual' },
  { id: 2, image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=820&h=620&fit=crop&q=85', alt: 'Magazine open spread visual' },
];

const socials = [
  { name: 'YouTube',   href: '/' },
  { name: 'Instagram', href: '/' },
  { name: 'Facebook',  href: '/' },
  { name: 'LinkedIn',  href: '/' },
];

const cardReveal = {
  initial:     { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.5, ease: 'easeOut' },
};

const SectionHeader = ({ label, title, subtitle }) => (
  <motion.div
    className={styles.sectionHeader}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.55 }}
  >
    {label && <span className={styles.sectionLabel}>{label}</span>}
    <h2 className={styles.title}>{title}</h2>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </motion.div>
);

const Home = () => {
  const roadmapRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: roadmapRef, offset: ['start center', 'end center'] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <Helmet>
        <title>Ideally Square Global | Business & Leadership Insights</title>
        <meta name="description" content="A trusted global business magazine providing research-backed leadership insights, sector intelligence, and strategic perspectives." />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <HeroSection />


      {/* ── Stats ────────────────────────────────────────────────────── */}
      {/* <StatsSection /> */}


      {/* ── Featured Magazines ───────────────────────────────────────── */}
      <MagazinesGrid />

      {/* ── Latest Cover Story ───────────────────────────────────────── */}
      <CoverStoryBanner />

      {/* ── Latest Magazines ─────────────────────────────────────────── */}
      {/* <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeader label="EDITIONS" title="Latest Magazines" subtitle="Curated editions and featured perspectives" />
          <div className={styles.cardGridThree}>
            {latestMagazines.map((item, i) => (
              <motion.article
                className={styles.mediaCard}
                key={item.id}
                {...cardReveal}
                transition={{ ...cardReveal.transition, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className={styles.mediaImgWrap}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className={styles.mediaBody}>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Cover Features ─────────────────────────────────────────────
      <section className={styles.altSection}>
        <div className={styles.container}>
          <SectionHeader label="COVER STORIES" title="Cover Features" subtitle="Highlights from our featured cover stories" />
          <div className={styles.cardGridFour}>
            {coverFeatures.map((feature, i) => (
              <motion.article
                className={styles.featureCard}
                key={feature.id}
                {...cardReveal}
                transition={{ ...cardReveal.transition, delay: i * 0.07 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className={styles.featureImgWrap}>
                  <img src={feature.image} alt={feature.title} loading="lazy" />
                  <div className={styles.featureOverlay} />
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Articles ─────────────────────────────────────────────────── */}
      <ArticlesSection />

      {/* ── Articles & Blogs ─────────────────────────────────────────── */}
      {/* <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeader label="INSIGHTS" title="Latest Blogs" subtitle="Fresh ideas, practical lessons, and market observations" />
          <div className={styles.articlesGrid}>
            {articles.map((article, i) => (
              <motion.article
                className={styles.articleCard}
                key={article.id}
                {...cardReveal}
                transition={{ ...cardReveal.transition, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
              >
                <img src={article.image} alt={article.title} loading="lazy" />
                <div className={styles.cardContent}>
                  <span className={styles.typeTag}>{article.type}</span>
                  <h3>{article.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>
          <div className={styles.blogsGrid}>
            {blogs.map((blog, i) => (
              <motion.article
                className={styles.blogCard}
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4 }}
              >
                <span className={styles.typeTag}>{blog.type}</span>
                <h3>{blog.title}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Latest Articles Carousel ─────────────────────────────────── */}
      <LatestArticlesCarousel />

      {/* ── News ─────────────────────────────────────────────────────── */}
      <HomeNewsSection />

      {/* ── About ────────────────────────────────────────────────────── */}
      <section className={styles.darkSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.aboutInner}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.sectionLabel}>ABOUT</span>
            <h2 className={styles.titleLight}>About The Magazine</h2>
            <p className={styles.bodyCopyLight}>
              This platform is focused on trustworthy business storytelling, industry insight,
              and leadership perspectives that help decision-makers act with confidence.
            </p>
            <div className={styles.aboutDivider} />
            <p className={styles.bodyCopyLight}>
              We publish stories that spotlight performance, innovation, and sustained impact
              across multiple sectors and geographies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Standout Points ────────────────────────────────────────────
      <section className={styles.altSection}>
        <div className={styles.container}>
          <SectionHeader label="WHY US" title="Why Ideally Square Global Stands Out!" />
          <div className={styles.pointsGrid}>
            {standoutPoints.map((point, i) => (
              <motion.article
                className={styles.pointCard}
                key={point.text}
                {...cardReveal}
                transition={{ ...cardReveal.transition, delay: i * 0.07 }}
                whileHover={{ y: -4, borderColor: 'rgba(201,169,97,0.4)' }}
              >
                <div className={styles.pointIcon}>{point.icon}</div>
                <p>{point.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Roadmap ──────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeader label="PROCESS" title="Ideally Square Global Roadmap" />
          <div className={styles.roadmapTimeline} ref={roadmapRef}>
            <div className={styles.roadmapLine} />
            <motion.div className={styles.roadmapLineFill} style={{ scaleY: lineScaleY, transformOrigin: 'top center' }} />
            {roadmap.map((item, i) => (
              <motion.article
                className={`${styles.roadmapNode} ${i % 2 === 0 ? styles.nodeLeft : styles.nodeRight}`}
                key={item.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.25, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
              >
                <div className={styles.dotWrapper}>
                  <motion.span className={styles.roadmapStep} style={{ color: item.color }} initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.25 + 0.2 }}>
                    {item.step}
                  </motion.span>
                  <motion.div className={styles.roadmapDot} style={{ borderColor: item.color, background: item.color }} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.25 + 0.3, type: 'spring', stiffness: 300 }} />
                </div>
                <motion.div className={styles.roadmapCard} style={{ background: item.bg, borderColor: item.color }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.25 + 0.15 }}>
                  <h3 style={{ color: item.color }}>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              </motion.article>
            ))}
          </div>
          {/* <div className={styles.roadmapVisualRow}>
            {roadmapVisuals.map((v, i) => (
              <motion.article key={v.id} className={`${styles.roadmapVisualCard} ${i === 0 ? styles.visualCover : styles.visualSpread}`} {...cardReveal} transition={{ ...cardReveal.transition, delay: 0.25 + i * 0.12 }}>
                <img src={v.image} alt={v.alt} loading="lazy" />
              </motion.article>
            ))}
          </div> */}
        </div>
      </section>

      {/* ── Socials ──────────────────────────────────────────────────── */}
      {/* <section className={styles.altSection}>
        <div className={styles.container}>
          <SectionHeader label="CONNECT" title="Follow Us" />
          <div className={styles.socialRow}>
            {socials.map((s) => (
              <motion.a
                href={s.href}
                key={s.name}
                className={styles.socialBadge}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {s.name}
              </motion.a>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <TestimonialsCarousel />

      {/* ── Newsletter ───────────────────────────────────────────────── */}
      <NewsletterBanner />

      {/* ── Live Market Ticker ───────────────────────────────────────── */}
      <MarketTicker />

    </>
  );
};

export default Home;
