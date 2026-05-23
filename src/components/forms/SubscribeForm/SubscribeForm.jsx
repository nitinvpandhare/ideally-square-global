import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SubscribeForm.module.css';
import { sendSubscribeConfirmation } from '../../../services/emailService';

const SubscribeForm = ({ variant = 'dark' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await sendSubscribeConfirmation(data.email);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      {submitted ? (
        <div className={styles.success}>
          Thank you for subscribing.
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
                message: 'Invalid email',
              },
            })}
          />
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'SENDING...' : 'SUBSCRIBE'}
          </button>
        </form>
      )}
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default SubscribeForm;
