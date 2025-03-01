// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// By adding the ?, you're saying that the events property is optional.
		// This will resolve the type error without forcing every page to provide the events data. This is likely the best solution.
		interface PageData {
			events?: import('$lib/types/event-calendar').CalendarEvent[]
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
