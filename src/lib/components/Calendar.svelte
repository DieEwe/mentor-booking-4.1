<script lang="ts">
	import type { CalendarEvent, CalendarOptions } from '../types/event-calendar';
	import type { DayHeaderContentArg } from '@fullcalendar/core';
	import FullCalendar from 'svelte-fullcalendar';
	import daygridPlugin from '@fullcalendar/daygrid';
	import timegridPlugin from '@fullcalendar/timegrid';
	import interactionPlugin from '@fullcalendar/interaction';

	export let events: CalendarEvent[] = [];

	let calendarRef: FullCalendar | null = null;

	let options: CalendarOptions = {
		plugins: [daygridPlugin, timegridPlugin, interactionPlugin],
		initialView: 'dayGridMonth',
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay'
		},
		events,
		editable: true,
		selectable: true,
		weekends: false,
		height: 'auto',
        dayHeaderContent: function(arg: DayHeaderContentArg) {
            const weekday = arg.date.toLocaleDateString(undefined, { weekday: 'short' });
            const day = arg.date.getDate();
            return { 
                html: `<div class="day-header">
                    <div class="weekday">${weekday}</div>
                    <div class="day">${day}</div>
                </div>` 
            };
		}
	};

	$: options = { ...options, events };

	export function getAPI() {
		return calendarRef?.getAPI();
	}
</script>

<div class="calendar-container">
	<FullCalendar bind:this={calendarRef} {options} />
</div>

<style>
  .calendar-container {
    background-color: var(--background);
    border-radius: var(--border-radius);
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  }

  :global(.day-header) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
	font-size: 0.85rem;
  }

  :global(.weekday) {
  	font-weight: normal;
  	text-transform: uppercase;
}
</style>
