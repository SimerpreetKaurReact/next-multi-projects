import React, { useState } from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../helper/api-utils";

const Event = (props) => {
  const router = useRouter();

  const [sortBy, setSortBy] = useState("");
  const [featuredStatus, setFeaturedStatus] = useState(null);
  // const events = getAllEvents();
  const handleSearch = (selectedYear, selectedMonth) => {
    router.push(`/events/${selectedYear}/${selectedMonth}`);
  };
  return (
    <div>
      <h1>Event page</h1>

      <EventsSearch onSearch={handleSearch} />
      <EventList events={props.events} />
    </div>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();
  return { props: { events: events }, revalidate: 60 };
}
export default Event;
