import { Link } from 'react-router-dom';
import {
  Facebook, Twitter, Instagram, Youtube,
  MapPin, Phone, Mail, ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@utils/helpers';
import { ROUTES } from '@constants/routes';
import toast from 'react-hot-toast';

const COMPANY_LINKS = [
  { label: 'About Us',      to: '#' },
  { label: 'Careers',       to: '#' },
  { label: 'Press',         to: '#' },
  { label: 'Blog',          to: '#' },
  { label: 'Affiliate',     to: '#' },
];

const SUPPORT_LINKS = [
  { label: 'Help Center',   to: '#' },
  { label: 'Returns',       to: '#' },
  { label: 'Order Status',  to: ROUTES.ORDERS  },
  { label: 'Payment Info',  to: '#' },
  { label: 'Contact Us',    to: '#' },
];

const ACCOUNT_LINKS = [
  { label: 'My Account',   to: ROUTES.PROFILE  },
  { label: 'My Orders',    to: ROUTES.ORDERS   },
  { label: 'Wishlist',     to: ROUTES.WISHLIST },
  { label: 'Cart',         to: ROUTES.CART     },
  { label: 'Track Order',  to: '#'             },
];

const SOCIAL_LINKS = [
  { icon: Facebook,  href: '#', label: 'Facebook'  },
  { icon: Twitter,   href: '#', label: 'Twitter'   },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube,   href: '#', label: 'YouTube'   },
];

const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
      {title}
    </h3>
    <ul className="space-y-2.5">
      {links.map(({ label, to }) => (
        <li key={label}>
          <Link
            to={to}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-150"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Four-column footer with newsletter signup, social links, and legal row.
 */
export default function Footer() {
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Simulate async subscribe
    setTimeout(() => {
      toast.success('You are subscribed to our newsletter!');
      setEmail('');
      setLoading(false);
    }, 800);
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      {/* Main grid */}
      <div className="page-container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to={ROUTES.HOME} className="inline-block mb-4">
              <span className="text-2xl font-extrabold text-primary-500 tracking-tight">
                Shop<span className="text-gray-900 dark:text-white">Kart</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed mb-5">
              Your one-stop destination for fashion, electronics, home essentials and more — delivered fast, guaranteed authentic.
            </p>

            {/* Contact */}
            <ul className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-primary-500" />
                123 Commerce Street, Bengaluru, India
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="flex-shrink-0 text-primary-500" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="flex-shrink-0 text-primary-500" />
                support@shopkart.in
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    'bg-gray-200 dark:bg-gray-700',
                    'text-gray-600 dark:text-gray-300',
                    'hover:bg-primary-500 hover:text-white',
                    'transition-colors duration-200'
                  )}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="Company"  links={COMPANY_LINKS} />
          <FooterColumn title="Support"  links={SUPPORT_LINKS} />
          <FooterColumn title="My Account" links={ACCOUNT_LINKS} />
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get deals, new arrivals and exclusive offers straight to your inbox.
              </p>
            </div>
            <form
              onSubmit={handleNewsletter}
              className="flex w-full sm:w-auto gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field rounded-full text-sm min-w-0 flex-1 sm:w-60"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary rounded-full flex-shrink-0"
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowRight size={16} />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="page-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} ShopKart. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
