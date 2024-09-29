'use client';

import { useEffect, useState } from 'react';

export function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      console.error('Unhandled error:', error);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong.</h2>
        <button onClick={() => window.location.reload()}>Refresh the page</button>
      </div>
    );
  }

  return children;
}