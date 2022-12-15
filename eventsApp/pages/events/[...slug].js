import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFilteredEvents } from "../../data/dummy-data";

const FileredEvent = () => {
  const router = useRouter();
  const slug = router.query.slug;
  if (!router.isReady) return <p className="center">Loading...</p>;
  const [year, month] = slug;
  if (isNaN(+year) || isNaN(+month))
    return (
      <>
        <ErrorAlert>
          <p className="center">Invalid filter, please adjust your value</p>{" "}
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  console.log("FileredEvent", router.query);
  const filteredEvents = getFilteredEvents({ year: +year, month: +month });
  console.log(filteredEvents);
  if (!filteredEvents.length)
    return (
      <>
        {" "}
        <ErrorAlert>
          <p> No Event Found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  const date = new Date(year, month);
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </div>
  );
};

export default FileredEvent;
