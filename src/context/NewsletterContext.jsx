import { createContext, useState, useContext } from 'react';

export const NewsletterContext = createContext(null);

export const NewsletterProvider = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(() => {
    return localStorage.getItem('newsletter_subscribed') === 'true';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subscribe = (email) => {
    localStorage.setItem('newsletter_subscribed', 'true');
    localStorage.setItem('newsletter_email', email);
    setIsSubscribed(true);
    setIsModalOpen(false);
  };

  const unsubscribe = () => {
    localStorage.removeItem('newsletter_subscribed');
    localStorage.removeItem('newsletter_email');
    setIsSubscribed(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <NewsletterContext.Provider
      value={{ isSubscribed, isModalOpen, subscribe, unsubscribe, openModal, closeModal }}
    >
      {children}
    </NewsletterContext.Provider>
  );
};

export const useNewsletter = () => {
  const context = useContext(NewsletterContext);
  if (!context) {
    throw new Error('useNewsletter must be used within NewsletterProvider');
  }
  return context;
};

export default NewsletterContext;
