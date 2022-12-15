import React from "react";
import EventItem from "./EventItem";
import classes from "./EventList.module.css";
const EventList = (props) => {
  const { events } = props;
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          image={event.image}
          location={event.location}
          date={event.date}
        />
      ))}
    </ul>
  );
};

export default EventList;
