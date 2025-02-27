import React from "react";
import Login from "../components/Login";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CreateEvent from "../components/CreateEvent";

const Apply = () => {
  return (
    <div className="w-full bg-gray-100 min-h-screen overflow-hidden">
      <div className="w-full flex justify-center items-center border-black border-b-1 shadow">
        <Header />
      </div>
      <div>
        <CreateEvent />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Apply;
