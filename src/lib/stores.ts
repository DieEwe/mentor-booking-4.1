import { writable } from 'svelte/store';

interface User {
	loggedIn: boolean;
	email?: string;
	username?: string;
}

export const user = writable<User>({ loggedIn: false });
