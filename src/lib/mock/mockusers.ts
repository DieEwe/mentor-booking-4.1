import type { UserProfile, UserAuth } from '$lib/types/user';

export const mockUserProfiles: Record<string, UserProfile> = {
    admin: {
        id: '1',
        vorname: 'Admin',
        name: 'User',
        pronouns: 'they/them',
        role: 'admin',
        email: 'admin@example.com',
        Zitat: 'Managing the platform',
        disability: 'None',
        languages: ['Deutsch', 'English'],
        Beschreibung: 'Platform administrator'
    },
    mentor: {
        id: '2',
        vorname: 'Mentor',
        name: 'Example',
        pronouns: 'she/her',
        role: 'mentor',
        email: 'mentor@example.com',
        Zitat: 'Helping others succeed',
        disability: 'None',
        languages: ['Deutsch'],
        Beschreibung: 'Experienced mentor'
    },
    coach: {
        id: '3',
        vorname: 'Coach',
        name: 'Test',
        pronouns: 'he/him',
        role: 'coach',
        email: 'coach@example.com',
        Zitat: 'Supporting growth',
        disability: 'None',
        languages: ['Deutsch', 'English', 'Español'],
        Beschreibung: 'Professional coach'
    }
};

export const mockAuth: Record<string, UserAuth> = {
    admin: {
        id: '1',
        email: 'admin@example.com',
        role: 'admin',
        isLoggedIn: true
    },
    mentor: {
        id: '2',
        email: 'mentor@example.com',
        role: 'mentor',
        isLoggedIn: true
    },
    coach: {
        id: '3',
        email: 'coach@example.com',
        role: 'coach',
        isLoggedIn: true
    }
};