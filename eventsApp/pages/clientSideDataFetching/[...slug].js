import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import useSWR from "swr";
import { getFilteredEvents } from "../../helper/api-utils";

const FileredEventFromClient = () => {
  const [loadedEvents, setLoadedEvents] = useState("");
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const slug = router.query.slug;
  console.log(slug);
  const { data, error } = useSWR(
    "https://next-f68e2-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents || !router.isReady)
    return <p className="center">Loading...</p>;

  const [year, month] = slug;
  if (isNaN(+year) || isNaN(+month) || error)
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
  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === +year && eventDate.getMonth() === +month - 1
    );
  });
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

// export async function getServerSideProps(context) {
//   const { params, req, res } = context;
//   const [year, month] = params.slug;
//   const numYear = +year;
//   const numMonth = +month;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       notFound: true,
//       // redirect: {
//       //   destination: "/error",
//       // },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });
//   return { props: { filteredEvents, year: numYear, month: numMonth } };
// }
export default FileredEventFromClient;
