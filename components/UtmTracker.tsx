'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { usePathname, useSearchParams } from 'next/navigation';

export function UtmTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const source = searchParams.get('utm_source');
    if (!source) return;

    track('utm_landing', {
      source,
      medium: searchParams.get('utm_medium') ?? '(none)',
      campaign: searchParams.get('utm_campaign') ?? '(none)',
      page: pathname,
    });
  }, [pathname, searchParams]);

  return null;
}
