import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import pageStyles from '../Magazines/Magazines.module.css';
import styles from './About.module.css';

const introTabs = [
  {
    id: 'foundation',
    label: 'Editorial Foundation',
    content: 'ISG is founded on strong editorial principles, shaped by an experienced team of editors, researchers, and industry contributors with over 15 years of combined experience in business journalism, content strategy, and digital publishing. Our work reflects a deliberate balance between editorial integrity and search-led discoverability — ensuring every story remains relevant, authoritative, and valuable over time.',
  },
  {
    id: 'coverage',
    label: 'Our Coverage',
    content: 'We focus on leadership journeys, sector intelligence, and business narratives that demonstrate measurable impact. Our coverage spans global markets and industries, including business strategy, technology, finance, healthcare, sustainability, professional services, and emerging enterprises. Each feature is contextualised within broader economic and industry frameworks to deliver meaningful, decision-oriented insight.',
  },
  {
    id: 'process',
    label: 'Editorial Process',
    content: 'Our editorial process is structured and transparent. All content undergoes fact verification, narrative review, and contextual validation. We do not publish anonymous opinions or unverified claims. Sponsored or partner-led content, where applicable, is clearly disclosed to maintain reader trust.',
  },
  {
    id: 'position',
    label: 'Our Position',
    content: 'Designed for long-term relevance, Ideally Square Global Magazine positions itself as a trusted reference point for professionals seeking reliable business intelligence and leadership insight.',
  },
];

const heroImages = [
  '/About-us/About-us.png'
  //   '/About%20us/Editorial%20Meeting.jpg',
  //   '/About%20us/Editorial.jpg',
  //   '/About%20us/The%20Editorial%20Team%20·%20Est.%202004.jpg',
  //   '/About%20us/The%20Writers%20Room.jpg',
];

const roadmapItems = [
  {
    id: 1,
    step: 'Step I',
    title: 'Editorial',
    description: 'We research, interview, and shape business stories with clear context and strong narrative quality.',
  },
  {
    id: 2,
    step: 'Step II',
    title: 'Design',
    description: 'Our design flow turns each story into a premium visual experience with clean layouts.',
  },
  {
    id: 3,
    step: 'Step III',
    title: 'Publishing & Social Media',
    description: 'Content is published on our platform and amplified across social channels for stronger reach.',
  },
  {
    id: 4,
    step: 'Step IV',
    title: 'Print & Distribution',
    description: 'Final editions are produced and distributed through communities, events, and partner networks.',
  },
];

const editorialStandards = [
  { text: 'Research-backed, non-sensational content' },
  { text: 'Clear separation between editorial insight and promotional material' },
  { text: 'Ethical storytelling with respect for data, people, and context' },
  { text: 'SEO-aligned structure without compromising editorial quality' },
];

const eatCards = [
  {
    label: 'Experience & Expertise',
    body: 'Our editorial team and contributors possess verifiable experience in business journalism, leadership analysis, and industry research. Author credentials and professional backgrounds are reviewed prior to publication.',
    bullets: null,
  },
  {
    label: 'Authoritativeness',
    body: 'We publish content that demonstrates subject-matter authority through research, contextual analysis, and industry relevance. Opinion-led content is supported by professional experience or documented insight.',
    bullets: null,
  },
  {
    label: 'Trust & Transparency',
    body: null,
    bullets: [
      'All factual claims are verified before publication',
      'Sources are reviewed for credibility',
      'Sponsored or partner content is clearly disclosed',
      'Editorial independence is maintained across all formats',
    ],
  },
  {
    label: 'Content Accountability',
    body: 'We maintain a clear editorial structure, consistent publication history, and accessible publisher information to ensure accountability and reader confidence.',
    bullets: null,
  },
];

const About = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('foundation');

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | Ideally Square Global Magazine</title>
        <meta
          name="description"
          content="Ideally Square Global Magazine — a trusted global business publication delivering research-driven insights on entrepreneurship, strategy, innovation, and enterprise growth."
        />
      </Helmet>

      <div className={styles.aboutHero}>
        {heroImages.map((img, i) => (
          <div
            key={img}
            className={styles.aboutHeroBg}
            style={{
              backgroundImage: `url(${img})`,
              opacity: i === heroIndex ? 1 : 0,
            }}
          />
        ))}
        <div className={styles.aboutHeroOverlay} />
        <div className={styles.aboutHeroDots} />
        <div className={`${pageStyles.container} ${styles.heroContent}`}
          style={{
            position: 'relative',
            zIndex: 3,
            margin: '0',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <span className={pageStyles.label}>WHO WE ARE</span>
          <h1 className={pageStyles.heading}>Ideally Square Global Magazine</h1>
          <p className={pageStyles.description}>
            A global business and leadership publication delivering credible, research-driven
            insights on entrepreneurship, strategy, innovation, and enterprise growth.
          </p>
        </div>
      </div>

      <section className={styles.content}>
        <div className={styles.wrapper}>

          {/* ── About intro ── */}
          <div className={styles.introBlock}>

            <p className={styles.introLead}>
              Ideally Square Global Magazine is a global business and leadership publication
              delivering credible, research-driven insights on entrepreneurship, strategy,
              innovation, and enterprise growth. We serve business leaders, founders, CXOs,
              and professionals who seek clarity, depth, and informed perspectives in an
              increasingly crowded information landscape.
            </p>

            <div className={styles.introTabLayout}>

              {/* Left card — tab options */}
              <div className={styles.introTabNav}>
                <p className={styles.introTabNavTitle}>Explore</p>
                {introTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`${styles.introTabBtn} ${activeTab === tab.id ? styles.introTabBtnActive : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span>{tab.label}</span>
                    <span className={styles.introTabArrow}>→</span>
                  </button>
                ))}
              </div>

              {/* Right card — content */}
              <div className={styles.introTabContent}>
                {introTabs.map((tab) =>
                  activeTab === tab.id ? (
                    <div key={tab.id} className={styles.introTabPane}>
                      <span className={styles.introTabPaneLabel}>{tab.label}</span>
                      <p className={styles.introTabPaneText}>{tab.content}</p>
                    </div>
                  ) : null
                )}
              </div>

            </div>
          </div>

          {/* ── Mission & Vision ── */}
          <div className={styles.missionVisionGrid}>
            <div className={styles.mvCard}>
              <span className={styles.mvLabel}>Mission</span>
              <h2 className={styles.mvHeading}>Elevate Credible Leadership Narratives</h2>
              <p>
                Our mission is to elevate credible leadership narratives and business
                intelligence through research-backed, editorially rigorous content.
              </p>
            </div>
            <div className={styles.mvCard}>
              <span className={styles.mvLabel}>Vision</span>
              <h2 className={styles.mvHeading}>A Globally Trusted Publication</h2>
              <p>
                Our vision is to build a globally trusted business publication — one that
                values depth over virality, insight over opinion, and substance over
                surface-level commentary.
              </p>
            </div>
          </div>

          {/* ── Editorial Standards ── */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Our Editorial Standards</h2>
            <div className={styles.standardsGrid}>
              {editorialStandards.map((s, i) => (
                <div className={styles.standardCard} key={i}>
                  <span className={styles.standardDot} />
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
            <p className={styles.standardsFooter}>
              Every article published by Ideally Square Global Magazine is built to stand as
              a credible digital asset for readers, featured leaders, and the publication itself.
            </p>
          </div>

          {/* ── Our Audience ── */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Our Audience</h2>
            <div className={styles.visionRow}>
              <div className={styles.visionCol}>
                <div className={styles.sectionImage}>
                  <img
                    src="/About-us/Our-Audience.jpg.jpeg"
                    alt="Business leaders and professionals — Ideally Square Global Magazine readers"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className={styles.visionCol}>
                <p>
                  Our readership includes business leaders, founders, investors, consultants,
                  policy influencers, and global professionals who value clarity, context, and
                  credibility in business storytelling.
                </p>
                <ul className={styles.audienceList}>
                  <li>Business leaders &amp; CXOs</li>
                  <li>Founders &amp; entrepreneurs</li>
                  <li>Investors &amp; consultants</li>
                  <li>Policy influencers &amp; global professionals</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Editor's Manifesto — full-width dark section ── */}
      <section className={styles.manifestoSection}>
        <div className={styles.manifestoInner}>
          <span className={styles.manifestoLabel}>Editor's Manifesto</span>

          <blockquote className={styles.manifestoQuote}>
            "Our editorial philosophy is simple: authority is earned, not claimed. We
            prioritise accuracy over speed, perspective over opinion, and substance over
            spectacle."
          </blockquote>

          <div className={styles.manifestoBody}>
            <p className={styles.manifestoLeadPara}>
              Business narratives today are louder than ever, yet clarity within this domain
              is increasingly rare. Ideally Square Global Magazine was created in response to
              this gap. It offers a publication where leadership stories are grounded in
              context, credibility, and consequence.
            </p>
            <p>
              We believe that meaningful business journalism documents progress distilling
              insight. Every edition we publish is shaped by the belief that leadership
              deserves to be examined with depth, integrity, and responsibility.
            </p>
            <p>
              Our editorial philosophy is simple: authority is earned, not claimed. We
              prioritise accuracy over speed, perspective over opinion, and substance over
              spectacle. The leaders and organisations we feature are selected not for
              visibility alone, but for the measurable impact they create within their
              industries and communities.
            </p>
            <p>
              As publishers, we believe in responsibility beyond storytelling. We are
              custodians of trust between readers, contributors, and the wider business
              ecosystem. This commitment informs our editorial standards, our disclosure
              practices, and our long-term vision for the magazine.
            </p>
            <p>
              Ideally Square Global Magazine exists to serve professionals who value insight
              that endures. We are building a platform that respects intelligence, rewards
              credibility, and contributes meaningfully to global business
              dialogue — today and in the years ahead.
            </p>
          </div>

          <div className={styles.manifestoCta}>
            <Link to="/editors-manifesto" className={styles.manifestoLink}>
              Read Full Editor's Manifesto →
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.wrapper}>

          {/* ── Editorial & Trust Standards (E-E-A-T) ── */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Our Editorial &amp; Trust Standards</h2>
            <p className={styles.eatIntro}>
              Ideally Square Global Magazine adheres to strict editorial and ethical guidelines
              aligned with Experience, Expertise, Authoritativeness, and Trustworthiness
              (E-E-A-T) principles.
            </p>
            <div className={styles.eatGrid}>
              {eatCards.map((card) => (
                <div className={styles.eatCard} key={card.label}>
                  <h3 className={styles.eatCardTitle}>{card.label}</h3>
                  {card.body && <p>{card.body}</p>}
                  {card.bullets && (
                    <ul className={styles.eatBullets}>
                      {card.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <p className={styles.eatClosing}>
              Through these standards, Ideally Square Global Magazine positions itself as a
              responsible, credible, and authoritative business publication in alignment with
              global publishing best practices.
            </p>
          </div>

          {/* ── Editorial Process roadmap ── */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Our Editorial Process</h2>
            <div className={styles.roadmapGrid}>
              {roadmapItems.map((item) => (
                <article className={styles.roadmapCard} key={item.id}>
                  <span className={styles.roadmapStep}>{item.step}</span>
                  <h3 className={styles.roadmapTitle}>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          {/* ── Image gallery ── */}
          {/* <div className={styles.imageSection}>
            <h2 className={styles.blockTitle}>Ideally Square Global In Images</h2>
            <p className={styles.imageIntro}>
              A visual glimpse into our mission, vision, cover stories, and industry moments.
            </p>
            <div className={styles.imageGrid}>
              <article className={styles.imageCard}>
                <img
                  src="/About%20us/content-pixie-L9-1gjQKr8I-unsplash.jpg"
                  alt="Ideally Square Global business leadership session"
                  loading="lazy"
                />
              </article>
              <article className={styles.imageCard}>
                <img
                  src="/About%20us/nmg-network-b1GB_BrujaM-unsplash.jpg"
                  alt="Ideally Square Global innovation and technology discussion"
                  loading="lazy"
                />
              </article>
              <article className={styles.imageCard}>
                <img
                  src="/About%20us/karen-poniman-0Pm6Aeu7BOM-unsplash.jpg"
                  alt="Ideally Square Global editorial and industry insights"
                  loading="lazy"
                />
              </article>
            </div>
          </div> */}

        </div>
      </section>
    </>
  );
};

export default About;
