import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(data.username, data.password);
      toast.success("🟢 Registered Successfully");
      navigate("/login"); // ✅ Redirect to Login
    } catch (err) {
      toast.error("❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        className="bg-[#1e1e2f] p-10 rounded-2xl shadow-2xl w-96 space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text">
          📝 Register
        </h2>

        <input
          name="username"
          placeholder="👤 Username"
          className="w-full p-3 bg-[#2a2a3c] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={data.username}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="🔒 Password"
          className="w-full p-3 bg-[#2a2a3c] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              : "bg-green-600 hover:bg-green-700 transition"
          }`}
        >
          {loading ? "Registering..." : "✅ Register"}
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
