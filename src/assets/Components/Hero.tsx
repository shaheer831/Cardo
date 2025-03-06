import { motion } from "framer-motion";
import avatars from "../avatars/json";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-between overflow-x-hidden">
      {/* Left side - Text content */}
      <motion.div
        className="w-full md:w-1/2 mt-36 lg:mt-0 text-center md:text-left h-full px-7 mb-8 md:mb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold  mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Master the Cards
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Immerse yourself in a world of strategy, skill, and excitement with
          our revolutionary card game that challenges your mind and tests your
          luck.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/games">
            <button className="px-6 w-52 lg:w-auto mx-auto lg:mx-0 bg-black text-white py-3 font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
              Play Now
            </button>
          </Link>
          <button className="px-6 py-3 bg-transparent font-medium rounded-lg transition-colors duration-300 relative group">
            <span>Learn More</span>
            <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </button>
        </motion.div>
      </motion.div>

      {/* Right side - Card image */}
      <div className="w-full hidden lg:block md:w-1/2 items-center justify-center relative">
        <motion.img
          initial={{ x: 300, y: -300, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 9,
            mass: 1,
          }}
          className="w-[380px] ml-32 z-10"
          src={avatars[0].src}
          alt="Card Game Character"
        />
      </div>
    </div>
  );
};

export default Hero;
