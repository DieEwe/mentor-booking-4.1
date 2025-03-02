
import type { PageLoad } from './$types';
import type { CalendarEvent } from '$lib/types/event-calendar';
import { mockEvents } from '$lib/mock/mockevents';
import { getDateTime } from '$lib/utils/dateUtils';

export const load: PageLoad = async () => {
    try {
        // Use mockEvents directly instead of fetchEvents()
        const calendarEvents: CalendarEvent[] = mockEvents.map(event => ({
            id: String(event.id),
            title: `${event.companyname} - ${event.coach}`,
            start: getDateTime(event), // Use utility function if you have it
            end: getDateTime(event),   // Use utility function
            color: '#4338ca',
            description: `Säule: ${event.saeule}`,
            originalData: event
        }));

        return {
            events: calendarEvents
        };
    } catch (error) {
        console.error('Error loading mock events:', error);
        return { events: [] };
    }
};