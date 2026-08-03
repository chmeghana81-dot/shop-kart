import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@utils/helpers';

/**
 * Reusable section heading with optional "View All" CTA link.
 *
 * @param {{ title: string, subtitle?: string, href?: string, cta?: string, className?: string }} props
 */
export default function SectionHeader({ title, subtitle, href, cta = 'View All', className }) {
  return (
    <div className={cn('flex items-end justify-between gap-4 mb-6', className)}>
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      {href && (
        <Link
          to={href}
          className={cn(
            'flex items-center gap-1 flex-shrink-0',
            'text-sm font-semibold text-primary-500 hover:text-primary-600',
            'transition-colors duration-150 group'
          )}
        >
          {cta}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}
