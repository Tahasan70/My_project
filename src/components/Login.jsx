import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentID: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.studentID == "123" || formData.password == "123") {
      navigate("/clubadmindash");
    } else {
      navigate("/error");
    }
    console.log(formData);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div
        className="md:w-1/2 w-full bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.prothomalo.com/prothomalo-english%2F2022-06%2Fccc4c526-b989-4a2c-b87f-157a667ce4d5%2Fprothomalo_bangla_2022_01_b76a4ae6_8097_4f03_adca_9c26d6b8e9c6_prothomalo_bangla_2020_11_a87fb53d_79.png?rect=0%2C45%2C640%2C336&w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop&overlay=&overlay_position=bottom&overlay_width_pct=1')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent flex flex-col justify-center items-center text-white p-8">
          <h1 className="text-4xl font-bold mb-4">Welcome</h1>
          <p className="text-lg mb-6">Please log in to access your account.</p>
          <div className="text-center">
            <p className="text-md mb-4">Apply for club membership</p>
            <button
              onClick={() => navigate("/ClubSignup")}
              className="px-6 py-3 bg-purple-700 hover:bg-purple-800 rounded-md text-white transition-all"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full bg-white flex flex-col justify-center items-center p-6 md:p-16">
        <h2 className="text-2xl font-bold mb-6 text-purple-600">
          Club Admin Login
        </h2>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="studentID"
              className="block text-gray-800 font-medium mb-2"
            >
              Student ID
            </label>
            <input
              type="text"
              id="studentID"
              value={formData.studentID}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter your student ID"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-800 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-6">
          Forgot your password?{" "}
          <span
            onClick={() => alert("Redirect to reset password")}
            className="text-purple-500 hover:underline cursor-pointer"
          >
            Reset here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
