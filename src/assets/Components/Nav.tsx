import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="w-full p-3 md:px-6 flex justify-between items-center">
      <span className="flex gap-2 items-center">
        <Link to="/">
          <motion.span
            className="text-xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            CardMaster
          </motion.span>
        </Link>
      </span>

      {/* Desktop Navigation */}
      <div className="flex gap-8 items-center">
      <Link to="/games">
            <button className="hidden lg:block px-6 w-52 lg:w-auto mx-auto lg:mx-0 bg-black text-white py-3 font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
              List
            </button>
          </Link>
      </div>
    </div>
  );
};

export default Nav;
