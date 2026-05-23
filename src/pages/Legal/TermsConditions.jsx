import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import pageStyles from '../Magazines/Magazines.module.css';
import styles from './Legal.module.css';

const toc = [
  { id: 'intro',        label: 'Introduction' },
  { id: 'use',          label: '1. Use of Website' },
  { id: 'eligibility',  label: '2. Eligibility' },
  { id: 'content',      label: '3. Content and Publications' },
  { id: 'ip',           label: '4. Intellectual Property' },
  { id: 'accounts',     label: '5. User Accounts' },
  { id: 'submissions',  label: '6. Submissions and Contributions' },
  { id: 'advertising',  label: '7. Advertising and Promotions' },
  { id: 'payments',     label: '8. Payments and Fees' },
  { id: 'privacy',      label: '9. Privacy' },
  { id: 'third-party',  label: '10. Third-Party Links' },
  { id: 'disclaimer',   label: '11. Disclaimer of Warranties' },
  { id: 'liability',    label: '12. Limitation of Liability' },
  { id: 'indemnity',    label: '13. Indemnification' },
  { id: 'termination',  label: '14. Termination' },
  { id: 'changes',      label: '15. Changes to Terms' },
  { id: 'governing',    label: '16. Governing Law' },
  { id: 'contact',      label: '17. Contact Us' },
];

const TermsConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms &amp; Conditions | Ideally Square Global Magazine</title>
        <meta name="description" content="Terms & Conditions for Ideally Square Global Limited — governing the use of our website and services." />
      </Helmet>

      <div className={pageStyles.pageHeader}>
        <div className={pageStyles.container}>
          <span className={pageStyles.label}>LEGAL</span>
          <h1 className={pageStyles.heading}>Terms &amp; Conditions</h1>
          <p className={pageStyles.description}>
            Effective Date: 10 January 2026 &nbsp;|&nbsp; Last Updated: 05 May 2026
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

            {/* Introduction */}
            <div className={styles.sectionBlock} id="intro">
              <h2 className={styles.sectionTitle}>Introduction</h2>
              <p className={styles.para}>
                These Terms &amp; Conditions govern the use of the website and services provided
                by Ideally Square Global Limited ("we," "us," or "our"). By accessing or using
                our website, content, or services, you agree to comply with these Terms &amp; Conditions.
              </p>
              <p className={styles.para}>
                If you do not agree with any part of these terms, please do not use our website
                or services.
              </p>
            </div>

            {/* 1 */}
            <div className={styles.sectionBlock} id="use">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>01</span>
                <h2 className={styles.sectionTitle}>Use of Website</h2>
              </div>
              <p className={styles.para}>
                You agree to use our website only for lawful purposes. You must not use the
                website in a way that:
              </p>
              <ul className={styles.bulletList}>
                <li>Causes damage, disruption, or unauthorized access to our content, systems, or services</li>
                <li>Violates any applicable local, national, or international law or regulation</li>
                <li>Involves transmitting unsolicited or unauthorized advertising or spam</li>
                <li>Attempts to gain unauthorized access to any part of our website or its related systems</li>
                <li>Involves scraping, harvesting, or extracting data from our website without written permission</li>
              </ul>
            </div>

            {/* 2 */}
            <div className={styles.sectionBlock} id="eligibility">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>02</span>
                <h2 className={styles.sectionTitle}>Eligibility</h2>
              </div>
              <p className={styles.para}>By using our website, you confirm that:</p>
              <ul className={styles.bulletList}>
                <li>You are at least 18 years of age</li>
                <li>You have the legal capacity to enter into a binding agreement</li>
                <li>You are not barred from using our services under any applicable law</li>
              </ul>
            </div>

            {/* 3 */}
            <div className={styles.sectionBlock} id="content">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>03</span>
                <h2 className={styles.sectionTitle}>Content and Publications</h2>
              </div>
              <p className={styles.para}>
                All content published on our website and in our magazines is for informational
                and editorial purposes only. We reserve the right to edit, modify, or remove
                any content at our discretion.
              </p>
              <p className={styles.para}>
                Content may include articles, interviews, brand stories, images, graphics,
                and digital publications.
              </p>
              <ul className={styles.bulletList}>
                <li>We do not guarantee the accuracy, completeness, or timeliness of any content published.</li>
                <li>Opinions expressed in articles or features are those of the respective authors and do not necessarily reflect the views of Ideally Square Global Limited.</li>
              </ul>
            </div>

            {/* 4 */}
            <div className={styles.sectionBlock} id="ip">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>04</span>
                <h2 className={styles.sectionTitle}>Intellectual Property</h2>
              </div>
              <p className={styles.para}>
                All content, designs, logos, text, images, and materials on this website are
                the property of Ideally Square Global Limited, unless otherwise stated. You may
                not copy, reproduce, distribute, or reuse any content without prior written permission.
              </p>
              <ul className={styles.bulletList}>
                <li>Unauthorized use of our intellectual property may result in legal action.</li>
                <li>Any permitted use must include proper attribution to Ideally Square Global Limited.</li>
              </ul>
            </div>

            {/* 5 */}
            <div className={styles.sectionBlock} id="accounts">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>05</span>
                <h2 className={styles.sectionTitle}>User Accounts</h2>
              </div>
              <p className={styles.para}>If our website requires you to create an account:</p>
              <ul className={styles.bulletList}>
                <li>You are responsible for maintaining the confidentiality of your login credentials</li>
                <li>You agree to notify us immediately of any unauthorized use of your account</li>
                <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
              </ul>
            </div>

            {/* 6 */}
            <div className={styles.sectionBlock} id="submissions">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>06</span>
                <h2 className={styles.sectionTitle}>Submissions and Contributions</h2>
              </div>
              <p className={styles.para}>
                If you submit content, stories, or information to us, you confirm that:
              </p>
              <ul className={styles.bulletList}>
                <li>The content is original and does not infringe on any third-party rights</li>
                <li>It does not contain defamatory, offensive, or unlawful material</li>
              </ul>
              <div className={styles.callout}>
                By submitting content, you grant us a non-exclusive, royalty-free, worldwide
                license to edit, publish, and display the content across our platforms.
              </div>
              <p className={styles.para}>
                We reserve the right to reject any submission without providing a reason.
              </p>
            </div>

            {/* 7 */}
            <div className={styles.sectionBlock} id="advertising">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>07</span>
                <h2 className={styles.sectionTitle}>Advertising and Promotions</h2>
              </div>
              <p className={styles.para}>
                Any advertising, promotional content, or brand features published on our platform
                are subject to separate agreements. We do not guarantee specific results, reach,
                or outcomes from advertising or promotional features.
              </p>
              <ul className={styles.bulletList}>
                <li>All sponsored or promotional content will be clearly labeled where required by applicable guidelines.</li>
                <li>Advertisers are responsible for ensuring their content complies with all relevant laws and regulations.</li>
              </ul>
            </div>

            {/* 8 */}
            <div className={styles.sectionBlock} id="payments">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>08</span>
                <h2 className={styles.sectionTitle}>Payments and Fees</h2>
              </div>
              <p className={styles.para}>
                Fees for services, features, or promotions will be communicated clearly before
                any work begins. All payments are subject to agreed terms.
              </p>
              <ul className={styles.bulletList}>
                <li>Payments must be made within the timeline specified in the agreement.</li>
                <li>We reserve the right to suspend services in the event of non-payment.</li>
                <li>Refunds, if applicable, will be handled as per the individually agreed conditions and communicated in writing.</li>
              </ul>
            </div>

            {/* 9 */}
            <div className={styles.sectionBlock} id="privacy">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>09</span>
                <h2 className={styles.sectionTitle}>Privacy</h2>
              </div>
              <p className={styles.para}>
                Your use of our website is also governed by our{' '}
                <Link to="/privacy-policy" className={styles.inlineLink}>Privacy Policy</Link>,
                which is incorporated into these Terms &amp; Conditions by reference. Please
                review our Privacy Policy to understand our data collection and usage practices.
              </p>
            </div>

            {/* 10 */}
            <div className={styles.sectionBlock} id="third-party">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>10</span>
                <h2 className={styles.sectionTitle}>Third-Party Links</h2>
              </div>
              <p className={styles.para}>
                Our website may include links to third-party websites. We are not responsible
                for the content, policies, or practices of third-party websites and encourage
                users to review their terms independently.
              </p>
              <ul className={styles.bulletList}>
                <li>These links are provided for convenience only and do not imply endorsement of the linked website or its content.</li>
              </ul>
            </div>

            {/* 11 */}
            <div className={styles.sectionBlock} id="disclaimer">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>11</span>
                <h2 className={styles.sectionTitle}>Disclaimer of Warranties</h2>
              </div>
              <p className={styles.para}>
                Our website and all content are provided on an "as is" and "as available" basis
                without any warranties, express or implied. We do not warrant that:
              </p>
              <ul className={styles.bulletList}>
                <li>The website will be uninterrupted or error-free</li>
                <li>Any content is accurate, complete, or up to date</li>
                <li>The website is free from viruses or harmful components</li>
              </ul>
            </div>

            {/* 12 */}
            <div className={styles.sectionBlock} id="liability">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>12</span>
                <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
              </div>
              <p className={styles.para}>
                Ideally Square Global Limited shall not be liable for any direct, indirect,
                incidental, or consequential loss arising from:
              </p>
              <ul className={styles.bulletList}>
                <li>The use of or inability to use our website or services</li>
                <li>Any errors or omissions in content</li>
                <li>Unauthorized access to or alteration of your data</li>
              </ul>
              <p className={styles.para}>
                Our total liability, where applicable, shall not exceed the amount paid by you
                for the specific service giving rise to the claim.
              </p>
            </div>

            {/* 13 */}
            <div className={styles.sectionBlock} id="indemnity">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>13</span>
                <h2 className={styles.sectionTitle}>Indemnification</h2>
              </div>
              <p className={styles.para}>
                You agree to indemnify and hold harmless Ideally Square Global Limited, its
                directors, employees, and partners from any claims, damages, losses, or expenses
                (including legal fees) arising from:
              </p>
              <ul className={styles.bulletList}>
                <li>Your use of the website</li>
                <li>Your violation of these Terms &amp; Conditions</li>
                <li>Any content you submit or share through our platform</li>
              </ul>
            </div>

            {/* 14 */}
            <div className={styles.sectionBlock} id="termination">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>14</span>
                <h2 className={styles.sectionTitle}>Termination</h2>
              </div>
              <p className={styles.para}>
                We reserve the right to restrict or terminate access to our website or services
                at our sole discretion, without prior notice, if these Terms &amp; Conditions are
                violated or if we believe such action is necessary to protect our interests or
                those of other users.
              </p>
            </div>

            {/* 15 */}
            <div className={styles.sectionBlock} id="changes">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>15</span>
                <h2 className={styles.sectionTitle}>Changes to Terms</h2>
              </div>
              <p className={styles.para}>
                We may update these Terms &amp; Conditions from time to time. Any changes will
                be effective immediately upon posting on the website with the updated date.
                Continued use of the website after changes are posted constitutes your acceptance
                of the revised terms.
              </p>
            </div>

            {/* 16 */}
            <div className={styles.sectionBlock} id="governing">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>16</span>
                <h2 className={styles.sectionTitle}>Governing Law &amp; Dispute Resolution</h2>
              </div>
              <p className={styles.para}>
                These Terms &amp; Conditions shall be governed by and interpreted in accordance
                with the laws of India.
              </p>
              <ul className={styles.bulletList}>
                <li>Any disputes arising from these Terms shall first be attempted to be resolved through mutual discussion and negotiation.</li>
              </ul>
            </div>

            {/* 17 — Contact card */}
            <div className={`${styles.sectionBlock} ${styles.contactCard}`} id="contact">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>17</span>
                <h2 className={styles.sectionTitle}>Contact Us</h2>
              </div>
              <p className={styles.para}>
                If you have any questions, concerns, or requests regarding these Terms &amp;
                Conditions, please contact us at:
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
                  <a
                    href="https://ideallysquareglobal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inlineLink}
                  >
                    www.ideallysquareglobal.com
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default TermsConditions;
