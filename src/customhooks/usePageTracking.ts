// hooks/usePageTracking.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function usePageTracking(measurementId: string) {
  const location = useLocation();

  useEffect(() => {
    if (!(window as any).gtag) return;
    (window as any).gtag('config', measurementId, {
      page_path: location.pathname + location.search,
    });
  }, [location, measurementId]);
}
