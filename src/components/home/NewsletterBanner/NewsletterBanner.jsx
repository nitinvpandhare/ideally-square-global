import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './NewsletterBanner.module.css';

const NewsletterBanner = () => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log('Subscribing:', data.email);
    await new Promise(resolve => setTimeout(resolve, 600));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.label}>JOIN US</span>
        <h2 className={styles.title}>Get Updates In Your Inbox</h2>
        <p className={styles.description}>
          Industry trends, inspiring leadership stories, and iSG Exclusive —
          delivered straight to you.
        </p>

        {submitted ? (
          <div className={styles.success}>
            Thank you for subscribing. Please check your inbox to confirm.
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="your@email.com"
              className={styles.input}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <button type="submit" className={styles.submitBtn}>
              SUBSCRIBE
            </button>
          </form>
        )}

        {errors.email && (
          <p className={styles.error}>{errors.email.message}</p>
        )}
      </div>
    </section>
  );
};

export default NewsletterBanner;
