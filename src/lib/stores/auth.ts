import { writable } from 'svelte/store';
import type { UserAuth } from '$lib/types/user';

// Initial state
const defaultAuth: UserAuth = {
    id: '',
    email: '',
    role: 'guest',
    isLoggedIn: false
};

export const authStore = writable<UserAuth>(defaultAuth);