import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helper/api-utils";
import NewsletterRegistration from "../components/input/newsletter-registration";
//show only featured events
const Home = (props) => {
  const router = useRouter();
  // const featuredEvents = getFeaturedEvents();
  const featuredEvents = props.events;
  return (
    <div>
      <Head>
        <title>Upcoming Events</title>
        <meta name="Events" content="Upcoming events for your learning" />
      </Head>
      <NewsletterRegistration />
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
