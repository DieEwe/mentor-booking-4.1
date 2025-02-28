<!-- src/lib/components/EventDetailsCard.svelte -->
<script lang="ts">
    import type { Event } from '$lib/types/event';

    export let event: Event;

    let showModal = false;

    function handleClose() {
        showModal = false;
    }
        // Format the date and time
    function formatDateTime(dateTimeString: string): string {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }
</script>

<div class="event-details-card">
    <h2>Event Details</h2>

    <div class="detail-item">
        <span class="label">Datum & Uhrzeit:</span>
        <span class="value">{formatDateTime(event.datum_uhrzeit)}</span>
    </div>

    <div class="detail-item">
        <span class="label">Coach:</span>
        <span class="value">{event.coach}</span>
    </div>

    <div class="detail-item">
        <span class="label">Pledger:</span>
        <span class="value">
            {event.companyname}
        </span>
    </div>

    <div class="detail-item">
        <span class="label">Säule:</span>
        <span class="value">{event.saeule}</span>
    </div>

    <div class="detail-item">
        <span class="label">Mentoren:</span>
        <span class="value">{event.mentors?.join(', ') || 'Keine'}</span>
    </div>

    <div class="detail-item">
        <span class="label">Status:</span>
        <span class="value">{event.status}</span>
    </div>
</div>

<style>
    .event-details-card {
        background: white;
        border-radius: 0.75rem;
        padding: 2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
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
        .event-details-card {
            padding: 1rem;
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