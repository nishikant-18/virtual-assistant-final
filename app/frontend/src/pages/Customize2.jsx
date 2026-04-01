import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

const Customize2 = () => {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.AssistantName || "",
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleUpdateAssistant = async () => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true },
      );
      setLoading(false);
      console.log(result.data);
      setUserData(result.data);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 py-6 text-white overflow-hidden bg-[#010118]">
      {/* 🔵 Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-600 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-indigo-600 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] left-[50%] w-[250px] h-[250px] bg-purple-600 opacity-20 rounded-full blur-3xl"></div>
      </div>
      <div className="w-full max-w-6xl">
        <MdKeyboardBackspace
          onClick={() => navigate("/")}
          className="text-3xl cursor-pointer hover:scale-110 transition mb-4"
        />
      </div>

      {/* Heading */}
      <h1 className="text-2xl lg:text-4xl font-semibold text-center mb-8">
        Set your <span className="text-blue-500">Assistant Name</span>
      </h1>
      <input
        type="text"
        placeholder="eg. Jarvis"
        className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent  text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />
      {assistantName && (
        <button
          className="min-w-[300px] h-[60px] mt-[30px] text-black font-semibold cursor-pointer  bg-white rounded-full text-[19px] "
          disabled={loading}
          onClick={() => {
            handleUpdateAssistant();
          }}
        >
          {!loading ? "Finally Create Your Assistant" : "Loading..."}
        </button>
      )}
    </div>
  );
};

export default Customize2;
