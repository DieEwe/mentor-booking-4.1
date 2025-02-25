export type EventStatus = 'looking_for_mentor' | 'in_process' | 'mentor_found';

export interface Event {
    id: string | number;
    datum_uhrzeit: string;
    coach: string;
    pledger: string;
    saeule: string;
    mentors: string[] // Changed from single mentor to array of mentors
    status: EventStatus;
    mentorRequests?: string[];  // Changed to array of requests
    assignedMentors?: string[]; // Changed to array of assigned mentors
}

// Helper function to create a new event with default values
export function createEvent(data: Partial<Event>): Event {
    return {
        id: '',
        datum_uhrzeit: '',
        coach: '',
        pledger: '',
        saeule: '',
        mentors: [],  // Initialize as empty array
        status: 'looking_for_mentor',
        ...data
    } as Event;
}

