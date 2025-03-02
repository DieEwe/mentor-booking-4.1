import type { Event } from '$lib/types/event';

export const mockEvents: Event[] = [
    // One event in the old format
    {
        id: 1,
        datum_uhrzeit: '2025-03-05T10:00:00',
        coach: 'Max Mustermann',
        companyname: 'Airbus Bremen',
        saeule: 'Leadership',
        mentors: ['Alice', 'Bob'],
        status: 'looking_for_mentor',
        mentorRequests: ['Clara', 'David'],
        assignedMentors: ['Alice']
    },
    // Nine events in the new format
    {
        id: 2,
        datum: '2025-03-10',
        uhrzeit: '14:00:00',
        coach: 'Erika Mustermann',
        companyname: 'Bruker Bremen',
        saeule: 'Innovation',
        mentors: ['Charlie'],
        status: 'mentor_found',
        mentorRequests: [],
        assignedMentors: ['Charlie']
    },
    {
        id: 3,
        datum: '2025-03-15',
        uhrzeit: '09:30:00',
        coach: 'Sabine Weber',
        companyname: 'Radio Bremen',
        saeule: 'Marketing',
        mentors: ['Grace', 'Heidi'],
        status: 'mentor_found',
        mentorRequests: [],
        assignedMentors: ['Grace']
    },
    {
        id: 4,
        datum: '2025-03-20',
        uhrzeit: '11:15:00',
        coach: 'Thomas Schmidt',
        companyname: 'Mercedes Bremen',
        saeule: 'Strategie',
        mentors: [],
        status: 'looking_for_mentor',
        mentorRequests: ['Felix', 'Hannah'],
        assignedMentors: []
    },
    {
        id: 5,
        datum: '2025-03-25',
        uhrzeit: '16:45:00',
        coach: 'Lisa Meyer',
        companyname: 'Werder Bremen',
        saeule: 'Leadership',
        mentors: [],
        status: 'in_process',
        mentorRequests: ['Isabella', 'Julian'],
        assignedMentors: []
    },
    {
        id: 6,
        datum: '2025-04-01',
        uhrzeit: '13:00:00',
        coach: 'Paul Wagner',
        companyname: 'Jacobs University',
        saeule: 'Innovation',
        mentors: ['Klara'],
        status: 'mentor_found',
        mentorRequests: [],
        assignedMentors: ['Klara']
    },
    {
        id: 7,
        datum: '2025-04-10',
        uhrzeit: '10:30:00',
        coach: 'Nina Fischer',
        companyname: 'Kühne + Nagel',
        saeule: 'Marketing',
        mentors: [],
        status: 'looking_for_mentor',
        mentorRequests: ['Lukas', 'Mia'],
        assignedMentors: []
    },
    {
        id: 8,
        datum: '2025-04-15',
        uhrzeit: '15:15:00',
        coach: 'Oliver Bauer',
        companyname: 'Vitakraft',
        saeule: 'Strategie',
        mentors: ['Nora'],
        status: 'mentor_found',
        mentorRequests: [],
        assignedMentors: ['Nora']
    },
    {
        id: 9,
        datum: '2025-04-20',
        uhrzeit: '08:45:00',
        coach: 'Sophie Klein',
        companyname: 'BLG Logistics',
        saeule: 'Leadership',
        mentors: [],
        status: 'in_process',
        mentorRequests: ['Oscar', 'Paula'],
        assignedMentors: []
    },
    {
        id: 10,
        datum: '2025-04-25',
        uhrzeit: '14:30:00',
        coach: 'Robert Müller',
        companyname: 'Univeg Deutschland',
        saeule: 'Innovation',
        mentors: ['Quentin', 'Rosa'],
        status: 'mentor_found',
        mentorRequests: [],
        assignedMentors: ['Quentin']
    }
];