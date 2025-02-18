// src/routes/events/+page.ts
export async function load({ fetch }) {
    const res = await fetch('/mock/events.json');
    if (!res.ok) {
      return { events: [] }; // handle errors appropriately
    }
    const events = await res.json();
    return { events };
  }
  