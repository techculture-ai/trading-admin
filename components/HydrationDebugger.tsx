'use client';

import { useEffect } from 'react';

interface HydrationDebuggerProps {
  enabled?: boolean;
}

/**
 * Component to help debug hydration issues in development
 * Add this to your layout or page components during development
 */
export default function HydrationDebugger({ enabled = process.env.NODE_ENV === 'development' }: HydrationDebuggerProps) {
  useEffect(() => {
    if (!enabled) return;

    // Listen for hydration errors
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('Hydration failed') || 
          event.message.includes('Text content does not match') ||
          event.message.includes('did not match')) {
        console.group('🔍 Hydration Error Detected');
        console.error('Error:', event.error);
        console.log('Message:', event.message);
        console.log('Filename:', event.filename);
        console.log('Line:', event.lineno);
        console.log('Column:', event.colno);
        
        // Log potential causes
        console.group('💡 Common Causes:');
        console.log('1. Date.now() or Math.random() used during render');
        console.log('2. typeof window !== "undefined" checks');
        console.log('3. Browser extensions modifying DOM');
        console.log('4. Invalid HTML nesting');
        console.log('5. Locale-specific formatting');
        console.log('6. External data changes between server and client');
        console.groupEnd();
        
        console.groupEnd();
      }
    };

    // Listen for React hydration warnings
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('Warning: Text content did not match') ||
           message.includes('Warning: Expected server HTML to contain'))) {
        console.group('⚠️ React Hydration Warning');
        originalConsoleError.apply(console, args);
        console.log('🔧 Tip: Use ClientOnly component or useHasMounted hook for client-only content');
        console.groupEnd();
      } else {
        originalConsoleError.apply(console, args);
      }
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      console.error = originalConsoleError;
    };
  }, [enabled]);

  return null;
}