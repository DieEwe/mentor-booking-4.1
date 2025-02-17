import { writable } from 'svelte/store';

interface User {
    loggedIn: boolean;
    // Add other user properties as needed
}

export const user = writable<User>({
    loggedIn: false
});