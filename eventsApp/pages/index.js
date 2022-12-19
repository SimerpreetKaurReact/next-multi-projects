import React from "react";
import { events } from "./events";
import { useRouter } from "next/router";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helper/api-utils";
//show only featured events
const Home = (props) => {
  const router = useRouter();
  // const featuredEvents = getFeaturedEvents();
  const featuredEvents = props.events;
  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { events: featuredEvents },
  };
}
export default Home;
