<script lang="ts">
    import { goto } from '$app/navigation';
    import Calendar from '$lib/components/Calendar.svelte';
    import type { PageData } from './$types';
    import { user } from '$lib/stores';
    import { isStatusClickable } from '$lib/utils/eventStatus';
    import type { Event } from '$lib/types/event';
    import type { CalendarEvent } from '$lib/types/event-calendar';
    import MentorOptInCard from '$lib/components/MentorOptInCard.svelte';
    import MentorRequestsCard from '$lib/components/MentorRequestsCard.svelte';
    import '$lib/styles/calendar.css';

    export let data: PageData;
    let events: CalendarEvent[] = data.events;
    
    let showOptInCard = false;
    let selectedEvent: Event | null = null;
    let showRequestsCard = false;

    function getEventData(event: Event | CalendarEvent): Event {
        return 'originalData' in event ? event.originalData : event;
    }

    function handleEventClick(event: CalendarEvent) {
        const eventData = getEventData(event);
        goto(`/events/${eventData.id}`);
    }

    function handleMentorOptIn() {
        showOptInCard = false;
        selectedEvent = null;
    }

    function handleStatusButtonClick(event: CustomEvent<Event>) {
        const eventData = event.detail;
        if ($user.role === 'mentor' && isStatusClickable(eventData, $user.role, $user.vorname)) {
            showOptInCard = true;
            selectedEvent = eventData;
        } else if ($user.role === 'coach' && isStatusClickable(eventData, $user.role)) {
            showRequestsCard = true;
            selectedEvent = eventData;
        }
    }
</script>

<div class="transparent-container">
    
    <div class="calendar-container">
        <Calendar 
            events={events}
            {handleEventClick}
            on:statusClick={handleStatusButtonClick}
        />
    </div>
</div>

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

<style>
    h1 {
        margin-bottom: 1.5rem;
        font-size: 2rem;
        font-weight: 600;
    }
    
    .calendar-container {
        background: white;
        border-radius: 15px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    :root[data-theme="dark"] .calendar-container {
        background: transparent;
    }
</style>