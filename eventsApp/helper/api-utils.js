export async function getAllEvents() {
  const response = await fetch(
    "https://next-f68e2-default-rtdb.firebaseio.com/events.json"
  );
  const events = [];
  const data = await response.json();
  console.log(data);
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();

  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();

  return allEvents.find((event) => event.id === id);
}

export async function getEventIds() {
  const allEvents = await getAllEvents();
  console.log(allEvents);
  return allEvents.filter((event) => {
    if (event.isFeatured) {
      return event.id;
    }
  });
}
export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  console.log(filteredEvents);
  return filteredEvents;
}
