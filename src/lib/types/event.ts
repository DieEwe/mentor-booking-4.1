// src/lib/types/event.ts
export type EventStatus = 'looking_for_mentor' | 'in_process' | 'mentor_found';


export interface Event {
    id: number;
    // Support both formats
    datum_uhrzeit?: string;  // Old format (can be null/undefined)
    datum?: string;          // New format: date only (YYYY-MM-DD)
    uhrzeit?: string;        // New format: time only (HH:MM:SS)
    coach: string;
    companyname: string;
    saeule: string;
    mentors?: string[];
    status: string;
    mentorRequests?: string[];
    assignedMentors?: string[];
}
