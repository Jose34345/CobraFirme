'use client';
import { type AnchorHTMLAttributes } from 'react';
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics';
export function TrackLink({ event, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { event: AnalyticsEvent }) {
 return <a {...props} onClick={(e) => { trackEvent(event); props.onClick?.(e); }} />;
}
