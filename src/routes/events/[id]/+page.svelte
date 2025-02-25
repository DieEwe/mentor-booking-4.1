<script lang="ts">
    import EventDetailsCard from '$lib/components/EventDetailsCard.svelte';
    
    export let data;
</script>

<main>
    <EventDetailsCard event={data.event} />
</main>

<style>
    main {
        background: white; /* Specific use case for solid background */
  border-radius: 25px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  min-height: auto; /* Or any desired size */
    }
</style>