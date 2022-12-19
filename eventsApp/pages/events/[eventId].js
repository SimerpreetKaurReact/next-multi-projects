import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import EventItem from "../../components/events/EventItem";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getEventById, getEventIds } from "../../helper/api-utils";

const CurrentEvent = (props) => {
  // const router = useRouter();
  // const eventId = router.query.eventId;

  // console.log(router.query);
  // const event = getEventById(eventId);
  const event = props.event;
  // if (!router.isReady) return <h3>Loading Event..</h3>;
  // if (!event)
  //   return (
  //     <ErrorAlert>
  //       <p className="center">Event not Found</p>
  //     </ErrorAlert>
  //   );
  if (!props.event) return <h3 className="center">Loading Event..</h3>;

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;
  const event = await getEventById(eventId);
  return {
    props: { event },
    revalidate: 30,
  };
}
export async function getStaticPaths() {
  const paths = await getEventIds();
  console.log(paths, "paths");
  const pathsWithParams = paths.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}
export default CurrentEvent;
