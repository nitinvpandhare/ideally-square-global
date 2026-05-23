import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { interviews, coverStories } from '../../data/mockData';
import InterviewDetail from '../../components/interviews/InterviewDetail';
import CoverStoryDetailPage from '../CoverStory/CoverStoryDetailPage';

import styles from './InterviewDetailPage.module.css';


const InterviewDetailPage = () => {
  const { slug } = useParams();


  // Check cover stories first, then interviews
  const coverStory = coverStories.find((s) => s.slug === slug);
  if (coverStory) {
    return <CoverStoryDetailPage />;
  }

  const interview = interviews.find((i) => i.slug === slug);

  if (!interview) {

    return (
      <div className={styles.notFound}>
        <h1>Profile not found</h1>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{interview.name} | iSG Exclusive</title>
        <meta name="description" content={interview.excerpt} />
      </Helmet>
      <InterviewDetail interview={interview} />
    </>
  );
};

export default InterviewDetailPage;
