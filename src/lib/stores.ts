import { writable } from 'svelte/store';
import type { UserRole } from './types/user';



interface UserState {
    loggedIn: boolean;
    role: UserRole;
    email?: string;
    username?: string;
}

const initialState: UserState = {
    loggedIn: false,
    role: 'guest'
};

export const user = writable<UserState>(initialState);


export const theme = writable<'light' | 'dark'>('light');

// Subscribe to theme changes and update document
theme.subscribe(value => {
    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', value);
    }
});
