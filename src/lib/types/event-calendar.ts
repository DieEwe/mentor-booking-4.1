import type { CalendarOptions as FullCalendarOptions } from '@fullcalendar/core';

export interface CalendarEvent {
	id: number;
	title: string;
	start: string; // ISO8601 date string
	end: string; // ISO8601 date string
	color?: string;
	description?: string;
	[key: string]: any;
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
