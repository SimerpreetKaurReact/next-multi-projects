import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import EventItem from "../../components/events/EventItem";
import { getEventById } from "../../data/dummy-data";
import ErrorAlert from "../../components/ui/ErrorAlert";

const CurrentEvent = () => {
  const router = useRouter();
  const eventId = router.query.eventId;

  console.log(router.query);
  const event = getEventById(eventId);
  if (!router.isReady) return <h3>Loading Event..</h3>;
  if (router.isReady && !event)
    return (
      <ErrorAlert>
        <p className="center">Event not Found</p>
      </ErrorAlert>
    );

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

export default CurrentEvent;
