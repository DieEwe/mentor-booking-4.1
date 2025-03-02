<script lang="ts">
    import EventDetailsCard from '$lib/components/EventDetailsCard.svelte';
    import { user } from '$lib/stores';
    import { isStatusClickable } from '$lib/utils/eventStatus';
    import MentorOptInCard from '$lib/components/MentorOptInCard.svelte';
    import MentorRequestsCard from '$lib/components/MentorRequestsCard.svelte';
    import type { Event } from '$lib/types/event';
    import { goto } from '$app/navigation';
    export let data;
    
    let showOptInCard = false;
    let showRequestsCard = false;
    let selectedEvent: Event | null = null;
    
    // Add debugging to check the event structure and user role
    $: console.log('Details page - event:', data.event);
    $: console.log('Details page - user role:', $user.role);
    
    // Handler for status button clicks - same as in the table view
    function handleStatusClick(event: CustomEvent<Event>) {
        const eventData = event.detail;
        console.log('Status clicked:', eventData);
        
        if ($user.role === 'mentor' && isStatusClickable(eventData, $user.role, $user.vorname)) {
            showOptInCard = true;
            selectedEvent = eventData;
        } else if ($user.role === 'coach' && isStatusClickable(eventData, $user.role)) {
            showRequestsCard = true;
            selectedEvent = eventData;
        }
    }
    
    function handleMentorOptIn() {
        showOptInCard = false;
        selectedEvent = null;
    }
    function handleGoBack() {
        goto('/events');
    }
</script>

<div class="transparent-container">
    <main>
        <div class="back-button-container">
            <button class="back-button" on:click={handleGoBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <!--some text-->
            </button>
        </div>
        
        <EventDetailsCard event={data.event} on:statusClick={handleStatusClick} />
    </main>

    {#if showOptInCard && selectedEvent}
        <MentorOptInCard
            event={selectedEvent}
            on:confirm={handleMentorOptIn}
            on:cancel={() => {
                showOptInCard = false;
                selectedEvent = null;
            }}
        />
    {/if}

    {#if showRequestsCard && selectedEvent}
        <MentorRequestsCard
            event={selectedEvent}
            mentorRequests={selectedEvent.mentorRequests || []}
            on:close={() => {
                showRequestsCard = false;
                selectedEvent = null;
            }}
            on:select={({ detail: selectedMentors }) => {
                if (selectedEvent) {
                    selectedEvent.assignedMentors = selectedMentors;
                    selectedEvent.status = 'mentor_found';
                }
                showRequestsCard = false;
                selectedEvent = null;
            }}
        />
    {/if}
</div>

<style>
    main {
        background: white;
        border-radius: 25px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        padding: 2rem;
        min-height: auto;
    }
</style>