import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/events/approved"
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching approved events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Upcoming Events
      </h2>
      {loading ? (
        <p className="text-center text-gray-600">
          {" "}
          <Loader />{" "}
        </p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-600">No upcoming events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              {event.img && (
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
              <p className="text-gray-700 mt-2">{event.event_description}</p>
              <p className="text-gray-700 mt-2">
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Venue:</strong> {event.venue}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
