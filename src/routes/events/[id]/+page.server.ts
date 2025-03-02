import type { PageServerLoad } from './$types';
import { mockEvents } from '$lib/mock/mockevents';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const eventId = parseInt(params.id);
    const event = mockEvents.find(e => e.id === eventId);
    
    if (!event) {
        throw error(404, 'Event not found');
    }
    
    // Log the found event for debugging
    console.log('Loading actual event from mockEvents:', event);
    console.log('Event status:', event.status);
    
    return {
        event
    };
};