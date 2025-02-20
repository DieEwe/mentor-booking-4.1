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
<!-- Wrapper container for events view -->
<div class="events-container">
  <!-- Toggle Buttons Section -->
  <div class="view-toggle" role="group" aria-label="Toggle between table and calendar views">
    <button on:click={toggleView} aria-pressed={view === 'calendar'}>
      {view === 'table' ? 'Switch to Calendar View' : 'Switch to Table View'}
    </button>
    <button on:click={() => window.open('https://cloud.seatable.io/dtable/forms/custom/NeuerCoachingTermin/', '_blank')} class="add-event">
      Neuer Termin
    </button>
  </div>

  <!-- Conditional rendering of view -->
  {#if view === 'table'}
    <!-- Custom Table View for events -->
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
            <!-- Adjust these cell values to match the property names of your event objects -->
            <td>{event.originalData["Datum und Uhrzeit"]}</td>
            <td>{event.originalData["Coach"]}</td>
            <td>{event.originalData["Pledger"]}</td>
            <td>{event.originalData["Adresse"]}</td>
            <td>{event.originalData["Säule"]}</td>
            <td>{event.originalData["MentorIn"]}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <!-- Calendar View using the FullCalendar wrapper component -->
    <Calendar {events} />
  {/if}
</div>

<style>
  /* Reserve space on the right to avoid overlapping with the fixed menu */
  .events-container {
    margin: 0 auto;
    padding: 1rem;
  }

  .view-toggle {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .view-toggle button {
    padding: 0.5rem 1rem;
    color: white;
    background-color: var(--accent);
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .view-toggle button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 0.75rem;
    border: 1px solid #ccc;
    text-align: left;
  }
</style>
