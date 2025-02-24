<script lang="ts">
    import { goto } from '$app/navigation';
    import Calendar from '$lib/components/Calendar.svelte';
    import type { PageData } from './$types';
    import '../../app.css';
    
    export let data: PageData;
    let events = data.events;
    let view: 'table' | 'calendar' = 'table';
    
    function toggleView() {
        view = view === 'table' ? 'calendar' : 'table';
    }

    function handleEventClick(event: any) {
        goto(`/events/${event.originalData?.id || event.id}`);
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

    <div class="content-container">
		{#if view === 'table'}
		<div class="events-table">
			<table>
				<thead>
					<tr>
                        <th>Datum und Uhrzeit</th>
						<th>Coach</th>
						<th>Pledger</th>
						<th>Säule</th>
						<th>MentorIn</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{#each events as event}
						<tr>
							 <td 
                                class="date-cell"
                                on:click={() => handleEventClick(event)}
                            >
                                {event.originalData.datum_uhrzeit}
                            </td>
							<td>{event.originalData.coach}</td>
							<td>{event.originalData.pledger}</td>
							<td>{event.originalData.saeule}</td>
							<td>{event.originalData.mentor}</td>
							<td>{event.originalData.status}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	
    {:else}
        <Calendar 
            {events} 
            on:eventClick={({ detail }) => handleEventClick(detail)}
        />
    {/if}
	</div>
</div>

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
</style>
