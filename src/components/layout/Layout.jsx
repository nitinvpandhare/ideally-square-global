import Header from './Header/Header';
import Footer from './Footer/Footer';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
