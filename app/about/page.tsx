"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TechProfile = ({ imageUrl }: { imageUrl: string }) => {
  const [description, setDescription] = useState("");

  // Typewriter Effect
  useEffect(() => {
    const text = "Building the future, one line of code at a time. 🚀";
    let index = 0;

    const interval = setInterval(() => {
      setDescription((prev) => {
        if (index < text.length) {
          const updatedText = prev + text[index];
          index++;
          return updatedText;
        } else {
          clearInterval(interval);
          return prev; // Ensures no extra "undefined"
        }
      });
    }, 50); // Speed of typing

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 z-0 opacity-40"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          style={{
            background:
              "linear-gradient(135deg, #00f260, #0575E6, #00c3ff, #00f260)",
            backgroundSize: "400% 400%",
          }}
        />

        {/* Glassmorphism Card */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-white/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Profile Image */}
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src="/IMG_4460.JPG"
              alt="Carlos Gonzalez"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <h1 className="text-white text-3xl font-bold mt-4">
            Carlos Gonzalez
          </h1>
          <p className="text-gray-300 mt-2">The super awesome Developer 🚀</p>

          {/* Animated Description */}
          <motion.p
            className="text-gray-200 text-center mt-4 text-lg px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </>
  );
};

export default TechProfile;
