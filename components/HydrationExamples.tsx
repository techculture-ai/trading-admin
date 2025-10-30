'use client';

import { useHasMounted, useBrowserOnly, useLocalStorage } from '../hooks/useHydration';
import ClientOnly from './ClientOnly';

/**
 * Examples of common hydration issues and their solutions
 */
export default function HydrationExamples() {
  const hasMounted = useHasMounted();
  
  // ❌ BAD: This will cause hydration mismatch
  // const badCurrentTime = new Date().toLocaleString();
  
  // ✅ GOOD: Use client-only rendering for dynamic content
  const currentTime = useBrowserOnly(() => new Date().toLocaleString());
  
  // ✅ GOOD: Safe localStorage usage
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div className="p-6 space-y-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
      <h2 className="text-xl font-semibold">Hydration-Safe Examples</h2>
      
      {/* Example 1: Time display that's safe from hydration issues */}
      <div className="p-4 border rounded">
        <h3 className="font-medium mb-2">Current Time (Safe)</h3>
        <ClientOnly fallback={<div>Loading time...</div>}>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {currentTime || 'Loading...'}
          </p>
        </ClientOnly>
      </div>

      {/* Example 2: Theme toggle with localStorage */}
      <div className="p-4 border rounded">
        <h3 className="font-medium mb-2">Theme Toggle (Safe)</h3>
        {hasMounted && (
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Current theme: {theme}
          </button>
        )}
      </div>

      {/* Example 3: Window-dependent content */}
      <div className="p-4 border rounded">
        <h3 className="font-medium mb-2">Browser Info (Safe)</h3>
        <ClientOnly fallback={<div>Loading browser info...</div>}>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>User Agent: {typeof window !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
            <p>Screen Width: {typeof window !== 'undefined' ? window.screen.width : 'N/A'}</p>
          </div>
        </ClientOnly>
      </div>

      {/* Example 4: Random content that's hydration-safe */}
      <div className="p-4 border rounded">
        <h3 className="font-medium mb-2">Random Content (Safe)</h3>
        <ClientOnly fallback={<div>Generating random content...</div>}>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Random number: {Math.random().toFixed(4)}
          </p>
        </ClientOnly>
      </div>
    </div>
  );
}