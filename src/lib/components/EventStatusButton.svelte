<script lang="ts">
    import type { Event } from '$lib/types/event';
    import { getEventStatus, isStatusClickable } from '$lib/utils/eventStatus';
    import { user } from '$lib/stores';
    import { createEventDispatcher } from 'svelte';
    
    export let event: Event;
    
    const dispatch = createEventDispatcher<{
        statusClick: Event;
    }>();
    
    $: status = getEventStatus(event, $user.role, $user.vorname);
    $: clickable = isStatusClickable(event, $user.role, $user.vorname);
    $: statusClass = status.toLowerCase().replace(/ /g, '-');
    
    function handleClick() {
        if (clickable) {
            dispatch('statusClick', event);
        }
    }
</script>

<button 
    class="status-button {statusClass}" 
    class:clickable
    on:click={handleClick}
    disabled={!clickable}
>
    {status}
</button>

<!-- No styles here -->