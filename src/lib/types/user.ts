// $lib/types/user.ts

export type UserRole = 'guest' | 'mentor' | 'coach' | 'admin';

export interface User {
  id: number;
  loggedIn: boolean;
  vorname: string;
  name: string;
  pronouns: string;
  role: UserRole;
  email: string;
  Zitat: string;
  disability: string;
  languages: string[];
  Beschreibung: string;
}


// Optionally, export a type for collections of users.
export type MockUsers = {
	[id: string]: User;
};
