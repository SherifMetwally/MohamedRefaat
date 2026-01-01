'use client';

import Link from 'next/link';
import { useLoading } from './LoadingProvider';
import { ReactNode } from 'react';

interface LoadingLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function LoadingLink({ href, children, className, onClick }: LoadingLinkProps) {
  const { setIsLoading } = useLoading();

  const handleClick = () => {
    setIsLoading(true);
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

