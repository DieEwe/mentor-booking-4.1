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
		<div class="table-responsive">
			<table>
				<thead>
					<tr>
						<th>Datum und Uhrzeit</th>
						<th>Coach</th>
						<th>Pledger</th>
						<th>Adresse</th>
						<th>Säule</th>
						<th>MentorIn</th>
					</tr>
				</thead>
				<tbody>
					{#each events as event}
						<tr>
							<td>{event.originalData['Datum und Uhrzeit']}</td>
							<td>{event.originalData['Coach']}</td>
							<td>{event.originalData['Pledger']}</td>
							<td>{event.originalData['Adresse']}</td>
							<td>{event.originalData['Säule']}</td>
							<td>{event.originalData['MentorIn']}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<Calendar {events} />
	{/if}
</div>

<style>
	.events-container {
		margin: 0 auto;
		padding: 1.5rem;
	}
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

	.table-responsive {
		overflow-x: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.85rem;
	}
	th,
	td {
		padding: 1rem;
		border: 1px solid #ddd;
		text-align: left;
	}
	th {
		background-color: var(--primary);
		color: #fff;
	}
</style>
