import { Helmet } from 'react-helmet-async';
import pageStyles from '../Magazines/Magazines.module.css';
import styles from './EditorsManifesto.module.css';

const principles = [
  {
    id: 1,
    title: 'Depth over volume',
    body: "We publish fewer stories than our competitors, on purpose. Every article goes through multiple editorial passes — for accuracy, clarity, and consequence. If it doesn’t change how you think, we don’t run it.",
  },
  {
    id: 2,
    title: 'Voices that matter',
    body: 'Our interviews are exclusive, unhurried conversations — not recycled press releases. We seek out founders and leaders at inflection points, and we ask the questions the PR team told them to avoid.',
  },
  {
    id: 3,
    title: 'Global in scope',
    body: "Innovation doesn't live in one zip code. We cover businesses and ideas from Bangalore, Lagos, São Paulo, and Singapore with the same rigor we apply to Silicon Valley.",
  },
  {
    id: 4,
    title: 'Independent editorial',
    body: 'Our editorial decisions are independent of advertising relationships. What we write, we stand behind.',
  },
];

const EditorsManifesto = () => {
  return (
    <>
      <Helmet>
        <title>Editor's Manifesto | iSG</title>
      </Helmet>

      <div className={pageStyles.pageHeader}>
        <div className={pageStyles.container}>
          <span className={pageStyles.label}>OUR PHILOSOPHY</span>
          <h1 className={pageStyles.heading}>Editor's Manifesto</h1>
          <p className={pageStyles.description}>
            The principles that guide our reporting, our choice of stories, and our
            commitment to our readers.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.pullQuote}>
            We write for the reader who builds, leads, invests, and decides — not for the
            algorithm.
          </p>

          <div className={styles.cardsGrid}>
            {principles.map((item) => (
              <article className={styles.card} key={item.id}>
                <span className={styles.cardNumber}>0{item.id}</span>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EditorsManifesto;
