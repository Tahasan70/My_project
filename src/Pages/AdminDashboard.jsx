import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Home, Calendar, Users, Menu, ClipboardList } from "lucide-react";
import { FaSignOutAlt } from "react-icons/fa";
import UpcomingEvents from "../components/events/UpcomingEvents";
import PendingEvents from "../components/events/PendingEvents";
import RejectedEvents from "../components/events/RejectedEvents";
import { useNavigate } from "react-router-dom";

// Mock data for charts
const data = [
  { name: "Jan", events: 10 },
  { name: "Feb", events: 15 },
  { name: "Mar", events: 20 },
  { name: "Apr", events: 25 },
  { name: "May", events: 18 },
];

const pieData = [
  { name: "Music Club", value: 5 },
  { name: "Drama Club", value: 8 },
  { name: "Sports Club", value: 6 },
  { name: "Tech Club", value: 4 },
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"];

// Components for each feature

const NewClubRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:2000/club-requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching club requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      await axios.patch(
        `http://localhost:2000/club-requests/approve/${requestId}`
      );
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      console.error("Error approving club request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.patch(
        `http://localhost:2000/club-requests/reject/${requestId}`
      );
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      console.error("Error rejecting club request:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">New Club Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No new club requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold">{request.clubName}</h3>
              <p className="text-gray-700">{request.description}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleApprove(request._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeFeature, setActiveFeature] = useState("dashboard");
  const [pendingEventsCount, setPendingEventsCount] = useState(0);
  const [upcomingEventsCount, setUpcomingEventsCount] = useState(0);

  useEffect(() => {
    const fetchEventCounts = async () => {
      try {
        const pendingResponse = await axios.get(
          "http://localhost:2000/events/pending"
        );
        setPendingEventsCount(pendingResponse.data.length);

        const upcomingResponse = await axios.get(
          "http://localhost:2000/events/approved"
        );
        setUpcomingEventsCount(upcomingResponse.data.length);
      } catch (error) {
        console.error("Error fetching event counts:", error);
      }
    };

    fetchEventCounts();

    // Poll every 10 seconds for updates
    const interval = setInterval(fetchEventCounts, 10000);

    return () => clearInterval(interval);
  }, []);

  const renderActiveFeature = () => {
    switch (activeFeature) {
      case "dashboard":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Pending Events</h2>
                <p className="text-2xl font-bold">{pendingEventsCount}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Upcoming Events</h2>
                <p className="text-2xl font-bold">{upcomingEventsCount}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">New Club Requests</h2>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Event Trends</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="events" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Events by Club</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case "upcomingEvents":
        return <UpcomingEvents />;
      case "pendingEvents":
        return <PendingEvents />;
      case "rejectedEvents":
        return <RejectedEvents />;
      case "newClubRequests":
        return <NewClubRequests />;
      default:
        return null;
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white p-5 shadow-md ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mb-4"
        >
          <Menu className="w-6 h-6" />
        </button>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveFeature("dashboard")}
            className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 w-full"
          >
            <Home />{" "}
            <span className={isSidebarOpen ? "block" : "hidden"}>
              Dashboard
            </span>
          </button>
          <button
            onClick={() => setActiveFeature("upcomingEvents")}
            className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 w-full"
          >
            <Calendar />{" "}
            <span className={isSidebarOpen ? "block" : "hidden"}>
              Upcoming Events
            </span>
          </button>
          <button
            onClick={() => setActiveFeature("pendingEvents")}
            className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 w-full"
          >
            <ClipboardList />{" "}
            <span className={isSidebarOpen ? "block" : "hidden"}>
              Pending Events
            </span>
          </button>
          <button
            onClick={() => setActiveFeature("rejectedEvents")}
            className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 w-full"
          >
            <ClipboardList />{" "}
            <span className={isSidebarOpen ? "block" : "hidden"}>
              Rejected Events
            </span>
          </button>
          <button
            onClick={() => setActiveFeature("newClubRequests")}
            className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 w-full"
          >
            <Users />{" "}
            <span className={isSidebarOpen ? "block" : "hidden"}>
              New Club Requests
            </span>
          </button>
          <button
            className="flex items-center gap-2 p-2 hover:bg-red-100 rounded text-red-600 w-full"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />{" "}
            <span className={isSidebarOpen ? "block" : "hidden"}>Sign Out</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded-md"
          />
        </div>

        {/* Render Active Feature */}
        {renderActiveFeature()}
      </div>
    </div>
  );
}
