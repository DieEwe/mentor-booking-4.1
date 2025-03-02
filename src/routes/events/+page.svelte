<!-- src/routes/events/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import { user } from '$lib/stores';
    import { isStatusClickable } from '$lib/utils/eventStatus';
    import type { Event } from '$lib/types/event';
    import type { CalendarEvent } from '$lib/types/event-calendar';
    import EventTile from '$lib/components/EventTile.svelte';
    import MentorOptInCard from '$lib/components/MentorOptInCard.svelte';
    import MentorRequestsCard from '$lib/components/MentorRequestsCard.svelte';
    import { formatDateTime, formatDate, formatTime } from '$lib/utils/dateUtils';
    import EventStatusButton from '$lib/components/EventStatusButton.svelte';
    import '$lib/styles/table.css';
    import Icons from '$lib/components/Icons.svelte';
    import Buttons from '$lib/components/Buttons.svelte';

    export let data: PageData;
    let events: CalendarEvent[] = data.events;
    let isMobile = false;

    export function getEventData(event: Event | CalendarEvent): Event {
    return 'originalData' in event ? event.originalData : event;
}

    onMount(() => {
        const updateWidth = () => {
            isMobile = window.innerWidth <= 768;
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    });


    function handleEventClick(event: CalendarEvent) {
    const eventData = getEventData(event);
    goto(`/events/${eventData.id}`);
}

    let showOptInCard = false;
    let selectedEvent: Event | null = null;
    let showRequestsCard = false;



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
        <div class="header-controls">
            <div class="right-controls">
                <div class="right-controls">
                    <Buttons
                        type="add"
                        label="Neuer Termin"
                        onClick={() => window.open('https://cloud.seatable.io/dtable/forms/custom/NeuerCoachingTermin/', '_blank')}
                    />
                </div>
            </div>
        </div>

        <div class="table-container">
                {#if isMobile}
                    <div class="event-tiles">
                        {#each events as event}
                        <EventTile 
                        event={event.originalData} 
                        on:statusClick={handleStatusButtonClick} 
                        />
                        {/each}
                    </div>
                {:else}
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <Icons name="calendar" color="#057eff" size={16} />
                                        Datum und Uhrzeit
                                    </div>
                                </th>
                                <th>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <Icons name="user" color="#8246de" size={16} />
                                        Coach
                                    </div>
                                </th>
                                <th>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <Icons name="user" color="#30c0b0" size={16} />
                                        Pledger
                                    </div>
                                </th>
                                <th>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <Icons name="bookOpen" color="#f4b446" size={16} />
                                        Säule
                                    </div>
                                </th>
                                <th>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <Icons name="group" color="#5045ce" size={16} />
                                        MentorInnen
                                    </div>
                                </th>
                                <th>Status</th> <!-- No icon for Status as requested -->
                            </tr>
                        </thead>
                        <tbody>
                            {#each events as event, i}
                            <tr>
                                <td class="date-cell" on:click={() => handleEventClick(event)}>
                                    <span class="date-part">{formatDate(event.originalData)}</span>
                                    <span class="time-part">{formatTime(event.originalData)}</span>
                                </td>
                                <td>{event.originalData.coach}</td>
                                <td>
                                    {event.originalData.companyname}
                                </td>
                                <td>{event.originalData.saeule}</td>
                                <td>
                                    {#if event.originalData.status === 'in_process'}
                                        <!--  Show nothing or a placeholder like "Anfragen ausstehend" -->
                                        <span class="empty-state">- - -</span>
                                    {:else}
                                        {event.originalData.mentors?.join(', ') || ''}
                                    {/if}
                                </td>
                                <td class="status-cell">
                                    <EventStatusButton 
                                        event={event.originalData} 
                                        on:statusClick={handleStatusButtonClick} 
                                    />
                                </td>
                            </tr>
                            {/each}
                        </tbody>
                    </table>
                {/if}
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


