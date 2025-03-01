import type { PageLoad } from './$types';
import type { User } from '$lib/types/user'; // Assuming you have a User type

export const load: PageLoad = async ({ params }) => {
    const userId = params.id;

    // TODO: Replace with Supabase (or other DB) query
    // Get the user data from your database based on the user ID.
    // Example using a mock user for now:

    const user: User = {
        id: parseInt(userId),
        loggedIn: true,
        name: 'Doe',
        vorname: 'John',
        email: 'john.doe@example.com',
        role: 'mentor',
        pronouns: 'he/him',
        languages: ['English', 'German'],
        disability: 'None',
        Zitat: "The only way to do great work is to love what you do.",
        Beschreibung: "A passionate mentor with years of experience...",
    };

    return {
        user
    };
};