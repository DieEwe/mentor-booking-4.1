<script lang="ts">
    import type { Event } from '$lib/types/event';
    import { goto } from '$app/navigation';
    import { user } from '$lib/stores';
    import { getEventStatus } from '$lib/utils/eventStatus';
    
    export let event: Event;
    
    $: status = getEventStatus(event, $user.role, $user.username);
</script>

<div class="event-details-page">
    <div class="event-card">
        <button class="back-button" on:click={() => goto('/events')}>&larr; Zurück</button>
        
        <div class="event-header">
            <h2>{event.pledger}</h2>
            <span class="status {status.toLowerCase().replace(' ', '-')}">{status}</span>
        </div>

        <div class="event-details">
            <div class="detail-item">
                <span class="label">Datum & Uhrzeit:</span>
                <span class="value">{new Date(event.datum_uhrzeit).toLocaleString('de-DE')}</span>
            </div>
        </div>
    </div>
</div>

<style>
    .event-details-page {
        min-height: 100vh;
        padding: 2rem;
        background: #f9fafb;
    }

    .event-card {
        width: 100%;
        height: 100%;
    }

    .back-button {
        background: none;
        border: none;
        font-size: 1rem;
        color: #666;
        cursor: pointer;
        padding: 0.5rem 0;
        margin-bottom: 1rem;
        transition: color 0.2s;
    }

    .back-button:hover {
        color: #000;
    }

    .event-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem 0;
        padding-bottom: 1rem;
        border-bottom: 2px solid #f0f2f5;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #111827;
    }

    .status {
        padding: 0.5rem 1.5rem;
        border-radius: 2rem;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .bestätigt { background: #e6f4ea; color: #1e7e34; }
    .ausstehend { background: #fff3cd; color: #856404; }
    .abgesagt { background: #f8d7da; color: #721c24; }

    .event-details {
        display: grid;
        gap: 1rem;
    }

    .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-radius: 0.5rem;
        background: #f9fafb;
        border-bottom: 1px solid #eee;
    }

    .label {
        color: #4b5563;
        font-size: 0.975rem;
    }

    .value {
        font-weight: 500;
        color: #111827;
    }

    @media (max-width: 768px) {
        .event-details-page {
            padding: 1rem;
        }

        .event-card {
            padding: 1.5rem;
        }

        h2 {
            font-size: 1.25rem;
        }

        .detail-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
    }

/* Mentorstatus styles */

.mentorin-gesucht { background: #fff3cd; color: #856404; }
    .mentorin-gefunden { background: #d4edda; color: #155724; }
    .du-bist-mentorin { background: #cce5ff; color: #004085; }
    .bitte-warte-auf-rückmeldung { background: #f8d7da; color: #721c24; }
</style>