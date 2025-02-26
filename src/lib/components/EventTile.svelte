<script lang="ts">
    import type { Event } from '$lib/types/event';
    import { getEventStatus } from '$lib/utils/eventStatus';
    import { user } from '$lib/stores';
    import { goto } from '$app/navigation';

    export let event: Event;

    $: status = getEventStatus(event, $user.role, $user.username);

    function handleTileClick() {
        goto(`/events/${event.id}`);
    }
</script>

<div class="event-tile" on:click={handleTileClick}>
    <div class="event-tile-header">
        <h3>{event.pledger}</h3>
        <span class="status {status.toLowerCase().replace(' ', '-')}">{status}</span>
    </div>
    <div class="event-tile-details">
        <div class="detail-item">
            <span class="label">Datum & Uhrzeit:</span>
            <span class="value">{new Date(event.datum_uhrzeit).toLocaleString('de-DE')}</span>
        </div>
        <div class="detail-item">
            <span class="label">Coach:</span>
            <span class="value">{event.coach}</span>
        </div>
        <div class="detail-item">
            <span class="label">Säule:</span>
            <span class="value">{event.saeule}</span>
        </div>
    </div>
</div>

<style>
    .event-tile {
        background-color: #ffffff;
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        margin-bottom: 1rem;
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
    }

    .event-tile:hover {
        transform: translateY(-2px);
    }

    .event-tile-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .event-tile-header h3 {
        font-size: 1.2rem;
        font-weight: 600;
        color: #111827;
        margin: 0;
    }

    .status {
        padding: 0.3rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .bestätigt { background: #e6f4ea; color: #1e7e34; }
    .ausstehend { background: #fff3cd; color: #856404; }
    .abgesagt { background: #f8d7da; color: #721c24; }
    .mentorin-gesucht { background: #fff3cd; color: #856404; }
    .mentorin-gefunden { background: #d4edda; color: #155724; }
    .du-bist-mentorin { background: #cce5ff; color: #004085; }
    .bitte-warte-auf-rückmeldung { background: #f8d7da; color: #721c24; }

    .event-tile-details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .detail-item {
        display: flex;
        flex-direction: column;
    }

    .label {
        font-size: 0.75rem;
        color: #4b5563;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .value {
        font-size: 0.9rem;
        color: #111827;
    }
</style>
