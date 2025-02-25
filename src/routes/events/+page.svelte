<script lang="ts">
    import { goto } from '$app/navigation';
    import Calendar from '$lib/components/Calendar.svelte';
    import type { PageData } from './$types';
    import '../../app.css';
    
    import { user } from '$lib/stores';
    import { getEventStatus, isStatusClickable } from '$lib/utils/eventStatus';
    import type { Event } from '$lib/types/event';
    import type { CalendarEvent } from '$lib/types/event-calendar';

    import MentorOptInCard from '$lib/components/MentorOptInCard.svelte';
    import MentorRequestsCard from '$lib/components/MentorRequestsCard.svelte';

    export let data: PageData;
    let events: (Event | CalendarEvent)[] = data.events;
    let view: 'table' | 'calendar' = 'table';

        // Helper function to get event data regardless of type
    function getEventData(event: Event | CalendarEvent): Event {
    return 'originalData' in event ? event.originalData : event;
    }

    $: eventStatuses = events.map(event => 
        getEventStatus(getEventData(event), $user.role, $user.username)
    );
    
    function toggleView() {
        view = view === 'table' ? 'calendar' : 'table';
    }

    function handleEventClick(event: Event | CalendarEvent) {
        const eventData = getEventData(event);
        goto(`/events/${eventData.id}`);
    }
    // Variables for MentorOptInCard (for mentors)
    let showOptInCard = false;
    let selectedEvent: Event | null = null;
    // Variables for MentorRequestsCard (for coaches)
    let showRequestsCard = false;

    function handleStatusClick(event: Event | CalendarEvent) {
        const eventData = getEventData(event);
        if ($user.role === 'mentor' && isStatusClickable(eventData, $user.role, $user.username)) {
            showOptInCard = true;
            selectedEvent = eventData;
        } else if ($user.role === 'coach' && isStatusClickable(eventData, $user.role)) {
            showRequestsCard = true;
            selectedEvent = eventData;
        }
    }

    function handleMentorOptIn() {
        // TODO: Implement the actual mentor opt-in logic
        showOptInCard = false;
        selectedEvent = null;
    }
</script>

<div class="events-container">
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

    <div class="opaque-container">
		{#if view === 'table'}
		<div class="events-table">
			<table>
                <thead>
                    <tr>
                        <th>Datum und Uhrzeit</th>
                        <th>Coach</th>
                        <th>Pledger</th>
                        <th>Säule</th>
                        <th>MentorInnen</th>  <!-- Changed from MentorIn to MentorInnen -->
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {#each events as event, i}
                    <tr>
                        <td 
                            class="date-cell"
                            on:click={() => handleEventClick(event)}
                        >
                            {getEventData(event).datum_uhrzeit}
                        </td>
                        <td>{getEventData(event).coach}</td>
                        <td>{getEventData(event).pledger}</td>
                        <td>{getEventData(event).saeule}</td>
                        <td>{getEventData(event).mentors?.join(', ') || ''}</td>
                        <td 
                            class="status-cell {eventStatuses[i].toLowerCase().replace(' ', '-')}"
                            class:clickable={isStatusClickable(getEventData(event), $user.role, $user.username)}
                            on:click={() => handleStatusClick(event)}
                        >
                            {eventStatuses[i]}
                        </td>
                    </tr>
                    {/each}
                </tbody>
			</table>
		</div>
	
        {:else}
        <Calendar 
            events={events.map(event => {
                const eventData = getEventData(event);
                return {
                    id: eventData.id,
                    title: `${eventData.pledger} - ${eventData.coach}`,
                    start: eventData.datum_uhrzeit,
                    end: eventData.datum_uhrzeit,
                    color: '#4338ca',
                    description: `Säule: ${eventData.saeule}`,
                    originalData: eventData
                } satisfies CalendarEvent;
            })} 
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
        on:select={({detail: selectedMentors}) => {
            // Handle multiple mentor selections
            if (selectedEvent) {
                selectedEvent.assignedMentors = selectedMentors;
                selectedEvent.status = 'mentor_found';
                // TODO: Update backend with selected mentors
            }
            showRequestsCard = false;
            selectedEvent = null;
        }}
    />
{/if}

<style>
    /* Container Styles */
    .events-container {
        width: 100%;
        max-width: 1800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .header-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        border-radius: var(--border-radius);
        padding: 1rem 2rem;
        margin-bottom: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .left-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .right-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    /* Toggle Styles */

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

    /* Table Styles */

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

        .events-container {
            padding: 1rem;
        }

        .header-controls {
            padding: 0.75rem 1rem;
        }

        .toggle-icon {
            width: 2rem;
            height: 2rem;
        }
	}
 /* Status styles */
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
/* Make status cells clickable for mentors */
    .clickable {
        cursor: pointer;
    }

    .clickable:hover {
        opacity: 0.8;
        transform: scale(1.02);
        transition: all 0.2s ease;
    }

    /* Make sure non-clickable status cells look static */
    .status-cell:not(.clickable) {
        cursor: default;
    }
</style>
