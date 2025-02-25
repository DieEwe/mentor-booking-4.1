import type { Event } from './event';

export interface CalendarEvent {
    id: string | number;
    title: string;
    start: string;
    end: string;
    color?: string;
    description?: string;
    originalData: Event;
}

export interface CalendarOptions {
	plugins?: any[];
	initialView?: string;
	headerToolbar?: {
		left?: string;
		center?: string;
		right?: string;
	};
	events?: CalendarEvent[];
	editable?: boolean;
	selectable?: boolean;
	weekends?: boolean;
	height?: string | number;
	[key: string]: any;
}
