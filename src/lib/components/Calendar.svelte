<script lang="ts">
	import type { CalendarEvent, CalendarOptions } from '../types/event-calendar';
	import type { DayHeaderContentArg, EventClickArg } from '@fullcalendar/core';
	import { createEventDispatcher, type EventDispatcher } from 'svelte';

	interface CalendarDispatchEvents {
		eventClick: CalendarEvent['originalData'];
	}

	const dispatch: EventDispatcher<CalendarDispatchEvents> = createEventDispatcher();

	import FullCalendar from 'svelte-fullcalendar';
	import daygridPlugin from '@fullcalendar/daygrid';
	import timegridPlugin from '@fullcalendar/timegrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import '../../../static/css/calendar.css';

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
		weekends: true,
		height: 'auto',
		slotMinTime: '07:00:00',  // Start time
		slotMaxTime: '18:00:00',  // End time
		allDaySlot: false, // Hide all-day slot
		// for 24-hour format:
	slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
		},
	eventClick: (info: EventClickArg) => {
        dispatch('eventClick', info.event.extendedProps.originalData);
    	},
    eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    },
		dayHeaderContent: function(arg: DayHeaderContentArg) {
        const weekday = arg.date.toLocaleDateString(undefined, { weekday: 'short' });
        const isMonthView = arg.view.type === 'dayGridMonth';
        
        return { 
            html: `<div class="day-header">
                <div class="weekday">${weekday}</div>
                ${!isMonthView ? `<div class="day">${arg.date.getDate()}</div>` : ''}
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


