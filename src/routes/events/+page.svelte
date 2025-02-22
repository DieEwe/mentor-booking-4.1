<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let events = data.events;
	let view: 'table' | 'calendar' = 'table';
	function toggleView() {
		view = view === 'table' ? 'calendar' : 'table';
	}
</script>

<div class="events-container">
	<div class="view-toggle" role="group" aria-label="Toggle between table and calendar views">
		<button on:click={toggleView} aria-pressed={view === 'calendar'}>
			<span>
			{view === 'table' ? 'Kalender' : 'Liste'}
			</span>
		</button>
		<button
			on:click={() => window.open('https://cloud.seatable.io/dtable/forms/custom/NeuerCoachingTermin/', '_blank')}
			class="add-event"
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
	.view-toggle {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
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
		transition: all 0.5s ease;
		}

	.view-toggle button:hover {
		letter-spacing: 3px;
		background-color: hsl(0, 0%, 0%);
		color: hsl(0, 0%, 100%);
		box-shadow: rgb(0, 0, 0)px 7px 29px 0px;
		}

	.view-toggle button:active {
			letter-spacing: 3px;
		background-color: hsl(0, 0%, 0%);
		color: hsl(0, 0%, 100%);
		box-shadow: rgb(0, 0, 0)px 0px 0px 0px;
		transition: 100ms;
		}

		.table100-head th {
			font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
			font-size: 18px;
			font-weight: 350 }

</style>
