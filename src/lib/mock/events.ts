import type { Event } from '$lib/types/event';

export const mockEvents: Event[] = [
    {
        id: 1,
        datum_uhrzeit: '2025-02-24 10:00',
        coach: 'Max Mustermann',
        pledger: 'Radio Bremen',
        saeule: '4',
        mentor: 'Anna Schmidt',
        status: 'Bestätigt'
    },
    {
        id: 2,
        datum_uhrzeit: '2025-02-24 14:00',
        coach: 'Lisa Weber',
        pledger: 'Technologiepark',
        saeule: '3',
        mentor: 'Tom Meyer',
        status: 'Ausstehend'
    },
    {
        id: 3,
        datum_uhrzeit: '2025-02-25 09:00',
        coach: 'Sarah Mueller',
        pledger: 'Sparkasse Bremen',
        saeule: '2',
        mentor: 'Peter Wagner',
        status: 'Bestätigt'
    },
    {
        id: 4,
        datum_uhrzeit: '2025-02-25 13:00',
        coach: 'Thomas Klein',
        pledger: 'Werder Bremen',
        saeule: '5',
        mentor: 'Maria Koch',
        status: 'Abgesagt'
    },
    {
        id: 5,
        datum_uhrzeit: '2025-02-26 11:00',
        coach: 'Julia Berg',
        pledger: 'Universität Bremen',
        saeule: '1',
        mentor: 'Klaus Weber',
        status: 'Bestätigt'
    },
    {
        id: 6,
        datum_uhrzeit: '2025-02-26 15:00',
        coach: 'Mark Schmidt',
        pledger: 'BSAG',
        saeule: '3',
        mentor: 'Sandra Wolf',
        status: 'Ausstehend'
    },
    {
        id: 7,
        datum_uhrzeit: '2025-02-27 10:00',
        coach: 'Anna Beck',
        pledger: 'Bremer Bank',
        saeule: '4',
        mentor: 'Michael Bauer',
        status: 'Bestätigt'
    },
    {
        id: 8,
        datum_uhrzeit: '2025-02-27 14:00',
        coach: 'Paul Werner',
        pledger: 'Hafengesellschaft',
        saeule: '2',
        mentor: 'Laura Krause',
        status: 'Ausstehend'
    },
    {
        id: 9,
        datum_uhrzeit: '2025-02-28 09:00',
        coach: 'Eva Fischer',
        pledger: 'Handelskammer',
        saeule: '5',
        mentor: 'Martin Scholz',
        status: 'Bestätigt'
    },
    {
        id: 10,
        datum_uhrzeit: '2025-02-28 13:00',
        coach: 'David Wagner',
        pledger: 'Stadtbibliothek',
        saeule: '1',
        mentor: 'Christina Meyer',
        status: 'Abgesagt'
    }
];