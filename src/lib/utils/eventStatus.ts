import type { UserRole } from '../types/user';
import type { Event } from '../types/event';

export function getEventStatus(
    event: Event | { originalData: Event },
    userRole: UserRole,
    username?: string
): string {
    const eventData = 'originalData' in event ? event.originalData : event;

    console.log('Event Data:', eventData); // Log the event data
    console.log('User Role:', userRole);   // Log the user role
    console.log('Username:', username);     // Log the username
    console.log('Event Status:', eventData.status); // Log the event status

    if (userRole === 'mentor') {
        switch(eventData.status) {
            case 'looking_for_mentor':
            case 'in_process':
                return 'MentorIn gesucht';
            case 'mentor_found':
                return 'MentorIn gefunden';
        }
    }

    if (userRole === 'coach') {
        switch(eventData.status) {
            case 'looking_for_mentor':
                return 'MentorIn gesucht';
            case 'in_process':
                return 'Siehe Anfragen';
            case 'mentor_found':
                return 'MentorIn gefunden';
        }
    }

    return eventData.status;
}

export function isStatusClickable(event: Event, userRole: UserRole, username?: string): boolean {
    if (userRole === 'mentor') {
        return (event.status === 'looking_for_mentor' || event.status === 'in_process') &&
               (!username || 
                (!event.mentorRequests?.includes(username) && 
                 !event.assignedMentors?.includes(username)));
    }
    
    if (userRole === 'coach') {
        return event.status === 'in_process';
    }
    
    return false;
}