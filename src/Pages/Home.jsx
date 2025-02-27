import React from "react";
import Header from "../components/Header";
import CreateEvent from "../components/CreateEvent";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

const Home = () => {
  return (
    <div className="w-full bg-gray-100 min-h-screen overflow-hidden flex flex-col">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
