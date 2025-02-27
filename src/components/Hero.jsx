import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Hero = () => {
  const [clubs, setClubs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:2000/allclubs");
        setClubs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    getData();
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
      {/* Darker Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Welcome to
        </h1>
        <p className="text-4xl md:text-6xl font-extrabold text-purple-400 drop-shadow-lg mt-2">
          Clubs Event Portal -{" "}
          <span className="text-purple-600">Event Hive</span> of CUET
        </p>
        <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl">
          Discover and engage with exciting clubs, explore events, and stay
          connected with your university community.
        </p>
      </div>
    </div>
  );
};

export default Hero;
