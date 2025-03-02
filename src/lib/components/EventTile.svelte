<!-- src/lib/components/EventTile.svelte -->
<script lang="ts">
    import type { Event } from '$lib/types/event';
    import { formatDateTime } from '$lib/utils/dateUtils';
    import EventStatusButton from './EventStatusButton.svelte';
    import { goto } from '$app/navigation';
    import { createEventDispatcher, type EventDispatcher } from 'svelte';
    
    export let event: Event;
    
    // Properly typed event dispatcher
    const dispatch: EventDispatcher<{
        statusClick: Event;
    }> = createEventDispatcher();

    function handleTileClick(e: MouseEvent) {
        // Don't navigate if the status button was clicked
        if ((e.target as HTMLElement).closest('.status-button-container')) {
            return;
        }
        goto(`/events/${event.id}`);
    }
    
    function handleKeyDown(e: KeyboardEvent) {
        // Navigate on Enter or Space key
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goto(`/events/${event.id}`);
        }
    }
    
    function handleStatusClick(e: CustomEvent<Event>) {
        e.stopPropagation(); // Prevent tile click
        dispatch('statusClick', e.detail);
    }
</script>

<div 
    class="event-tile" 
    on:click={handleTileClick}
    on:keydown={handleKeyDown}
    role="button"
    tabindex="0"
>
    <div class="event-tile-header">
        <h3>{event.companyname}</h3>
        <div class="status-button-container">
            <EventStatusButton {event} on:statusClick={handleStatusClick} />
        </div>
    </div>
    <div class="event-tile-details">
        <div class="detail-item">
            <span class="label">Datum & Uhrzeit:</span>
            <span class="value">{formatDateTime(event)}</span>
        </div>
    </div>
</div>

<style>
    .event-tile {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        cursor: pointer;
        background: white;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .event-tile:hover, .event-tile:focus {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .event-tile-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }

    h3 {
        margin: 0;
        font-size: 1.2rem;
    }

    .detail-item {
        margin-bottom: 8px;
        font-size: 0.9rem;
    }

    .label {
        font-weight: 600;
        margin-right: 4px;
    }

    /* Focus styles for keyboard navigation */
    .event-tile:focus {
        outline: 2px solid #4299e1;
        outline-offset: 2px;
    }
</style>