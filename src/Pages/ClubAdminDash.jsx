import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaCalendarAlt,
  FaClipboardList,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const ClubAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-md p-4 flex flex-col space-y-4 min-h-screen">
        <h2 className="text-xl font-bold text-purple-600 text-center">
          Club Admin
        </h2>
        <a
          href="https://ruman098-cuet-event-budget-predictor-app-dn1um5.streamlit.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 hover:bg-purple-100 rounded"
        >
          <FaChartBar /> Predict Your Event Budget
        </a>
        <button
          className="flex items-center gap-2 p-2 hover:bg-purple-100 rounded"
          onClick={() => navigate("/applyevent")}
        >
          <FaCalendarAlt /> Apply for New Event
        </button>
        <button
          className="flex items-center gap-2 p-2 hover:bg-purple-100 rounded"
          onClick={() => navigate("/upcoming-events")}
        >
          <FaClipboardList /> See Upcoming Events
        </button>
        <button
          className="flex items-center gap-2 p-2 hover:bg-purple-100 rounded"
          onClick={() => navigate("/club-details")}
        >
          <FaInfoCircle /> Club Details
        </button>
        <button
          className="flex items-center gap-2 p-2 hover:bg-red-100 rounded text-red-600"
          onClick={() => navigate("/")}
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="w-full border-b shadow bg-white p-4">
          <Header />
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-700">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {/* Upcoming Events */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold text-purple-600">
                Upcoming Events
              </h3>
              <ul className="mt-2 text-gray-600">
                <li>- Tech Conference 2025</li>
                <li>- Annual Club Meet</li>
                <li>- Hackathon</li>
              </ul>
            </div>

            {/* Pending Events */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-600">
                Pending Events
              </h3>
              <ul className="mt-2 text-gray-600">
                <li>- Robotics Workshop (Awaiting Approval)</li>
                <li>- Science Fair (Pending Budget Allocation)</li>
              </ul>
            </div>

            {/* Club Activity */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold text-green-600">
                Club Activity
              </h3>
              <ul className="mt-2 text-gray-600">
                <li>- Weekly Coding Challenges</li>
                <li>- Guest Speaker Sessions</li>
                <li>- Community Outreach Program</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ClubAdminDashboard;
