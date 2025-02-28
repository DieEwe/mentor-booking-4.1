// src/lib/mock/mockcompanies.ts
import type { PledgerProfile } from '$lib/types/company';

export const mockPledgers: PledgerProfile[] = [
    {
        id: 1,
        companyname: 'Jacobs University Bremen',
        logo_url: '/images/jacobs.png',
        description: 'An international, private, residential university.',
        website: 'https://www.jacobs-university.de',
    },
    {
        id: 2,
        companyname: 'Airbus Bremen',
        logo_url: '/images/airbus.png',
        description: 'A division of Airbus, the European aerospace giant.',
        website: 'https://www.airbus.com',
    },
        {
        id: 3,
        companyname: 'Mercedes-Benz Bremen',
        logo_url: '/images/mercedes.png',
        description: 'A division of mercedes, the european car giant.',
        website: 'https://www.mercedes-benz.com',
    },
    {
        id: 4,
        companyname: 'Bruker Bremen',
        logo_url: '/images/bruker.png',
        description: 'Leading manufacturer of scientific instruments.',
        website: 'https://www.bruker.com',
    },
];