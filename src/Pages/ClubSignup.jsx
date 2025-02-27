import React from "react";
import Login from "../components/Login";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SignUp from "../components/SignUp";

const ClubSignup = () => {
  return (
    <div className="w-full bg-gray-100 min-h-screen overflow-hidden">
      <div className="w-full flex justify-center items-center border-black border-b-1 shadow">
        <Header />
      </div>
      <div>
        <SignUp />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ClubSignup;
