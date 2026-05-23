import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { subscribeApi } from '../../../services/api/subscribeApi';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      console.log('Submitting:', data);
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.formTitle}>Send a Message</h2>

      {submitted && (
        <div className={styles.successBox}>
          Thank you. We will get back to you soon.
        </div>
      )}

      <div className={styles.field}>
        <label>Name</label>
        <input type="text" {...register('name', { required: 'Name is required' })} />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </div>

      <div className={styles.field}>
        <label>Email</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
          })}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label>Subject</label>
        <input type="text" {...register('subject', { required: 'Subject is required' })} />
        {errors.subject && <span className={styles.error}>{errors.subject.message}</span>}
      </div>

      <div className={styles.field}>
        <label>Message</label>
        <textarea rows="5" {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Minimum 10 characters' } })} />
        {errors.message && <span className={styles.error}>{errors.message.message}</span>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={submitting}>
        {submitting ? 'SENDING...' : 'SEND MESSAGE'}
      </button>
    </form>
  );
};

export default ContactForm;
