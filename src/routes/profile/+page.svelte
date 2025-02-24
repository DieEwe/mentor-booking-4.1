<script lang="ts">
    import ProfileCard from '$lib/components/UserProfileCard.svelte';
    import type { UserData } from '$lib/types/user';
    
    // TODO: Replace with Supabase data fetch
    // This will be replaced with actual data from Supabase
    let userData: UserData = {
        id: "mock-id-123",
        vorname: 'Max',
        name: 'Mustermann',
        pronouns: 'er/ihm',
        role: 'Mentor',
        email: 'max.mustermann@example.com',
        Zitat: 'Erfolg ist nicht final, Misserfolg ist nicht fatal. Was zählt ist der Mut weiterzumachen.',
        disability: 'keine Angabe',
        languages: ['Deutsch', 'Englisch', 'Spanisch'],
        Beschreibung: 'Als erfahrener Mentor im IT-Bereich unterstütze ich Menschen dabei, ihre Ziele zu erreichen und ihr volles Potenzial zu entfalten.'
    };

    /* TODO: Add this when implementing Supabase
    import { page } from '$app/stores';
    import { supabase } from '$lib/supabaseClient';

    async function fetchProfile() {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', $page.params.id)
            .single();

        if (data) userData = data;
    }

    // Call on component mount
    onMount(() => {
        fetchProfile();
    });
    */
</script>

<main>
    <ProfileCard {userData} />
</main>
  
<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
    }
</style>
