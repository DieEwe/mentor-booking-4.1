// src/lib/types/event.ts
export type EventStatus = 'looking_for_mentor' | 'in_process' | 'mentor_found';


export interface Event {
    id: string;
    datum_uhrzeit: string;
    coach: string;
    companyname: string; // Added companyname property
    saeule: string;
    mentors?: string[];
    status: string;
	mentorRequests?: string[]; // Add mentorRequests
	assignedMentors?: string[]; // Add assigned Mentors
}

