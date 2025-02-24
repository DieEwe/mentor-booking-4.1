<script lang="ts">
    import type { Event } from '$lib/types/event';
    import { goto } from '$app/navigation';
    
    export let event: Event;
</script>

<div class="event-details-page">
    <div class="event-card">
        <button class="back-button" on:click={() => goto('/events')}>&larr; Zurück</button>
        
        <div class="event-header">
            <h2>{event.pledger}</h2>
            <span class="status {event.status.toLowerCase()}">{event.status}</span>
        </div>

        <div class="event-details">
            <div class="detail-item">
                <span class="label">Datum & Uhrzeit:</span>
                <span class="value">{new Date(event.datum_uhrzeit).toLocaleString('de-DE')}</span>
            </div>
            <div class="detail-item">
                <span class="label">Coach:</span>
                <span class="value">{event.coach}</span>
            </div>
            <div class="detail-item">
                <span class="label">MentorIn:</span>
                <span class="value">{event.mentor}</span>
            </div>
            <div class="detail-item">
                <span class="label">Säule:</span>
                <span class="value">{event.saeule}</span>
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
</style>