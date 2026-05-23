import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import ContactFab from './components/common/ContactFab/ContactFab';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NewsletterProvider } from './context/NewsletterContext';
import styles from './App.module.css';

function App() {


  return (
    <ThemeProvider>
      <AuthProvider>
        <NewsletterProvider>
          <div className={styles.app}>
            <Layout>
              <AppRoutes />
            </Layout>
            <ScrollToTop />
            <ContactFab />
          </div>
        </NewsletterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
