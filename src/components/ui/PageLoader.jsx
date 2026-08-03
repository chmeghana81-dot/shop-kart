/**
 * Full-screen loading spinner shown during Suspense fallback
 * (lazy page loads, heavy async ops).
 */
export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-950">
      <div className="relative">
        {/* Outer ring */}
        <span className="block w-16 h-16 rounded-full border-4 border-primary-100 dark:border-gray-700" />
        {/* Spinning arc */}
        <span className="absolute inset-0 block w-16 h-16 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
      </div>
      <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">
        Loading…
      </p>
    </div>
  );
}
