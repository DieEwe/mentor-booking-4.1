<script lang="ts">
    import type { CalendarEvent, CalendarOptions, FormattedCalendarEvent, EventContentArg, CalendarDispatchEvents } from '../types/event-calendar';
    import type { EventClickArg } from '@fullcalendar/core';
    import { createEventDispatcher, type EventDispatcher, onMount } from 'svelte';
    import FullCalendar from 'svelte-fullcalendar';
    import daygridPlugin from '@fullcalendar/daygrid';
    import timegridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
	import { getDateTime } from '$lib/utils/dateUtils';
    import '$lib/styles/calendar.css';

    export let events: CalendarEvent[] = [];
    export let handleEventClick: (event: CalendarEvent) => void;

    const dispatch: EventDispatcher<CalendarDispatchEvents> = createEventDispatcher();


    // Transform events for FullCalendar consumption
    $: formattedEvents = events.map((event): FormattedCalendarEvent => ({
        id: String(event.id),
        title: event.originalData.companyname,
        start: getDateTime(event.originalData), // Use utility function dateUtils.ts
        end: getDateTime(event.originalData),   // Use utility function
        extendedProps: {
            originalData: event.originalData
        }
    }));

    let options: CalendarOptions = {
        plugins: [daygridPlugin, timegridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: formattedEvents, // Add events directly to options
        editable: false,
        selectable: false,
        weekends: true,
        height: 'auto',
        slotMinTime: '07:00:00',
        slotMaxTime: '18:00:00',
        allDaySlot: false,
        locale: 'de',
        displayEventTime: true,
        eventClick: (info: EventClickArg) => {
            const event = events.find(e => String(e.id) === info.event.id);
            if (event) handleEventClick(event);
        },
        eventContent: (arg: EventContentArg) => {
            const eventTime = new Date(arg.event.start!).toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit'
            });
            return {
                html: `
                    <div class="fc-event-content">
                        <div class="calendar-event-time">${eventTime}</div>
                        <div class="calendar-event-title">${arg.event.title}</div>
                    </div>
                `
            };
        }
    };

    // Update options when events change
    $: options = { ...options, events: formattedEvents };
</script>

<div class="calendar-container">
    <FullCalendar {options} />
</div>
