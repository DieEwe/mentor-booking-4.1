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
  
  <!-- Toggle Buttons Section -->
  <div class="view-toggle" role="group" aria-label="Toggle between table and calendar views">
    <!-- When the button is clicked, the view variable is updated -->
    <button on:click={() => view = 'table'} disabled={view === 'table'}>
      Table View
    </button>
    <button on:click={() => view = 'calendar'} disabled={view === 'calendar'}>
      Calendar View
    </button>
  </div>
  
  <!-- Conditional Rendering based on the 'view' variable -->
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
            <td><!-- Add your selection control here (e.g., radio button) --></td>
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
  
  <style>
    /* Styling for the toggle button container */
    .view-toggle {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
  
    /* Basic styling for buttons */
    .view-toggle button {
      padding: 0.5rem 1rem;
      background-color: var(--button-bg, #fff); /* Fallback to white if --button-bg is not defined */
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    /* Disabled button styling */
    .view-toggle button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  
    /* Optional: Style the table view */
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
