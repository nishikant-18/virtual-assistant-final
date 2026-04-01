import React, { useContext, useRef } from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import image7 from "../assets/image7.jpg";
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

function Customize() {
  const {
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);

  const navigate = useNavigate();
  const inputImage = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 py-6 text-white overflow-hidden bg-[#010118]">
      {/* 🔵 Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-600 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-indigo-600 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] left-[50%] w-[250px] h-[250px] bg-purple-600 opacity-20 rounded-full blur-3xl"></div>
      </div>
      {/* Back Button */}
      <div className="w-full max-w-6xl">
        <MdKeyboardBackspace
          onClick={() => navigate("/")}
          className="text-3xl cursor-pointer hover:scale-110 transition mb-4"
        />
      </div>

      {/* Heading */}
      <h1 className="text-2xl lg:text-4xl font-semibold text-center mb-8">
        Select your <span className="text-blue-500">Assistant Image</span>
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-8 gap-4 justify-center">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* Upload Card (Same Size) */}
        <div
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
          className={`
            w-[70px] h-[140px] lg:w-[150px] lg:h-[250px]
            rounded-2xl flex items-center justify-center
            border-2 border-dashed border-blue-500
            cursor-pointer overflow-hidden
            transition-all duration-300
            
            hover:scale-105 hover:border-white
            hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
          `}
        >
          {!frontendImage ? (
            <RiImageAddLine className="text-3xl text-blue-400" />
          ) : (
            <img
              src={frontendImage}
              alt="preview"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>

      {/* Next Button */}
      {selectedImage && (
        <button
          onClick={() => navigate("/customize2")}
          className="
            mt-10 px-8 py-3 rounded-full
            bg-gradient-to-r from-blue-500 to-indigo-600
            hover:from-blue-600 hover:to-indigo-700
            transition-all duration-300
            shadow-lg hover:shadow-blue-500/40
            text-lg font-medium
          "
        >
          Next →
        </button>
      )}
    </div>
  );
}

export default Customize;
