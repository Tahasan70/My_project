import React, { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full flex py-4 px-8 md:px-24 gap-1 items-center transition-all duration-300 ${
        isScrolled ? "bg-gray-900 bg-opacity-80 shadow-lg" : "bg-transparent"
      } text-white z-50`}
    >
      {/* Logo */}
      <div className="w-[60%] flex items-center">
        <div
          className="font-bold text-3xl flex gap-2 cursor-pointer transition-all"
          onClick={() => navigate("/")}
        >
          <span className="font-black">Event</span>
          <span className="text-purple-400">Hive</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="w-[40%] hidden md:flex justify-between items-center">
        {["Home", "Clubs", "Events"].map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/${item.toLowerCase()}`)}
            className="font-medium cursor-pointer transition-all hover:text-purple-400"
          >
            {item}
          </div>
        ))}
        <button
          className="bg-white text-gray-800 p-2 rounded-md flex items-center justify-center hover:bg-purple-400 hover:text-white transition-all"
          onClick={toggleSidebar}
        >
          <IoMdMenu size={24} />
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden bg-white text-gray-800 p-2 rounded-md flex items-center justify-center hover:bg-purple-400 hover:text-white transition-all"
        onClick={toggleSidebar}
      >
        <IoMdMenu size={24} />
      </button>

      {/* Sidebar */}
      {isSidebarOpen && (
        <>
          <div className="fixed top-0 left-0 w-[250px] h-full bg-gray-900 text-white shadow-lg z-50 p-6 rounded-r-lg transition-transform transform translate-x-0">
            <button
              className="text-white font-bold text-2xl hover:text-purple-400 transition-all"
              onClick={toggleSidebar}
            >
              &times;
            </button>
            <ul className="mt-6 flex flex-col gap-6">
              {[
                { name: "Login As DSW", path: "/dswlogin" },
                { name: "Login as Club Admin", path: "/ClubLogin" },
                { name: "Application for New Club", path: "#" },
              ].map((item, index) => (
                <li
                  key={index}
                  className="text-lg font-semibold cursor-pointer hover:text-purple-400 transition-all"
                  onClick={() => {
                    if (item.path !== "#") navigate(item.path);
                    toggleSidebar();
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Overlay */}
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 transition-opacity"
            onClick={toggleSidebar}
          ></div>
        </>
      )}
    </div>
  );
};

export default Header;
