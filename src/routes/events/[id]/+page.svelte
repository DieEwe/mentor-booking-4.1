<script lang="ts">
    import EventDetailsCard from '$lib/components/EventDetailsCard.svelte';
    
    export let data;
</script>

<EventDetailsCard event={data.event} />