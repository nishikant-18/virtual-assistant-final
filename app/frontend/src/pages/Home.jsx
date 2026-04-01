import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import aiImg from "../assets/ai.gif";
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import userImg from "../assets/user.gif";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);

  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const [ham, setHam] = useState(false);
  const isRecognizingRef = useRef(false);
  const synth = window.speechSynthesis;

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
    }
  };

  const speak = (text) => {
    const utterence = new SpeechSynthesisUtterance(text);
    utterence.lang = "hi-IN";

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang === "hi-IN");
    if (hindiVoice) utterence.voice = hindiVoice;

    isSpeakingRef.current = true;

    utterence.onend = () => {
      setAiText("");
      isSpeakingRef.current = false;
      setTimeout(() => startRecognition(), 800);
    };

    synth.cancel();
    synth.speak(utterence);
  };

  const startRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current?.start();
      } catch {}
    }
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if (type === "google-search") {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, "_blank");
    }
    if (type === "youtube-search") {
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, "_blank");
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = "en-US";

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false);
      setTimeout(() => recognition.start(), 1000);
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setUserText(transcript);
        recognition.stop();

        const data = await getGeminiResponse(transcript);
        handleCommand(data);
        setAiText(data.response);
        setUserText("");
      }
    };

    recognition.start();

    return () => recognition.stop();
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-white overflow-hidden bg-[#020218]">

      {/* 🔵 Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-600 opacity-30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-600 opacity-30 blur-3xl rounded-full"></div>
      </div>

      {/* ☰ Menu */}
      <CgMenuRight
        className="lg:hidden absolute top-5 right-5 text-3xl cursor-pointer"
        onClick={() => setHam(true)}
      />

      {/* 📱 Sidebar */}
      <div className={`fixed top-0 right-0 w-full h-full bg-black/60 backdrop-blur-xl p-6 transition-transform ${ham ? "translate-x-0" : "translate-x-full"}`}>
        <RxCross1
          className="text-2xl absolute top-5 right-5 cursor-pointer"
          onClick={() => setHam(false)}
        />

        <div className="mt-16 flex flex-col gap-4">
          <button className="btn" onClick={handleLogOut}>Log Out</button>
          <button className="btn" onClick={() => navigate("/customize")}>
            Customize Assistant
          </button>
        </div>
      </div>

      {/* 🧠 Assistant Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4">

        <div className="w-[220px] h-[300px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={userData?.assistantImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="text-xl font-semibold">
          I'm <span className="text-blue-400">{userData?.assistantName}</span>
        </h1>

        {/* Status Animation */}
        <img
          src={aiText ? aiImg : userImg}
          alt=""
          className={`w-[150px] transition-all duration-300 ${listening ? "scale-110" : ""}`}
        />

        {/* Text Output */}
        <div className="min-h-[40px] text-center text-gray-200 px-2">
          {userText || aiText}
        </div>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden lg:flex absolute top-5 right-5 gap-4">
        <button className="btn" onClick={handleLogOut}>Log Out</button>
        <button className="btn" onClick={() => navigate("/customize")}>
          Customize
        </button>
      </div>

    </div>
  );
}

export default Home;