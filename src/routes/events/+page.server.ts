import type { PageServerLoad } from './$types';
import type { CalendarEvent } from '$lib/types/event-calendar';
import { mockEvents } from '$lib/mock/mockevents';
import { getDateTime } from '$lib/utils/dateUtils';

export const load: PageServerLoad = async () => {
    try {
        const calendarEvents: CalendarEvent[] = mockEvents.map(event => ({
            id: String(event.id),
            title: event.companyname ?? 'No Company Name',
            start: getDateTime(event), // Use utility function
            end: getDateTime(event),   // Use utility function
            description: `Säule: ${event.saeule}`,
            originalData: event
        }));

        // Debug log to verify data
        console.log('Calendar Events:', calendarEvents);

        return {
            events: calendarEvents
        };
    } catch (error) {
        console.error('Error loading events:', error);
        return { events: [] };
    }
};