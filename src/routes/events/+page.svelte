<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import type { PageData } from './$types';
	import '../../app.css';
	export let data: PageData;
	let events = data.events;
	let view: 'table' | 'calendar' = 'table';
	function toggleView() {
		view = view === 'table' ? 'calendar' : 'table';
	}
</script>

<div class="events-container">
    <div class="header-controls">
        <div class="view-toggle" role="group" aria-label="Toggle between table and calendar views">
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
        
        <button
            on:click={() => window.open('https://cloud.seatable.io/dtable/forms/custom/NeuerCoachingTermin/', '_blank')}
            class="button-55"
        >
            Neuer Termin
        </button>
    </div>

	{#if view === 'table'}
    <div class="limiter">
        <div class="container-table100">
            <div class="wrap-table100">
                <div class="table100 ver1">
                    <table data-vertable="ver1">
                        <thead>
                            <tr class="table100-head">
                                <th class="column100 column1" data-column="column1">Datum und Uhrzeit</th>
                                <th class="column100 column2" data-column="column2">Coach</th>
                                <th class="column100 column3" data-column="column3">Pledger</th>
                                <th class="column100 column4" data-column="column4">Adresse</th>
                                <th class="column100 column5" data-column="column5">Säule</th>
                                <th class="column100 column6" data-column="column6">MentorIn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each events as event}
                                <tr class="row100">
                                    <td class="column100 column1" data-column="column1">{event.originalData['Datum und Uhrzeit']}</td>
                                    <td class="column100 column2" data-column="column2">{event.originalData['Coach']}</td>
                                    <td class="column100 column3" data-column="column3">{event.originalData['Pledger']}</td>
                                    <td class="column100 column4" data-column="column4">{event.originalData['Adresse']}</td>
                                    <td class="column100 column5" data-column="column5">{event.originalData['Säule']}</td>
                                    <td class="column100 column6" data-column="column6">{event.originalData['MentorIn']}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    {:else}
        <Calendar {events} />
    {/if}
</div>

<style>

.header-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        width: 100%;
    }

    .view-toggle {
        display: flex;
        gap: 0.5rem;
    }

    .toggle-btn {
        padding: 0.5em 1em;
        max-width: 140px;
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
        transform: scale(1.10);
    }

/* icons for the view toggle */
	.toggle-icon {
		width: 2.5rem;
		height: 2.5rem;
		display: inline-block;
		vertical-align: middle;
		transition: opacity 0.2s ease;
	}

	.toggle-icon:hover {
		opacity: 0.8;
	}

	@media (max-width: 768px) {
		.toggle-icon {
			width: 2rem;
			height: 2rem;
		}
	}
/* container for events */

    .events-container {
        width: 100%;
        max-width: 1170px; /* matches table width */
        margin: 0 auto;
        padding: 1rem;
    }

/* toggle for view */
	.view-toggle {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0 auto;
		padding: 1rem 2rem;
	}
	.view-toggle button {
		padding: 0.5em 1em;
		max-width: 140px;
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

	.view-toggle button:hover {
		transform: scale(1.10); /* grows to 110% of original size */
		}


	.table100-head th {
		font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		font-size: 18px;
		font-weight: 400 }

</style>
