<script lang="ts">
    import type { CalendarEvent, CalendarOptions } from '../types/event-calendar';
    import FullCalendar from 'svelte-fullcalendar';
    import daygridPlugin from '@fullcalendar/daygrid';
    import timegridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
  
    export let events: CalendarEvent[] = [];
  
    let calendarRef: InstanceType<typeof FullCalendar>;
  
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
        weekends: true
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
        width: 100%;
        height: 100%;
        padding: 1rem;
        background-color: var(--background);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

</style>
