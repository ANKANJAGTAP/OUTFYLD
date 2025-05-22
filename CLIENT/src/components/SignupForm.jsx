import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CheckCircle, Send } from 'lucide-react';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const resetTimeout = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Signup failed');
      }

      setIsSubmitted(true);
      setName('');
      setEmail('');
      setConsent(false);
    } catch (err) {
      console.error('Signup error:', err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
      resetTimeout.current = setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (buttonRef.current && iconRef.current && !isSubmitting) {
      const button = buttonRef.current;
      const icon = iconRef.current;
      const onEnter = () => gsap.to(icon, { rotation: 360, scale: 1.2, duration: 0.5, ease: 'back.out' });
      const onLeave = () => gsap.to(icon, { rotation: 0, scale: 1, duration: 0.5, ease: 'back.out' });
      button.addEventListener('mouseenter', onEnter);
      button.addEventListener('mouseleave', onLeave);
      return () => {
        button.removeEventListener('mouseenter', onEnter);
        button.removeEventListener('mouseleave', onLeave);
      };
    }
  }, [isSubmitting]);

  useEffect(() => () => clearTimeout(resetTimeout.current), []);

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 text-charcoal dark:text-white">
          REGISTER NOW TO GET EXCLUSIVE DISCOUNT
        </h2>
        <p className="text-charcoal/80 dark:text-lightGray">
          The first 100 signups will receive a 50% discount on their first purchase.
        </p>
      </div>
      <div className="bg-white dark:bg-charcoal border-2 border-lightGray dark:border-lightGray/20 rounded-lg shadow-lg p-8">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8" aria-live="polite">
            <CheckCircle className="text-neonGreen w-16 h-16 mb-4" />
            <h3 className="text-xl font-bold text-charcoal dark:text-white mb-2">
              You're on the list!
            </h3>
            <p className="text-center text-charcoal/80 dark:text-lightGray">
              Thanks for signing up. We'll keep you posted on our progress.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-charcoal dark:text-white">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-field w-full"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-charcoal dark:text-white">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field w-full"
                placeholder="john@example.com"
              />
            </div>
            <div className="flex items-start">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-1 h-4 w-4 text-neonGreen focus:ring-neonGreen rounded"
              />
              <label htmlFor="consent" className="ml-2 text-sm text-charcoal/80 dark:text-lightGray">
                I consent to receive emails about PITCH PERFECT and understand I can unsubscribe anytime.
              </label>
            </div>
            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full btn-primary flex items-center justify-center relative text-white"
            >
              {isSubmitting ? 'Processing...' : 'Sign Up for Early Access'}
              <div ref={iconRef} className="absolute right-4">
                {isSubmitting ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </div>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default SignupForm;