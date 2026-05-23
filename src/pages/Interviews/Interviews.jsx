import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { coverStories } from '../../data/mockData';
import InterviewCard from '../../components/interviews/InterviewCard';
import pageStyles from '../Magazines/Magazines.module.css';
import styles from './Interviews.module.css';

const Interviews = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      question: 'What is Ideally Square Global Limited?',
      answer:
        'Ideally Square Global Limited is a media and magazine company that creates business-focused magazines and digital content featuring brands, CEOs, startups, and professionals across multiple industries.'
    },
    {
      question: 'Who can work with Ideally Square Global Limited?',
      answer:
        'We work with businesses, startups, brands, CEOs, founders, professionals, and organizations looking to share their story through magazine or digital content.'
    },
    {
      question: 'What type of magazines do you publish?',
      answer:
        'We publish mixed-industry magazines that include business stories, CEO interviews, brand features, leadership insights, and industry-related articles.'
    },
    {
      question: 'How do we start working with you?',
      answer:
        'You can start by contacting us through our Contact Us page or email. Our team will understand your requirements, suggest the best format, and guide you through the next steps.'
    },
    {
      question: 'What is your process for magazine or content creation?',
      answer:
        'Our process includes understanding your story, content planning, content creation, design and layout, review, and final publication.'
    },
    {
      question: 'How much time does it take to complete a magazine feature?',
      answer:
        'The timeline usually ranges from 7 to 21 working days, depending on the scope, content length, design complexity, and approval cycles.'
    },
    {
      question: 'Do you offer digital-only or print magazines?',
      answer:
        'We primarily focus on digital magazines. Print options may be discussed based on project requirements.'
    },
    {
      question: 'Can we review the content before publication?',
      answer:
        'Yes. We share drafts for review and feedback before finalizing and publishing the content.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>iSG Exclusive | iSG</title>
      </Helmet>
      <div className={pageStyles.pageHeader}>
        <div className={pageStyles.container}>
          <span className={pageStyles.label}>CONVERSATIONS</span>
          <h1 className={pageStyles.heading}>iSG Exclusive</h1>
          <p className={pageStyles.description}>
            Candid conversations with the founders, CEOs, and thinkers reshaping
            industries around the world.
          </p>
        </div>
      </div>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {coverStories.slice(0, 10).map((coverStoryInterview, index) => (
              <InterviewCard
                key={coverStoryInterview.id}
                interview={{
                  id: coverStoryInterview.id,
                  slug: coverStoryInterview.slug,
                  image: coverStoryInterview.coverImage,
                  name: coverStoryInterview.coverTitle.split(':')[0],
                  role: coverStoryInterview.coverTitle.split(':').slice(1).join(':').trim(),
                  excerpt: coverStoryInterview.excerpt
                }}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Interviews;

