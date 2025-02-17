<script lang="ts">
    import { onMount } from 'svelte';
    import FullCalendar from 'svelte-fullcalendar';
    import daygridPlugin from '@fullcalendar/daygrid';
    import timegridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import type { CalendarOptions } from '@fullcalendar/core';

    let calendarRef: any;
    
    export let events: any[] = [];
    
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

    $: if (events) {
        options = {
            ...options,
            events
        };
    }

    export function getAPI() {
        return calendarRef?.getAPI();
    }
</script>

<div class="calendar-container">
    <FullCalendar 
        bind:this={calendarRef}
        {options}
    />
</div>

<style>
    .calendar-container {
        width: 100%;
        height: 100%;
        padding: 1rem;
    }
</style>