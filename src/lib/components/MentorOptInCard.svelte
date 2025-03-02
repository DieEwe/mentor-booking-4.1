<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Event } from '$lib/types/event';
    import { formatDateTime } from '$lib/utils/dateUtils';
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
                <p><strong>Datum & Zeit:</strong> {formatDateTime(event)}</p>
                <p><strong>Pledger:</strong> {event.companyname}</p>
                <p><strong>Säule:</strong> {event.saeule || 'Nicht angegeben'}</p>
                {#if event.coach}
                    <p><strong>Coach:</strong> {event.coach}</p>
                {/if}
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
        backdrop-filter: blur(3px);
    }

    .request-card {
        position: relative;
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        max-width: 450px;
        width: 90%;
        font-family: var(--font-family);
        animation: slide-up 0.3s ease-out;
        border: 1px solid #e5e7eb;
    }

    @keyframes slide-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    h3 {
        margin: 0 0 1rem 0;
        color: #1f2937;
        font-size: 1.5rem;
        font-weight: 600;
    }

    p {
        color: #4b5563;
        line-height: 1.5;
    }

    .event-info {
        background: rgba(57, 229, 226, 0.05);
        padding: 1rem;
        border-radius: 8px;
        margin: 1.25rem 0;
        border-left: 4px solid #39e5e2;
    }

    .event-info p {
        margin: 0.5rem 0;
    }

    .event-info strong {
        color: #1f2937;
        font-weight: 600;
    }

    .button-group {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }

    button {
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        border: none;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: var(--font-family);
    }

    .confirm-btn {
        background: #39e5e2;
        color: #1f2937;
        flex: 1;
        font-weight: 600;
        box-shadow: 0 2px 4px rgba(57, 229, 226, 0.2);
    }

    .confirm-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(57, 229, 226, 0.3);
    }

    .confirm-btn:active {
        transform: translateY(0);
    }

    .cancel-btn {
        background: #f3f4f6;
        color: #4b5563;
        flex: 1;
        border: 1px solid #e5e7eb;
    }

    .cancel-btn:hover {
        background: #e5e7eb;
    }

    .confirmation-content {
        text-align: center;
        padding: 1rem 0;
    }

    .confirmation-content h3 {
        color: #39e5e2;
        margin-bottom: 1rem;
    }

    .confirmation-content p {
        color: #4b5563;
        margin: 0.75rem 0;
    }

    /* Checkmark Animation */
    .checkmark {
        width: 64px;
        height: 64px;
        margin: 0 auto 1.5rem;
        border-radius: 50%;
    }

    .checkmark__circle {
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-width: 2;
        stroke-miterlimit: 10;
        stroke: #39e5e2;
        fill: none;
        animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    }

    .checkmark__check {
        transform-origin: 50% 50%;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        stroke: #39e5e2;
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
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #6b7280;
        transition: all 0.2s ease;
    }

    .close-button:hover {
        background-color: #f3f4f6;
        color: #111827;
    }

    /* Dark mode styles */
    :global(:root[data-theme="dark"]) .request-card {
        background: #1a202c;
        border-color: #2d3748;
    }

    :global(:root[data-theme="dark"]) h3 {
        color: #e2e8f0;
    }

    :global(:root[data-theme="dark"]) p {
        color: #a0aec0;
    }

    :global(:root[data-theme="dark"]) .event-info {
        background: rgba(57, 229, 226, 0.1);
        border-left-color: #39e5e2;
    }

    :global(:root[data-theme="dark"]) .event-info strong {
        color: #e2e8f0;
    }

    :global(:root[data-theme="dark"]) .confirm-btn {
        background: #39e5e2;
        color: #1a202c;
    }

    :global(:root[data-theme="dark"]) .cancel-btn {
        background: #2d3748;
        color: #e2e8f0;
        border-color: #4a5568;
    }

    :global(:root[data-theme="dark"]) .cancel-btn:hover {
        background: #4a5568;
    }

    :global(:root[data-theme="dark"]) .close-button {
        color: #a0aec0;
    }

    :global(:root[data-theme="dark"]) .close-button:hover {
        background-color: #2d3748;
        color: #e2e8f0;
    }

    :global(:root[data-theme="dark"]) .confirmation-content h3 {
        color: #39e5e2;
    }

    :global(:root[data-theme="dark"]) .confirmation-content p {
        color: #a0aec0;
    }
</style>