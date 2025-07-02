import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";
import { Leaf, TreePalm, Globe2 } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded?.role;
        if (role === "admin") navigate("/admin");
        else if (role === "user") navigate("/dashboard");
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* 🍃 Slim Leaf Background Particles */}
      <Particles
        id="leafParticles"
        init={particlesInit}
        className="absolute top-0 left-0 w-full h-full z-0"
        options={{
          fullScreen: false,
          background: { color: { value: "#ffffff00" } },
          particles: {
            number: { value: 20 },
            shape: {
              type: "image",
              image: {
                src: "/slim-leaf.png", // Make sure it's in public/
                width: 30,
                height: 30
              }
            },
            move: {
              direction: "bottom",
              enable: true,
              speed: 1.2,
              outModes: { default: "out" }
            },
            size: { value: 24 },
            opacity: { value: 0.8 }
          }
        }}
      />

      {/* 🌿 Main Content */}
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-green-800 mb-4"
        >
          🌿 Welcome to GreenTrack
        </motion.h1>
        <p className="text-lg md:text-xl text-green-700 mb-6 max-w-xl mx-auto">
          Track your tree plantations, contribute to a greener planet, and lead the change.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/register")}
          className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-700 transition"
        >
          Get Started
        </motion.button>
      </div>

      {/* 🔥 Feature Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        <Feature icon={<Leaf />} title="Live Plantation Map" desc="See global contributions on an interactive map in real-time." />
        <Feature icon={<TreePalm />} title="Track Your Trees" desc="Easily log your plantation data and see your growth impact." />
        <Feature icon={<Globe2 />} title="Global Leaderboard" desc="Contribute and compete to become a top eco-hero in your region." />
      </div>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl shadow-md border border-green-200 text-center"
  >
    <div className="flex justify-center mb-4">
      {React.cloneElement(icon, { className: "h-10 w-10 text-green-500" })}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-green-700">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

export default Home;
