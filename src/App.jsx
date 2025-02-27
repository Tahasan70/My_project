import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Event from "./Pages/Event";
import Home from "./Pages/Home";
import ClubLogin from "./Pages/ClubLogin";
import ClubSignup from "./Pages/ClubSignup";
import DswLoginP from "./Pages/DSWLoginP";
import Clubs from "./Pages/Clubs";
import ClubAdminDashboard from "./Pages/ClubAdminDash";
import ApplyEvent from "./Pages/ApplyEvent";
import ErrorPage from "./Pages/Error";
import ClubDetails from "./Pages/ClubDetails";
import AdminDashboard from "./Pages/AdminDashboard";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Event />} />
          <Route path="/ClubLogin" element={<ClubLogin />} />
          <Route path="/ClubSignup" element={<ClubSignup />} />
          <Route path="/dswlogin" element={<DswLoginP />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/admindash" element={<AdminDashboard />} />
          <Route path="/applyevent" element={<ApplyEvent />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/clubdetails" element={<ClubDetails />} />
          <Route path="/clubadmindash" element={<ClubAdminDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
