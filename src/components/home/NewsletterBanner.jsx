import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@utils/helpers';

export default function NewsletterBanner() {
  const [email,     setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden py-16',
        'bg-gradient-to-br from-primary-500 via-orange-500 to-rose-500'
      )}
    >
      {/* Decorative circles */}
      <div aria-hidden className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
      <div aria-hidden className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/5" />

      <div className="page-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 mb-5">
            <Mail size={26} className="text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Get Exclusive Deals First
          </h2>
          <p className="text-white/80 text-base mb-8 max-w-md mx-auto">
            Subscribe to our newsletter and be the first to hear about flash sales, new arrivals, and members-only discounts.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              className="inline-flex items-center gap-2 bg-white text-green-600 font-semibold px-6 py-3 rounded-full text-sm shadow-lg"
            >
              <CheckCircle size={18} />
              You&apos;re subscribed! Welcome aboard 🎉
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className={cn(
                  'flex-1 px-5 py-3.5 rounded-full',
                  'bg-white text-gray-900 placeholder:text-gray-400',
                  'focus:outline-none focus:ring-2 focus:ring-white/50',
                  'text-sm'
                )}
              />
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'px-6 py-3.5 rounded-full font-bold text-sm',
                  'bg-gray-900 hover:bg-gray-800 text-white',
                  'transition-colors duration-150',
                  'disabled:opacity-60 disabled:cursor-not-allowed',
                  'flex-shrink-0'
                )}
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {!submitted && (
            <p className="text-white/60 text-xs mt-4">
              No spam, ever. Unsubscribe anytime. 🔒 Your data is safe with us.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
