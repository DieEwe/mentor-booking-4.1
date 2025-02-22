import { writable } from 'svelte/store';

interface User {
	loggedIn: boolean;
	email?: string;
	username?: string;
}

export const user = writable<User>({ loggedIn: false });

export const theme = writable<'light' | 'dark'>('light');

// Subscribe to theme changes and update document
theme.subscribe(value => {
    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', value);
    }
});
