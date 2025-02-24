import type { PageServerLoad } from './$types';
import type { CalendarEvent } from '$lib/types/event-calendar';
import { mockEvents } from '$lib/mock/events';

export const load: PageServerLoad = async () => {
    try {
        // TODO: Replace with Supabase query when implementing
        /* 
        const { data: events, error } = await supabase
            .from('events')
            .select('*')
            .order('datum_uhrzeit', { ascending: true });

        if (error) throw error;
        */

        const calendarEvents: CalendarEvent[] = mockEvents.map(event => ({
            id: event.id,
            title: event.pledger,
            start: event.datum_uhrzeit,
            end: event.datum_uhrzeit,
            description: `Säule: ${event.saeule}, MentorIn: ${event.mentor}`,
            originalData: event
        }));

        return {
            events: calendarEvents
        };
    } catch (error) {
        console.error('Error loading events:', error);
        return { events: [] };
    }
};
