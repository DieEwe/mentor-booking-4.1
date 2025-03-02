<script lang="ts">
    import ProfileCard from '$lib/components/UserProfileCard.svelte';
    import { user } from '$lib/stores';  // Import the user store


    // Subscribe to user store changes
    $: userData = $user.loggedIn ? $user : undefined;  // Use lowercase 'user' store
</script>

<div class="transparent-container">
    <div class="profile-container">
        {#if userData}
            <ProfileCard {userData} />
        {:else}
            <p>Please log in to view your profile.</p>
        {/if}
    </div>
</div>

<style>
    .profile-container {
        align-self: center;
    }
</style>