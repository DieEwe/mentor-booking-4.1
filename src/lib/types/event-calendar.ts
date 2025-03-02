import type { Event } from './event';
import type { EventApi, EventContentArg as FullCalendarEventContentArg } from '@fullcalendar/core';

// Interface for FullCalendar's internal event format
export interface FormattedCalendarEvent {
    id: string;
    title: string;
    start: string;
    end: string;
    extendedProps: {
        originalData: Event;
    };
}

// Your application's calendar event interface
export interface CalendarEvent {
    id: string;
    title: string;
    start: string;
    end: string;
    originalData: Event;
}

export type EventContentArg = FullCalendarEventContentArg;

export interface CalendarDispatchEvents {
    eventClick: CalendarEvent;
}

export interface CalendarOptions {
    plugins?: any[];
    initialView?: string;
    headerToolbar?: {
        left?: string;
        center?: string;
        right?: string;
    };
    events?: FormattedCalendarEvent[];
    editable?: boolean;
    selectable?: boolean;
    weekends?: boolean;
    height?: string | number;
    [key: string]: any;
}

export interface CalendarProps {
    events: CalendarEvent[];
    handleEventClick: (event: CalendarEvent) => void;
}