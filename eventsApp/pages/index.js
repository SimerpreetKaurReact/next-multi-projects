import React from "react";
import { events } from "./events";
import { useRouter } from "next/router";
import { getFeaturedEvents } from "../data/dummy-data";
import EventList from "../components/events/EventList";
//show only featured events
const Home = () => {
  const router = useRouter();
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
};

export default Home;
