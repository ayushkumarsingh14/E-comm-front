import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await loginUser(data.username, data.password);
      if (!token) throw new Error("Token not received");

      localStorage.setItem("token", token);
      toast.success("🟢 Login Successful");
      navigate("/products"); // ✅ Redirect to ProductList
    } catch (err) {
      console.error("Login Error:", err.message);
      toast.error("❌ Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-[#1e1e2f] p-10 rounded-2xl shadow-2xl w-96 space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          🔐 Login
        </h2>

        <input
          name="username"
          placeholder="👤 Username"
          className="w-full p-3 bg-[#2a2a3c] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={data.username}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="🔒 Password"
          className="w-full p-3 bg-[#2a2a3c] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={data.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 transition"
          }`}
        >
          {loading ? "Logging in..." : "🚀 Login"}
        </button>

        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
