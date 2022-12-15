import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAllEvents } from "../../data/dummy-data";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

const Event = () => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("");
  const [featuredStatus, setFeaturedStatus] = useState(null);
  const events = getAllEvents();
  const handleSearch = (selectedYear, selectedMonth) => {
    router.push(`/events/${selectedYear}/${selectedMonth}`);
  };
  return (
    <div>
      <h1>Event page</h1>

      <EventsSearch onSearch={handleSearch} />
      <EventList events={events} />
    </div>
  );
};

export default Event;
