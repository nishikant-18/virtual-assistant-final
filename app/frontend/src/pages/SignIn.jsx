import React, { useContext, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      setUserData(result.data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setUserData(null);
      setLoading(false);
      setErr(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <form
        onSubmit={handleSignIn}
        className="w-[90%] max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          SignIn to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
          />

          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-300 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
          </span>
        </div>

        {/* Error */}
        {err && <p className="text-red-400 text-sm mb-3 text-center">*{err}</p>}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 font-semibold shadow-lg disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Redirect */}
        <p
          onClick={() => navigate("/signup")}
          className="text-center text-gray-300 mt-4 cursor-pointer"
        >
          Register with new account?{" "}
          <span className="text-blue-400 hover:underline">Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
