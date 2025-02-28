import type { Event } from '$lib/types/event';
import { mockPledgers } from './mockcompanies';

// Helper function to get a random element from an array
function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const mockEvents: Event[] = [
    {
        id: '1',
        datum_uhrzeit: '2024-07-10T10:00:00',
        coach: 'Max Mustermann',
        companyname: 'Airbus Bremen', // Assign random company name
        saeule: 'Leadership',
        mentors: ['Alice', 'Bob'],
        status: 'looking_for_mentor',
		mentorRequests: ['Clara', 'David'],
		assignedMentors: ['Alice']
    },
    {
        id: '2',
        datum_uhrzeit: '2024-07-15T14:00:00',
        coach: 'Erika Mustermann',
        companyname: 'Bruker Bremen', // Assign random company name
        saeule: 'Innovation',
        mentors: ['Charlie'],
        status: 'mentor_found',
		mentorRequests: ['Eve', 'Frank'],
		assignedMentors: ['Charlie']
    },
    {
        id: '3',
        datum_uhrzeit: '2024-07-20T09:00:00',
        coach: 'Max Mustermann',
        companyname: 'Airbus Bremen', // Assign random company name
        saeule: 'Marketing',
        mentors: ['Grace', 'Heidi'],
        status: 'mentor_found',
		mentorRequests: ['Judy', 'Ivy'],
		assignedMentors: ['Grace']
    },
    {
        id: '4',
        datum_uhrzeit: '2024-07-25T11:00:00',
        coach: 'Erika Mustermann',
        companyname: 'Bruker Bremen', // Assign random company name
        saeule: 'Sales',
        mentors: ['Kevin'],
        status: 'in_process',
		mentorRequests: ['Lisa', 'Mike'],
		assignedMentors: ['Kevin']
    },
	{
        id: '5',
        datum_uhrzeit: '2024-08-01T16:00:00',
        coach: 'John Doe',
        companyname: 'Bruker Bremen',
        saeule: 'Technology',
        mentors: ['Nancy', 'Oscar'],
        status: 'mentor_found',
		mentorRequests: ['Peggy', 'Quentin'],
		assignedMentors: ['Nancy']
    },
    {
        id: '6',
        datum_uhrzeit: '2024-08-05T13:00:00',
        coach: 'Jane Smith',
        companyname: 'Airbus Bremen',
        saeule: 'Finance',
        mentors: ['Rachel'],
        status: 'mentor_found',
		mentorRequests: ['Steve', 'Tina'],
		assignedMentors: ['Rachel']
    },
    {
        id: '7',
        datum_uhrzeit: '2024-08-12T17:00:00',
        coach: 'John Doe',
        companyname: 'Bruker Bremen',
        saeule: 'Human Resources',
        mentors: ['Uma', 'Victor'],
        status: 'mentor_found',
		mentorRequests: ['Wendy', 'Xavier'],
		assignedMentors: ['Uma']
    },
    {
        id: '8',
        datum_uhrzeit: '2024-08-18T10:00:00',
        coach: 'Jane Smith',
        companyname: 'Mercedes-Benz Bremen',
        saeule: 'Operations',
        mentors: ['Yara'],
        status: 'in_process',
		mentorRequests: ['Zack', 'Amy'],
		assignedMentors: ['Yara']
    }
];