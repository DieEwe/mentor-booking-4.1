import type { Event } from '../types/event';

/**
 * Gets the datetime from an event, handling both combined and separate fields
 */
export function getDateTime(event: Event): string {
    if ('datum_uhrzeit' in event && event.datum_uhrzeit) {
        return event.datum_uhrzeit;
    } else if (event.datum && event.uhrzeit) {
        return `${event.datum}T${event.uhrzeit}`;
    }
    return new Date().toISOString(); // Fallback
}

/**
 * Formats the date part only
 */
export function formatDate(event: Event): string {
    const dateTimeString = getDateTime(event);
    const date = new Date(dateTimeString);
    
    return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

/**
 * Formats the time part only
 */
export function formatTime(event: Event): string {
    const dateTimeString = getDateTime(event);
    const date = new Date(dateTimeString);
    
    return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Formats a datetime for display (combined)
 */
export function formatDateTime(event: Event): string {
    return `${formatDate(event)} ${formatTime(event)}`;
}