// src/lib/stores.ts

import { writable } from 'svelte/store';
import type { User } from '$lib/types/user';

const initialGuestUser: User = {
  id: 0,
  vorname: 'VornameGuest',
  name: 'NachnameGuest',
  pronouns: '',
  role: 'guest',
  email: '',
  Zitat: '',
  disability: 'None',
  languages: [],
  Beschreibung: 'No profile available',
  loggedIn: false,
};

export const user = writable<User>(initialGuestUser);

export const theme = writable<'light' | 'dark'>('light');

// Subscribe to theme changes and update document attribute.
theme.subscribe(value => {
	if (typeof document !== 'undefined') {
		document.documentElement.setAttribute('data-theme', value);
	}
});
