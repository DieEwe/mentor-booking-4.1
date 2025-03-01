import { writable } from 'svelte/store';
import type { User } from '$lib/types/user';

// Now update any function signatures or variables that formerly used UserAuth:
export function login(user: User) {
	// authentication logic using the new user shape
	// e.g., check user.email, user.role, etc.
}