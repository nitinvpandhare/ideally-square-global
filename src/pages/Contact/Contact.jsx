import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { contactInfo } from '../../data/navLinks';
import pageStyles from '../Magazines/Magazines.module.css';
import styles from './Contact.module.css';


const Contact = () => {

  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log('Contact form:', data);
    await new Promise(resolve => setTimeout(resolve, 800));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | iSG</title>
      </Helmet>
      <div className={pageStyles.pageHeader}>
        <div className={pageStyles.container}>
          <span className={pageStyles.label}>GET IN TOUCH</span>
          <h1 className={pageStyles.heading}>Contact Us</h1>
          <p className={pageStyles.description}>
            Reach out for editorial inquiries, partnership opportunities, or
            to be featured in an upcoming edition.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <h2 className={styles.infoTitle}>Contact Information</h2>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Phone</span>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
                {contactInfo.phone}
              </a>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <a href={`mailto:${contactInfo.email}`}>
                {contactInfo.email}
              </a>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.formTitle}>Send a message</h2>

            {submitted && (
              <div className={styles.successBox}>
                Thank you. We will get back to you soon.
              </div>
            )}

            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email',
                  },
                })}
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>

            <div className={styles.field}>
              <label>Subject</label>
              <input
                type="text"
                {...register('subject', { required: 'Subject is required' })}
              />
              {errors.subject && <span className={styles.error}>{errors.subject.message}</span>}
            </div>

            <div className={styles.field}>
              <label>Message</label>
              <textarea
                rows="5"
                {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Minimum 10 characters' } })}
              />
              {errors.message && <span className={styles.error}>{errors.message.message}</span>}
            </div>

            <button type="submit" className={styles.submitBtn}>
              SEND MESSAGE
            </button>
          </form>
        </div>
      </section>

      <section className={styles.gatewaySection}>
        <div className={styles.gatewayWrapper}>
          <h2 className={styles.gatewayTitle}>Your Gateway to Opportunities</h2>
          <p className={styles.gatewayCopy}>
            Connect with our team to explore editorial collaborations, brand features,
            and strategic partnerships. We can help you turn your expertise into a
            compelling narrative for a global business audience.
          </p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqWrapper}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqTwoCol}>
            <div className={styles.faqCol}>
              <FAQAccordion
                items={[
                  {
                    q: 'What is Ideally Square Global Limited?',
                    a: 'Ideally Square Global Limited is a media and magazine company that creates business-focused magazines and digital content featuring brands, CEOs, startups, and professionals across multiple industries.',
                  },
                  {
                    q: 'Who can work with Ideally Square Global Limited?',
                    a: 'We work with businesses, startups, brands, CEOs, founders, professionals, and organizations looking to share their story through magazine or digital content.',
                  },
                  {
                    q: 'What type of magazines do you publish?',
                    a: 'We publish mixed-industry magazines that include business stories, CEO interviews, brand features, leadership insights, and industry-related articles.',
                  },
                  {
                    q: 'How do we start working with you?',
                    a: 'You can start by contacting us through our Contact Us page or email. Our team will understand your requirements, suggest the best format, and guide you through the next steps.',
                  },
                  {
                    q: 'What is your process for magazine or content creation?',
                    a: 'Our process includes understanding your story, content planning, content creation, design and layout, review, and final publication.',
                  },
                  {
                    q: 'How much time does it take to complete a magazine feature?',
                    a: 'The timeline usually ranges from 7 to 21 working days, depending on the scope, content length, design complexity, and approval cycles.',
                  },
                  {
                    q: 'Do you offer digital-only or print magazines?',
                    a: 'We primarily focus on digital magazines. Print options may be discussed based on project requirements.',
                  },
                ]}
              />
            </div>

            <div className={styles.faqCol}>
              <FAQAccordion
                items={[
                  {
                    q: 'Can we review the content before publication?',
                    a: 'Yes. We share drafts for review and feedback before finalizing and publishing the content.',
                  },
                  {
                    q: 'Do you write the content or do we provide it?',
                    a: 'We can do both. Our editorial team can create the content, or you may provide your own content which we refine and format professionally.',
                  },
                  {
                    q: 'What industries do you cover?',
                    a: 'We cover business, startups, leadership, technology, finance, professional services, lifestyle, and emerging industries.',
                  },
                  {
                    q: 'Do you provide advertising or promotional features?',
                    a: 'Yes. We offer brand features, promotional articles, and advertising opportunities within our magazines and digital platforms. Is there a fixed pricing structure? Pricing depends on the type of feature, content length, design requirements, and magazine edition. Details are shared after understanding your needs.',
                  },
                  {
                    q: 'Will our content be published globally?',
                    a: 'Yes. Our digital platform allows content to be accessed by a global audience.',
                  },
                  {
                    q: 'Can individuals submit stories or articles?',
                    a: 'Yes. Individuals, founders, and professionals can submit stories, subject to editorial review and relevance.',
                  },
                  {
                    q: 'How can we contact your team for further questions?',
                    a: 'You can reach us through our Contact Us page, email, or phone. Our team will respond during business hours.',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

const FAQAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={styles.faqAccordion}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const panelId = `faq-panel-${idx}`;
        const buttonId = `faq-button-${idx}`;

        return (
          <div className={styles.faqItem} key={item.q}>
            <button
              type="button"
              id={buttonId}
              className={`${styles.faqQuestion} ${isOpen ? styles.faqQuestionOpen : ''}`}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span className={styles.faqQuestionText}>{item.q}</span>
              <span className={styles.faqIcon} aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={isOpen ? styles.faqAnswerOpen : styles.faqAnswer}
            >
              <p className={styles.faqAnswerText}>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default Contact;