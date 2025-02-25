<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Event } from '$lib/types/event';

    export let event: Event;
    export let isConfirmed = false;
    
    const dispatch = createEventDispatcher<{
        confirm: void;
        cancel: void;
    }>();

    function handleConfirm() {
        isConfirmed = true;
    }

    function handleClose() {
        dispatch('cancel');
    }
</script>

<div class="overlay" on:click|self={handleClose}>
    <div class="request-card">
        <button class="close-button" on:click={handleClose}>&times;</button>
        
        {#if !isConfirmed}
            <h3>Mentoring-Anfrage</h3>
            <p>Möchtest Du bei diesem Coaching als MentorIn eingesetzt werden?</p>
            
            <div class="event-info">
                <p><strong>Datum & Zeit:</strong> {new Date(event.datum_uhrzeit).toLocaleString('de-DE')}</p>
                <p><strong>Pledger:</strong> {event.pledger}</p>
            </div>

            <div class="button-group">
                <button class="confirm-btn" on:click={handleConfirm}>
                    Ja, ich bin dabei.
                </button>
                <button class="cancel-btn" on:click={handleClose}>
                    Nein
                </button>
            </div>
        {:else}
            <div class="confirmation-content">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                
                <h3>Danke für deine Mitarbeit!</h3>
                <p>Du erhältst eine Benachrichtigung per Mail, ob du diesmal dabei bist.</p>
                <p>Alternativ kannst du hier den Status des Coachings checken.</p>
            </div>
        {/if}
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

    .request-card {
        position: relative;
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 90%;
    }

    h3 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 1.5rem;
    }

    .event-info {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
    }

    .event-info p {
        margin: 0.5rem 0;
    }

    .button-group {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    button {
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        border: none;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.1s ease;
    }

    button:active {
        transform: scale(0.98);
    }

    .confirm-btn {
        background: #10b981;
        color: white;
        flex: 1;
    }

    .confirm-btn:hover {
        background: #059669;
    }

    .cancel-btn {
        background: #f3f4f6;
        color: #4b5563;
        flex: 1;
    }

    .cancel-btn:hover {
        background: #e5e7eb;
    }

    .confirmation-content {
        text-align: center;
        padding: 1rem 0;
    }

    .confirmation-content h3 {
        color: #10b981;
        margin-bottom: 1rem;
    }

    .confirmation-content p {
        color: #4b5563;
        margin: 0.5rem 0;
    }

    /* Checkmark Animation */
    .checkmark {
        width: 56px;
        height: 56px;
        margin: 0 auto 1rem;
        border-radius: 50%;
    }

    .checkmark__circle {
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-width: 2;
        stroke-miterlimit: 10;
        stroke: #10b981;
        fill: none;
        animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    }

    .checkmark__check {
        transform-origin: 50% 50%;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        stroke: #10b981;
        stroke-width: 3;
        animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
    }

    @keyframes stroke {
        100% {
            stroke-dashoffset: 0;
        }
    }

    /* close button */
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
</style>