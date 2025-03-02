<script lang="ts">
    import UserProfileCard from '$lib/components/UserProfileCard.svelte';
    import { user } from '$lib/stores';
    export let data;
</script>

<div class="transparent-container">
    <main>
        <UserProfileCard userData={data.user} />
    </main>
</div>


<style>
    main {
        background: white; /* Specific use case for solid background */
        border-radius: 25px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        padding: 2rem;
        min-height: auto; /* Or any desired size */
    }
</style>