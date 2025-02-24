export type UserRole = 'guest' | 'mentor' | 'coach' | 'admin';

export interface User {
	loggedIn: boolean;
    role: UserRole;  // Added this line
	email?: string;
	username?: string;
}

export interface UserAuth {
    id: string;
    email: string;
    role: UserRole;
    isLoggedIn: boolean;
}

export interface UserProfile {
    id: string;
    vorname: string;
    name: string;
    pronouns: string;
    role: UserRole;
    email: string;
    Zitat: string;
    disability: string;
    languages: string[];
    Beschreibung: string;
    avatar_url?: string;
}