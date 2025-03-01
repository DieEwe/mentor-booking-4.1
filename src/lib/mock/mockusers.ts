// src/lib/mock/mockusers.ts

import type { User } from '$lib/types/user';


export const mockUsers: User[] = [

    {
        id: 1,
		vorname: 'Hannah',
		name: 'User',
		pronouns: 'they/them',
		role: 'admin',
		email: 'Hannah@example.de',
		Zitat: 'Managing the coffee',
		disability: 'None',
		languages: ['Deutsch', 'English'],
		Beschreibung: 'tree administrator',
        loggedIn: false
	},
    {
		id: 2,
        vorname: 'Karl',
		name: 'User',
		pronouns: 'they/them',
		role: 'admin',
		email: 'Karl@example.com',
		Zitat: 'Managing the plants',
		disability: 'None',
		languages: ['Deutsch', 'English'],
		Beschreibung: 'Platform planter',
        loggedIn: false
	},

    {
        id: 3,
		vorname: 'Alice',
		name: 'Miller',
		pronouns: 'she/her',
		role: 'mentor',
		email: 'alice.miller@example.com',
		Zitat: 'Inspiring others to excel',
		disability: 'None',
		languages: ['English', 'Spanish'],
		Beschreibung: 'Experienced mentor with a passion for teaching',
        loggedIn: false
	},

    {
        id: 4,
		vorname: 'Bob',
		name: 'Anderson',
		pronouns: 'he/him',
		role: 'coach',
		email: 'bob.anderson@example.com',
		Zitat: 'Learning every day',
		disability: 'None',
		languages: ['Deutsch'],
		Beschreibung: 'Aspiring professional eager to learn and grow',
        loggedIn: false
	}
]
