import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/signup", { username, password, role });
      navigate("/login");
    } catch (err) {
      setError("Failed to create account");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Signup
        </h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition"
          >
            Signup
          </button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-orange-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
