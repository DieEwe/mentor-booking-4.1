<script lang="ts">
  import Calendar from '$lib/components/Calendar.svelte';
  import type { EventInput } from '@fullcalendar/core';

  // Sample events array with FullCalendar event format
  let events: EventInput[] = [
    { id: '1', start: '2025-03-01T10:00:00', end: '2025-03-01T12:00:00', title: 'Event 1' },
    { id: '2', start: '2025-03-02T11:00:00', end: '2025-03-02T13:00:00', title: 'Event 2' }
  ];

  let view: 'table' | 'calendar' = 'table';
</script>

<!-- Wrapper container for events view -->
<div class="events-container">
  <!-- Toggle Buttons Section -->
  <div class="view-toggle" role="group" aria-label="Toggle between table and calendar views">
    <button on:click={() => view = 'table'} disabled={view === 'table'}>
      Table View
    </button>
    <button on:click={() => view = 'calendar'} disabled={view === 'calendar'}>
      Calendar View
    </button>
  </div>

  <!-- Conditional rendering of view -->
  {#if view === 'table'}
    <!-- Custom Table View for events -->
    <table aria-label="Coaching Events Table">
      <thead>
        <tr>
          <th>Select</th>
          <th>Date &amp; Time</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {#each events as event (event.id)}
          <tr>
            <td><!-- Add selection control here (e.g., radio button) --></td>
            <td>{event.start}</td>
            <td>{event.title}</td>
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
    margin-right: 150px; /* Adjust this value to match your Menu's width + desired spacing */
  }

  .view-toggle {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .view-toggle button {
    padding: 0.5rem 1rem;
    background-color: var(--button-bg, #fff);
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
