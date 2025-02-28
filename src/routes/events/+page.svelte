<!-- src/routes/events/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Calendar from '$lib/components/Calendar.svelte';
    import type { PageData } from './$types';
    import { user } from '$lib/stores';
    import { getEventStatus, isStatusClickable } from '$lib/utils/eventStatus';
    import type { Event } from '$lib/types/event';
    import type { CalendarEvent } from '$lib/types/event-calendar';
    import EventTile from '$lib/components/EventTile.svelte';
    import MentorOptInCard from '$lib/components/MentorOptInCard.svelte';
    import MentorRequestsCard from '$lib/components/MentorRequestsCard.svelte';
    import PledgerProfileCard from '$lib/components/PledgerProfileCard.svelte';

    export let data: PageData;
    let events: CalendarEvent[] = data.events;
    let view: 'table' | 'calendar' = 'table';
    let isMobile = false;

    // State for Pledger Profile Card
    let showPledgerProfileCard = false;
    let selectedPledger: any | null = null;

    onMount(() => {
        const updateWidth = () => {
            isMobile = window.innerWidth <= 768;
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    });

    $: eventStatuses = events.map(event =>
        getEventStatus(event.originalData, $user.role, $user.username)
    );

    function toggleView() {
        view = view === 'table' ? 'calendar' : 'table';
    }

    function handleEventClick(event: CalendarEvent) {
        goto(`/events/${event.originalData.id}`);
    }

    let showOptInCard = false;
    let selectedEvent: Event | null = null;
    let showRequestsCard = false;

    function handleStatusClick(event: CalendarEvent) {
        const eventData = event.originalData;
        if ($user.role === 'mentor' && isStatusClickable(eventData, $user.role, $user.username)) {
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


</script>

<div class="content-container">
    <div class="header-controls">
        <div class="left-controls">
            <button on:click={toggleView} aria-pressed={view === 'calendar'} class="toggle-btn">
                {#if view === 'table'}
                    <img src="/images/calendar.svg" alt="Switch to calendar view" class="toggle-icon" />
                    <span class="sr-only">Kalender</span>
                {:else}
                    <img src="/images/list.svg" alt="Switch to list view" class="toggle-icon" />
                    <span class="sr-only">Liste</span>
                {/if}
            </button>
        </div>

        <div class="right-controls">
            <button
                on:click={() => window.open('https://cloud.seatable.io/dtable/forms/custom/NeuerCoachingTermin/', '_blank')}
                class="button-55"
            >
                Neuer Termin
            </button>
        </div>
    </div>

    <div class="table-container">
        {#if view === 'table'}
            {#if isMobile}
                <div class="event-tiles">
                    {#each events as event}
                        <EventTile event={event.originalData} />
                    {/each}
                </div>
            {:else}
                <table>
                    <thead>
                        <tr>
                            <th>Datum und Uhrzeit</th>
                            <th>Coach</th>
                            <th>Pledger</th>
                            <th>Säule</th>
                            <th>MentorInnen</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each events as event, i}
                            <tr>
                                <td class="date-cell" on:click={() => handleEventClick(event)}>
                                    {event.originalData.datum_uhrzeit}
                                </td>
                                <td>{event.originalData.coach}</td>
                                <td>
                                    {event.originalData.companyname}
                                  </td>
                                <td>{event.originalData.saeule}</td>
                                <td>{event.originalData.mentors?.join(', ') || ''}</td>
                                <td
                                    class="status-cell {eventStatuses[i].toLowerCase().replace(' ', '-')}"
                                    class:clickable={isStatusClickable(event.originalData, $user.role, $user.username)}
                                    on:click={() => handleStatusClick(event)}>
                                    {eventStatuses[i]}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        {:else}
            <Calendar
                events={events}
                handleEventClick={handleEventClick}
                on:eventClick={({ detail }) => handleEventClick(detail)}
            />
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


<style>
    .table-container {
        background: white;
        border-radius: 15px;
        padding: 1.5rem;
        margin-top: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        position: relative; /* For positioning the profile card */
    }

    .header-controls {
        background: white;
        border-radius: 15px;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .toggle-btn {
        padding: 0.5em 1em;
        border-radius: 50px;
        cursor: pointer;
        border: 0;
        background-color: white;
        box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        font-size: 15px;
        transition: all 0.2s ease;
    }

    .toggle-btn:hover {
        transform: scale(1.05);
    }

    .toggle-icon {
        width: 2.5rem;
        height: 2.5rem;
        display: inline-block;
        vertical-align: middle;
        transition: opacity 0.2s ease;
    }

    .date-cell {
        cursor: pointer;
        color: #2563eb;
        transition: background-color 0.2s;
    }

    .date-cell:hover {
        background-color: #f3f4f6;
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        .header-controls {
            padding: 0.75rem 1rem;
        }

        .toggle-icon {
            width: 2rem;
            height: 2rem;
        }

        .event-tiles {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
        }
    }

    .status-cell {
        cursor: default;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        text-align: center;
    }

    .mentorin-gesucht {
        background-color: #fff3cd;
        color: #856404;
    }

    .mentorin-gefunden {
        background-color: #d4edda;
        color: #155724;
    }

    .du-bist-mentorin {
        background-color: #cce5ff;
        color: #004085;
    }

    .bitte-warte-auf-rueckmeldung {
        background-color: #f8d7da;
        color: #721c24;
    }

    .clickable {
        cursor: pointer;
    }
</style>