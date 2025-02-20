import type { PageLoad } from './$types';
import type { CalendarEvent } from '$lib/types/event-calendar';

interface ApiEvent {
	'Datum und Uhrzeit': string;
	Coach: string;
	Pledger: string;
	Adresse: string;
	Säule: string;
	MentorIn: string;
}

export const load = (async ({ fetch }) => {
	try {
		const response = await fetch('/mock.json');

		if (!response.ok) {
			console.error('Failed to fetch events:', response.statusText);
			return { events: [] };
		}

		const apiEvents: ApiEvent[] = await response.json();

		// Transform API events to CalendarEvent format
		const calendarEvents: CalendarEvent[] = apiEvents.map((event, index) => ({
			id: index + 1,
			title: `${event.Coach} - ${event.Pledger}`,
			start: event['Datum und Uhrzeit'],
			end: event['Datum und Uhrzeit'], // You might want to calculate end time
			description: `Säule: ${event.Säule}, MentorIn: ${event.MentorIn}`,
			// Keep original data for table view
			originalData: event
		}));

		return {
			events: calendarEvents,
			rawEvents: apiEvents // Keep raw data for table view
		};
	} catch (error) {
		console.error('Error loading events:', error);
		return { events: [], rawEvents: [] };
	}
}) satisfies PageLoad;
