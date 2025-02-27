import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DSWLogin from "../components/DSWLogin";

const DswLoginP = () => {
  return (
    <div className="w-full bg-gray-100 min-h-screen overflow-hidden">
      <div className="w-full flex justify-center items-center border-black border-b-1 shadow">
        <Header />
      </div>
      <div>
        <DSWLogin />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DswLoginP;
