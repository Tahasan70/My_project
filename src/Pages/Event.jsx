import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios"; // For making API requests

const Event = () => {
  const [events, setEvents] = useState([]); // State to store all events
  const [upcomingEvents, setUpcomingEvents] = useState([]); // State for upcoming events
  const [pastEvents, setPastEvents] = useState([]); // State for past events
  const [selectedFilter, setSelectedFilter] = useState("upcoming"); // State for selected filter

  // Fetch all events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/events/approved"
        );
        setEvents(response.data);
        console.log(response.data);

        // Filter events into upcoming and past
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only the date

        const upcoming = response.data.filter((event) => {
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only the date
          return eventDate > currentDate; // Events after today
        });

        const past = response.data.filter((event) => {
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only the date
          return eventDate < currentDate; // Events before today
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle filter change
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  // Determine which events to display based on the selected filter
  const displayedEvents =
    selectedFilter === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex h-[20rem] px-10">
        <div
          className="w-full bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.prothomalo.com/prothomalo-english%2F2022-06%2Fccc4c526-b989-4a2c-b87f-157a667ce4d5%2Fprothomalo_bangla_2022_01_b76a4ae6_8097_4f03_adca_9c26d6b8e9c6_prothomalo_bangla_2020_11_a87fb53d_79.png?rect=0%2C45%2C640%2C336&w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop&overlay=&overlay_position=bottom&overlay_width_pct=1')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold mb-4">Event Management</h1>
            <div className="w-full flex gap-4 items-center justify-center mb-4">
              <button
                className={`px-6 py-3 rounded-md ${
                  selectedFilter === "upcoming"
                    ? "bg-purple-500"
                    : "bg-gray-500"
                }`}
                onClick={() => handleFilterChange("upcoming")}
              >
                Upcoming Events
              </button>
              <button
                className={`px-6 py-3 rounded-md ${
                  selectedFilter === "past" ? "bg-purple-500" : "bg-gray-500"
                }`}
                onClick={() => handleFilterChange("past")}
              >
                Past Events
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display Events */}
      <div className="px-10 py-6">
        <h2 className="text-2xl font-bold mb-4">
          {selectedFilter === "upcoming" ? "Upcoming Events" : "Past Events"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.event_description}</p>
                <p className="text-gray-600">
                  {new Date(event.date).toLocaleDateString()} |{" "}
                  {event.start_time} - {event.end_time}
                </p>
                <p className="text-gray-600">{event.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
