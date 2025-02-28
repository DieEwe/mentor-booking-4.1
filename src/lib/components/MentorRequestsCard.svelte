<!-- src/lib/components/MentorRequestsCard.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Event } from '$lib/types/event';

    export let event: Event;
    export let mentorRequests: string[] = [];

    let selectedMentors: Set<string> = new Set();

    const dispatch = createEventDispatcher<{
        close: void;
        select: string[];
    }>();

    function toggleMentorSelection(mentor: string) {
        if (selectedMentors.has(mentor)) {
            selectedMentors.delete(mentor);
        } else {
            selectedMentors.add(mentor);
        }
        selectedMentors = selectedMentors; // trigger reactivity
    }

    function handleAccept() {
        dispatch('select', Array.from(selectedMentors));
    }
</script>

<div class="overlay" on:click|self={() => dispatch('close')}>
    <div class="requests-card">
        <button class="close-button" on:click={() => dispatch('close')}>&times;</button>

        <h3>Mentor-Anfragen</h3>
        <div class="event-info">
            <p><strong>Datum & Zeit:</strong> {new Date(event.datum_uhrzeit).toLocaleString('de-DE')}</p>
            <p><strong>Pledger:</strong> {event.pledgerProfile}</p>
            <p><strong>Coach:</strong> {event.coach}</p>
        </div>

        <div class="requests-list">
            {#if mentorRequests.length > 0}
                <h4>Anfragen von:</h4>
                {#each mentorRequests as mentor}
                    <div class="request-item">
                        <label class="checkbox-label">
                            <input
                                type="checkbox"
                                checked={selectedMentors.has(mentor)}
                                on:change={() => toggleMentorSelection(mentor)}
                            />
                            <span>{mentor}</span>
                        </label>
                    </div>
                {/each}
                <div class="button-group">
                    <button
                        class="accept-btn"
                        on:click={handleAccept}
                        disabled={selectedMentors.size === 0}
                    >
                        Ausgewählte MentorInnen akzeptieren
                    </button>
                </div>
            {:else}
                <p class="no-requests">Keine Anfragen vorhanden</p>
            {/if}
        </div>
    </div>
</div>

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .requests-card {
        position: relative; /* Added for absolute positioning of close button */
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 90%;
    }

    .event-info {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
    }

    .requests-list {
        margin: 1.5rem 0;
    }

    .request-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border-bottom: 1px solid #e5e7eb;
    }

    .accept-btn {
        background: #10b981;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }

    .accept-btn:hover {
        background: #059669;
    }

    .close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        line-height: 1;
        padding: 0.25rem;
        cursor: pointer;
        color: #6b7280;
        transition: color 0.2s ease;
    }

    .close-button:hover {
        color: #111827;
    }

    .no-requests {
        text-align: center;
        color: #6b7280;
        padding: 1rem;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    .button-group {
        margin-top: 1rem;
        text-align: center;
    }

    .accept-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>