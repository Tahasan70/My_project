import React, { useEffect, useState } from "react";
import { FaTrophy, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/clubs/${id}`);
        setClub(response.data);
      } catch (error) {
        console.error("Error fetching club details:", error);
        setClub(null);
      } finally {
        setLoading(false);
      }
    };
    fetchClub();
  }, [id]);

  // Default Data
  const demoClub = {
    name: "Tech Innovators Club",
    tagline: "Creating Future with Innovation",
    banner:
      "https://images.unsplash.com/photo-1638202677704-b74690bb8fa9?w=500&auto=format&fit=crop&q=60",
    des: "A group of passionate individuals exploring new tech advancements.",
    members: [
      { id: 1, name: "Alice Johnson", role: "President", image: "https://via.placeholder.com/100" },
      { id: 2, name: "Bob Smith", role: "Vice President", image: "https://via.placeholder.com/100" },
      { id: 3, name: "Charlie Brown", role: "Secretary", image: "https://via.placeholder.com/100" },
    ],
    achievements: [
      "Won National Robotics Championship 2023 🏆",
      "Organized CUET AI Summit 2024 🤖",
      "Developed Smart City App used by 10K+ people 🌍",
    ],
    events: [
      { id: 1, name: "Hackathon 2024", date: "March 20, 2024", description: "An exciting coding competition!" },
      { id: 2, name: "Tech Workshop", date: "April 10, 2024", description: "Learn AI and Machine Learning trends." },
    ],
  };

  const displayedClub = club || demoClub;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-purple-800 text-white p-6 md:min-h-screen shadow-xl rounded-md">
          <h2 className="text-2xl font-bold">{}</h2>
          <ul className="mt-6 space-y-4 text-lg">
            {["About", "Members", "Achievements", "Events"].map((item) => (
              <li key={item} className="hover:underline cursor-pointer hover:text-yellow-400 transition">{item}</li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          {/* Club Banner */}
          <div className="relative h-60 w-full rounded-lg overflow-hidden shadow-xl">
            <img src={displayedClub.banner} alt={displayedClub.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-80 text-white p-6 rounded-b-lg">
              <h1 className="text-3xl font-bold">{displayedClub.name}</h1>
              <p className="text-lg italic">{displayedClub.tagline}</p>
            </div>
          </div>

          {/* Club Description */}
          <section className="mt-10 bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <h2 className="text-2xl font-semibold text-purple-400">About the Club</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">{displayedClub.des}</p>
          </section>

          {/* Members List */}
          <section className="mt-10 bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-purple-400">Members</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {displayedClub.members.map((member) => (
                <div key={member.id} className="bg-gray-700 p-4 rounded-lg text-center shadow-md">
                  <img src={member.image} alt={member.name} className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-purple-400" />
                  <p className="mt-2 font-bold text-gray-200">{member.name}</p>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section className="mt-10 bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2">
              <FaTrophy className="text-yellow-400" /> Achievements
            </h2>
            <ul className="mt-4 list-disc pl-6 text-gray-300">
              {displayedClub.achievements.map((achievement, index) => (
                <li key={index} className="mt-2">{achievement}</li>
              ))}
            </ul>
          </section>

          {/* Club Events */}
          <section className="mt-10 bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-400" /> Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {displayedClub.events.map((event) => (
                <div key={event.id} className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="font-bold text-lg text-purple-400">{event.name}</h3>
                  <p className="text-gray-300">{event.date}</p>
                  <p className="mt-2 text-gray-400">{event.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ClubDetails;
