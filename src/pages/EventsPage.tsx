import { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { fetchEvents } from "@/redux/campusevents/eventActions";
import EventCard from "@/components/EventCard";

const EventsPage = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(fetchEvents() as any);
  }
  , [dispatch]);

  return (
    <div>
      <div className="px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.map((event: { event_id: Key | null | undefined; }) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventsPage