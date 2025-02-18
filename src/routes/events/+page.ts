// src/routes/events/+page.ts
export async function load() {
    // Fetch the mock data from the static folder.
    const res = await fetch('/mock.json');
    const data = await res.json();
  
    // Assume the JSON has a structure like { events: [...] }
    return { props: { events: data.events } };
  }
  