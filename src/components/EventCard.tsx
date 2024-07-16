import TimeAgoPill from './custom-ui/TimeAgoPill';
import clockimg from '../assets/icons/clock-icon.svg';

const EventCard = ({ event }: { event: any }) => {

  return (
    <div className="flex flex-col rounded-2xl shadow-lg bg-neutral-900 border border-gray-700 mb-10">
      <div className="flex items-center mb-3 ml-3">
        <span className="text-sm font-semibold text-white uppercase bg-green-500 rounded-full px-2 py-1 mr-2">Event</span>
        <span className="text-xs text-slate-500">Edited</span>
        <div className="w-24 h-6 relative ml-auto">
          <div className="w-24 h-6 left-0 top-0 absolute bg-green-500 rounded-tr-lg rounded-bl-lg"></div>
          <div className="w-3 h-6 left-2 top-1 absolute">
            <img src={clockimg} alt="Clock Icon" />
          </div>
          <div className="w-18 h-6 left-5 top-1 absolute text-center text-black text-xs font-medium leading-snug flex items-center justify-center">
            <TimeAgoPill startTime={event.posted_on} />
          </div>
        </div>
      </div>
      <div className="flex items-center ml-3">
        <p className="text-gray-400 mb-2">{event.event_name}</p>
      </div>
      <div className="ml-3 mt-3">
        <div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-white mb-2 break-word">{event.event_name}</span>
          </div>
          <p className="text-white mb-2 ml-3 mr-3 text-lg">{event.description}</p>
        </div>
      </div>
      <div className="ml-3 mt-auto">
        <div className="mt-3 ml-3">
          <strong className="text-white text-lg mr-2">Location:</strong>
          <span className="text-gray-400">{event.location}</span>
        </div>
      </div>
      <div className="ml-3 mt-auto">
        <div className="mt-3 ml-3">
          <strong className="text-white text-lg mr-2">Date:</strong>
          <span className="text-gray-400">{event.start_date}</span>
        </div>
        <div className="mt-2 ml-3">
          <strong className="text-white text-lg mr-2">Start Time:</strong>
          <span className="text-gray-400">{event.start_time}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
