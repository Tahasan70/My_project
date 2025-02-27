import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
        
        {/* Branding Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-lg font-bold text-white">Event Hive</h3>
          <p className="text-sm text-gray-400">
            Connecting clubs and events seamlessly.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6 mb-4 md:mb-0">
          <a href="#" className="text-gray-400 hover:text-gray-300 transition">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 transition">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 transition">
            Contact Us
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-sm text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Event Hive. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
