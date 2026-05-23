import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import pageStyles from '../Magazines/Magazines.module.css';
import styles from './Legal.module.css';

const toc = [
  { id: 'intro',       label: 'Introduction' },
  { id: 'collect',     label: '1. Information We Collect' },
  { id: 'use',         label: '2. How We Use Your Information' },
  { id: 'legal-basis', label: '3. Legal Basis for Processing' },
  { id: 'cookies',     label: '4. Cookies & Tracking' },
  { id: 'sharing',     label: '5. Sharing Your Information' },
  { id: 'retention',   label: '6. Data Retention' },
  { id: 'third-party', label: '7. Third-Party Links' },
  { id: 'security',    label: '8. Security' },
  { id: 'children',    label: '9. Children\'s Privacy' },
  { id: 'rights',      label: '10. Your Rights' },
  { id: 'changes',     label: '11. Changes to This Policy' },
  { id: 'contact',     label: '12. Contact Us' },
];

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Ideally Square Global Magazine</title>
        <meta name="description" content="Privacy Policy for Ideally Square Global Limited — how we collect, use, and protect your personal information." />
      </Helmet>

      <div className={pageStyles.pageHeader}>
        <div className={pageStyles.container}>
          <span className={pageStyles.label}>LEGAL</span>
          <h1 className={pageStyles.heading}>Privacy Policy</h1>
          <p className={pageStyles.description}>
            Effective Date: 10 January 2026 &nbsp;|&nbsp; Last Updated: 5 May 2026
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.inner}>

          {/* ── Sticky sidebar TOC ── */}
          <aside className={styles.sidebar}>
            <p className={styles.tocTitle}>Contents</p>
            <ul className={styles.tocList}>
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={styles.tocLink}>{item.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          {/* ── Main content ── */}
          <div className={styles.main}>

            <div className={styles.sectionBlock} id="intro">
              <h2 className={styles.sectionTitle}>Introduction</h2>
              <p className={styles.para}>
                This Privacy Policy explains how Ideally Square Global Limited ("we," "us," or "our")
                collects, uses, shares, and protects information when you visit our website or use
                our services.
              </p>
              <p className={styles.para}>
                We are committed to protecting your privacy and handling your personal information
                with care. By using our website, you agree to the terms outlined in this Privacy Policy.
              </p>
            </div>

            <div className={styles.sectionBlock} id="collect">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>01</span>
                <h2 className={styles.sectionTitle}>Information We Collect</h2>
              </div>
              <p className={styles.para}>We may collect the following types of information:</p>

              <h3 className={styles.subHeading}>1.1 Personal Information</h3>
              <ul className={styles.bulletList}>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company name (if provided)</li>
                <li>Any information you submit through forms on our website</li>
              </ul>

              <h3 className={styles.subHeading}>1.2 Technical and Usage Data</h3>
              <ul className={styles.bulletList}>
                <li>IP address</li>
                <li>Browser type</li>
                <li>Pages visited</li>
                <li>Time spent on pages</li>
                <li>Device information</li>
                <li>Referring URLs</li>
              </ul>

              <h3 className={styles.subHeading}>1.3 Subscription &amp; Communication Data</h3>
              <ul className={styles.bulletList}>
                <li>Email subscription preferences</li>
                <li>Newsletter opt-in/opt-out status</li>
                <li>Communication history with our team</li>
              </ul>
            </div>

            <div className={styles.sectionBlock} id="use">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>02</span>
                <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
              </div>
              <p className={styles.para}>We use the information we collect for the following purposes:</p>
              <ul className={styles.bulletList}>
                <li>To respond to your inquiries</li>
                <li>To provide services and support</li>
                <li>To send updates, newsletters, and communications (only if you opt-in)</li>
                <li>To improve our website and content</li>
                <li>To analyze visitor behavior for analytics and performance</li>
                <li>To process and fulfill magazine subscriptions or orders</li>
                <li>To comply with legal obligations</li>
                <li>To prevent fraud and ensure website security</li>
              </ul>
            </div>

            <div className={styles.sectionBlock} id="legal-basis">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>03</span>
                <h2 className={styles.sectionTitle}>Legal Basis for Processing</h2>
              </div>
              <p className={styles.para}>
                If you are located in the European Economic Area (EEA) or similar jurisdictions,
                we process your personal data under the following legal bases:
              </p>
              <ul className={styles.bulletList}>
                <li><strong>Consent</strong> — where you have given us explicit permission</li>
                <li><strong>Contractual necessity</strong> — to fulfill a service or subscription</li>
                <li><strong>Legal obligation</strong> — where required by applicable law</li>
                <li><strong>Legitimate interests</strong> — for improving our services and preventing fraud</li>
              </ul>
            </div>

            <div className={styles.sectionBlock} id="cookies">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>04</span>
                <h2 className={styles.sectionTitle}>Cookies and Tracking Technologies</h2>
              </div>
              <p className={styles.para}>Our website may use cookies and similar technologies to:</p>
              <ul className={styles.bulletList}>
                <li>Remember your preferences</li>
                <li>Analyze website traffic</li>
                <li>Improve user experience</li>
                <li>Serve relevant content and advertisements</li>
              </ul>
              <p className={styles.para}>
                You can choose to disable cookies in your browser settings, but this may affect
                some features of the website.
              </p>
            </div>

            <div className={styles.sectionBlock} id="sharing">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>05</span>
                <h2 className={styles.sectionTitle}>Sharing Your Information</h2>
              </div>
              <div className={styles.callout}>
                We respect your privacy and do not sell your personal information.
              </div>
              <p className={styles.para}>We may share information with:</p>
              <ul className={styles.bulletList}>
                <li>Service providers and partners who help us operate the website</li>
                <li>Legal authorities if required by law</li>
                <li>Third parties if we are involved in a merger, acquisition, or business sale</li>
                <li>Analytics providers (e.g., Google Analytics) to help us understand website usage</li>
              </ul>
              <p className={styles.para}>
                All third-party service providers are required to handle your data in accordance
                with applicable privacy laws.
              </p>
            </div>

            <div className={styles.sectionBlock} id="retention">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>06</span>
                <h2 className={styles.sectionTitle}>Data Retention</h2>
              </div>
              <p className={styles.para}>
                We retain your personal information only for as long as necessary to fulfill the
                purposes outlined in this policy, or as required by law. When your data is no
                longer needed, we will securely delete or anonymize it.
              </p>
            </div>

            <div className={styles.sectionBlock} id="third-party">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>07</span>
                <h2 className={styles.sectionTitle}>Third-Party Links</h2>
              </div>
              <p className={styles.para}>
                Our website may contain links to external websites not controlled by us. We are
                not responsible for the privacy practices or content of those third-party sites.
                We recommend reviewing their separate privacy policies before submitting any
                personal information.
              </p>
            </div>

            <div className={styles.sectionBlock} id="security">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>08</span>
                <h2 className={styles.sectionTitle}>Security</h2>
              </div>
              <p className={styles.para}>
                We use reasonable technical, administrative, and organizational measures to protect
                your information from loss, misuse, or unauthorized access. These include encrypted
                data transmission (SSL/HTTPS) and restricted access controls.
              </p>
              <p className={styles.para}>
                However, no method of transmission over the internet is fully secure, and we cannot
                guarantee absolute security.
              </p>
            </div>

            <div className={styles.sectionBlock} id="children">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>09</span>
                <h2 className={styles.sectionTitle}>Children's Privacy</h2>
              </div>
              <p className={styles.para}>
                Our services and website are intended for users who are 18 years of age or older.
                We do not knowingly collect personal information from children under 18. If we
                become aware that a child has provided us with personal data, we will delete it promptly.
              </p>
            </div>

            <div className={styles.sectionBlock} id="rights">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>10</span>
                <h2 className={styles.sectionTitle}>Your Rights</h2>
              </div>
              <p className={styles.para}>You have the right to:</p>
              <ul className={styles.bulletList}>
                <li>Request access to your personal information</li>
                <li>Correct or update inaccurate data</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request restriction of processing</li>
                <li>Data portability — receive your data in a structured, machine-readable format</li>
                <li>Lodge a complaint with a relevant data protection authority</li>
              </ul>
              <p className={styles.para}>
                To exercise your rights, please contact us through our{' '}
                <Link to="/contact-us" className={styles.inlineLink}>Contact Us</Link> page or via email.
              </p>
            </div>

            <div className={styles.sectionBlock} id="changes">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>11</span>
                <h2 className={styles.sectionTitle}>Changes to This Privacy Policy</h2>
              </div>
              <p className={styles.para}>
                We may update this Privacy Policy from time to time. We will post the updated
                version on the website with the revised effective date. We encourage you to review
                this page periodically. Continued use of our website after any changes constitutes
                acceptance of the updated policy.
              </p>
            </div>

            <div className={`${styles.sectionBlock} ${styles.contactCard}`} id="contact">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>12</span>
                <h2 className={styles.sectionTitle}>Contact Us</h2>
              </div>
              <p className={styles.para}>
                If you have any questions, concerns, or requests regarding this Privacy Policy,
                please contact us at:
              </p>
              <div className={styles.contactDetails}>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Organisation</span>
                  <span>Ideally Square Global Pvt. Ltd.</span>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Email</span>
                  <a href="mailto:info@ideallysquareglobal.com" className={styles.inlineLink}>
                    info@ideallysquareglobal.com
                  </a>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Website</span>
                  <a href="https://ideallysquareglobal.com" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>www.ideallysquareglobal.com</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
