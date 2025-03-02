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

// ENHANCED THEME IMPLEMENTATION
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  
  // Check localStorage first
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }
  
  // Check system preference as fallback
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const theme = writable<'light' | 'dark'>(getInitialTheme());

// Helper function to toggle theme
export function toggleTheme() {
  theme.update(current => {
    const newTheme = current === 'light' ? 'dark' : 'light';
    
    // Save to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
    
    return newTheme;
  });
}

// Apply theme to document whenever it changes
theme.subscribe(value => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', value);
  }
});

// Initialize theme from system preference changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Only update if user hasn't explicitly set a preference
    if (!localStorage.getItem('theme')) {
      theme.set(e.matches ? 'dark' : 'light');
    }
  });
}