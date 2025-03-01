import type { PageLoad } from './$types';
import type { Event } from '$lib/types/event';

export const load: PageLoad = async ({ params }) => {
    // TODO: Replace with Supabase query when implementing
    /* 
    const { data: event, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', params.id)
        .single();
    */

    // For now, return mock data
    const event: Event = {
        id: parseInt(params.id),
    datum_uhrzeit: '2025-02-24 10:00',
    coach: 'Max Mustermann',
    companyname: 'Radio Bremen',
    saeule: '4',
    mentors: [],  // Initialize as empty array
    status: 'looking_for_mentor',
    mentorRequests: [],  // Initialize as empty array
    assignedMentors: []  // Initialize as empty array
    };

    return {
        event
    };
};