"use client";

import { motion } from "framer-motion";
import { Button } from "@radix-ui/themes";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const handleGoogleLogin = () => {
    router.push("/dashboard");
  };
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <motion.div
          className="gradient-bg"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Login Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-xl shadow-lg"
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-3xl font-bold text-white mb-6"
        >
          Welcome to Issue Tracker
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-gray-300 text-center mb-6"
        >
          Sign in to access your account
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            className="google-button flex items-center gap-3 px-6 py-3 text-lg text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg transition-all duration-300"
            onClick={handleGoogleLogin}
          >
            <FaGoogle size={24} />
            <span>Login with Google</span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
