import type { Event } from '../types/event';

export const mockEvents: Event[] = [
    // ...existing events (1 and 2)...
    {
        id: 3,
        datum_uhrzeit: '2025-02-25 09:30',
        coach: 'Sarah Klein',
        pledger: 'Werder Bremen',
        saeule: '2',
        mentors: [],
        status: 'in_process',
        mentorRequests: ['Anna Schmidt', 'Michael Wagner']  // Multiple requests
    },
    {
        id: 4,
        datum_uhrzeit: '2025-02-26 11:00',
        coach: 'David Schmidt',
        pledger: 'Sparkasse Bremen',
        saeule: '1',
        mentors: [],
        status: 'looking_for_mentor'
    },
    {
        id: 5,
        datum_uhrzeit: '2025-02-26 15:30',
        coach: 'Julia Peters',
        pledger: 'Universität Bremen',
        saeule: '3',
        mentors: ['Maria Müller', 'Peter Weber'],  // Multiple mentors
        status: 'mentor_found',
        assignedMentors: ['Maria Müller', 'Peter Weber']
    },
    {
        id: 6,
        datum_uhrzeit: '2025-02-27 13:00',
        coach: 'Thomas Becker',
        pledger: 'BSAG',
        saeule: '4',
        mentors: [],
        status: 'in_process',
        mentorRequests: ['Laura Koch']
    },
    {
        id: 7,
        datum_uhrzeit: '2025-02-28 10:00',
        coach: 'Anna Weber',
        pledger: 'Jacobs University',
        saeule: '2',
        mentors: [],
        status: 'looking_for_mentor'
    },
    {
        id: 8,
        datum_uhrzeit: '2025-03-01 14:30',
        coach: 'Mark Schmidt',
        pledger: 'Airbus Bremen',
        saeule: '1',
        mentors: ['Klaus Weber', 'Sandra Meyer'],
        status: 'mentor_found',
        assignedMentors: ['Klaus Weber', 'Sandra Meyer']
    },
    {
        id: 9,
        datum_uhrzeit: '2025-03-02 11:00',
        coach: 'Sophie Wagner',
        pledger: 'Mercedes-Benz Bremen',
        saeule: '4',
        mentors: [],
        status: 'in_process',
        mentorRequests: ['Peter Müller', 'Lisa Schmidt', 'Max Koch']  // Multiple requests
    },
    {
        id: 10,
        datum_uhrzeit: '2025-03-03 09:00',
        coach: 'Felix Bauer',
        pledger: 'Bruker Bremen',
        saeule: '3',
        mentors: [],
        status: 'looking_for_mentor'
    }
];