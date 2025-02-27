import React, { useEffect, useState } from "react";
import { FaLightbulb, FaSearch, FaUsers, FaCalendarAlt } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:2000/allclubs");
        setClubs(response.data);
        setFilteredClubs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    getData();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = clubs.filter((club) =>
      club.name.toLowerCase().includes(query)
    );
    setFilteredClubs(filtered);
  };

  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[60vh] flex flex-col justify-center items-center text-center px-4" style={{ backgroundImage: "url('/path-to-background-image.jpg')" }}>
        <h1 className="text-6xl font-extrabold text-white drop-shadow-xl">Welcome to</h1>
        <h2 className="text-4xl font-bold text-purple-400 mt-2">Clubs Event Portal - Event Hive of CUET</h2>
        <p className="mt-4 text-lg opacity-90">Discover and engage with exciting clubs, explore events, and stay connected with your university community.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-800 py-10">
        <div className="flex justify-center">
          <div className="relative w-full max-w-lg">
            <FaSearch className="absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for a club..."
              className="w-full pl-12 pr-4 py-3 text-black rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
      </div>

      {/* Clubs Section */}
      <div className="p-14 bg-gray-900">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-8">Discover Your Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredClubs.length > 0 ? (
            filteredClubs.map((club) => (
              <div
                key={club._id}
                className="bg-gray-800 shadow-lg rounded-2xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => navigate("/clubdetails")}
              >
                {/* Club Images */}
                <div className="relative">
                  <img
                    src={club.imglink}
                    alt={club.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-purple-700 text-white px-3 py-1 text-sm rounded-lg">
                    <FaUsers className="inline-block mr-1" /> {club.members} Members
                  </div>
                </div>

                {/* Club Info */}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2">
                    <FaLightbulb className="text-yellow-400" /> {club.name}
                  </h2>
                  <p className="text-sm italic text-gray-400">{club.tagline}</p>
                  <p className="mt-3 text-gray-300">{club.des}</p>

                  {/* Club Stats */}
                  <div className="mt-4 flex justify-between text-gray-500">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-purple-400" /> <span>Events: {club.events}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-blue-400" /> <span>Members: {club.members}</span>
                    </div>
                  </div>

                  {/* Join Button */}
                  <button className="mt-6 w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition">
                    Join Club
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-lg col-span-3">No clubs found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Clubs;
