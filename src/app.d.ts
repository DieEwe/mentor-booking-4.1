// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface PageData {
			events: import('$lib/types/event-calendar').CalendarEvent[]
		}
		interface Locals {
			userid: string
		  }
		interface Platform {
			env: { API_KEY: string }
		  }
	}
}

export {};
