import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Magazines from '../pages/Magazines/Magazines';
import MagazineDetailPage from '../pages/Magazines/MagazineDetailPage';
import MagazinePagesPage from '../pages/Magazines/MagazinePagesPage';
import Articles from '../pages/Articles/Articles';
import ArticleDetailPage from '../pages/Articles/ArticleDetailPage';
import CategoryPage from '../pages/Articles/CategoryPage';
import Interviews from '../pages/Interviews/Interviews';
import InterviewDetailPage from '../pages/Interviews/InterviewDetailPage';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import News from '../pages/News/News';
import NewsDetailPage from '../pages/News/NewsDetailPage';
import PrivacyPolicy from '../pages/Legal/PrivacyPolicy';
import TermsConditions from '../pages/Legal/TermsConditions';
import EditorsManifesto from '../pages/EditorsManifesto/EditorsManifesto';
import NotFound from '../pages/NotFound/NotFound';
import BulkUpload from '../pages/Admin/BulkUpload/BulkUpload';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/magazines" element={<Magazines />} />
      <Route path="/magazines/:slug" element={<MagazineDetailPage />} />
      <Route path="/magazines/:slug/pages" element={<MagazinePagesPage />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:slug" element={<ArticleDetailPage />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/exclusive-interviews" element={<Interviews />} />
      <Route path="/exclusive-interviews/:slug" element={<InterviewDetailPage />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:slug" element={<NewsDetailPage />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/editors-manifesto" element={<EditorsManifesto />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsConditions />} />
      <Route path="/admin/bulk-upload" element={<BulkUpload />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
