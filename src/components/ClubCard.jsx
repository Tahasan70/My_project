import React from "react";
import { FaArrowRight } from "react-icons/fa";

const ClubCard = ({ name, image, tagline }) => {
  return (
    <div className="p-6 max-w-sm h-[400px] rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-xl transition-transform transform">
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={image}
        alt={`${name} logo`}
      />
      <div className="p-4 flex flex-col justify-between h-[calc(100%-12rem)]">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{tagline}</p>
        <div className="flex items-center justify-end text-purple-500 font-medium text-[1.2rem] cursor-pointer hover:underline">
          <span>Details</span>
          <FaArrowRight className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
