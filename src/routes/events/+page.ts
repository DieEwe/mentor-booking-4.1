export async function load() {
    const res = await fetch('/mock.json');
    const data = await res.json();

    return { events: data }; // Directly assign the array
}
