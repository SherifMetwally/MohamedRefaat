'use client';

'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

interface LoadingContextType {
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // Reset loading when pathname changes (navigation complete)
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {children}
      {isLoading && <LoadingSpinner />}
    </LoadingContext.Provider>
  );
}

