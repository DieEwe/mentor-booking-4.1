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
			{view === 'table' ? 'Switch to Calendar View' : 'Switch to Table View'}
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
		padding: 0.75rem 1.5rem;
		color: #fff;
		background-color: var(--accent);
		border: none;
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: background-color 0.3s;
	}
	.view-toggle button:hover {
		background-color: darken(var(--accent), 5%);
	}
	.table-responsive {
		overflow-x: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 1rem;
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
