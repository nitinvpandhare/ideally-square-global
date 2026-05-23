import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const SUBSCRIBE_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_SUBSCRIBE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendSubscribeConfirmation = (email) => {
  return emailjs.send(
    SERVICE_ID,
    SUBSCRIBE_TEMPLATE_ID,
    {
      to_email: email,
      site_name: 'Ideally Square Global',
      site_url: import.meta.env.VITE_SITE_URL || 'https://ideallysquareglobal.com',
    },
    PUBLIC_KEY
  );
};
