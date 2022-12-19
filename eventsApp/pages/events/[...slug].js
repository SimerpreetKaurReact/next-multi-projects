import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFilteredEvents } from "../../helper/api-utils";

const FileredEvent = (props) => {
  // const router = useRouter();
  // const slug = router.query.slug;
  // if (!router.isReady) return <p className="center">Loading...</p>;
  // const [year, month] = slug;
  const { filteredEvents, year, month } = props;
  console.log(filteredEvents);
  // if (isNaN(+year) || isNaN(+month))
  //   return (
  //     <>
  //       <ErrorAlert>
  //         <p className="center">Invalid filter, please adjust your value</p>{" "}
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </>
  //   );
  // const filteredEvents = getFilteredEvents({ year: +year, month: +month });
  // console.log(filteredEvents);
  // if (!props.filteredEvents.length)
  //   return (
  //     <>
  //       {" "}
  //       <ErrorAlert>
  //         <p> No Event Found</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </>
  //   );
  const date = new Date(year, month - 1);
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  const [year, month] = params.slug;
  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      notFound: true,
      // redirect: {
      //   destination: "/error",
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  return { props: { filteredEvents, year: numYear, month: numMonth } };
}
export default FileredEvent;
