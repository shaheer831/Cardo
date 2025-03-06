"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import spaceFun from "../assets/space-fun/json";
import foodWars from "../assets/food-wars/json";
import { Link } from "react-router-dom";

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="bg-white text-black p-8 max-w-6xl mx-auto lg:mt-11">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Space Fun Game Card */}
        <GameCard
        location="space-fun"
          title="Space Fun"
          icon={<img src={spaceFun[7]} alt="Space Fun" className="w-11" />}
          frames={spaceFun.slice(0, 20)}
          isSelected={selectedGame === "Space Fun"}
          onSelect={() =>
            setSelectedGame(selectedGame === "Space Fun" ? null : "Space Fun")
          }
        />

        {/* Food Wars Game Card */}
        <GameCard
        location="food-wars"
          title="Food Wars"
          icon={<img src={foodWars[11]} alt="Food Wars" className="w-11" />}
          frames={foodWars.slice(0, 20)}
          isSelected={selectedGame === "Food Wars"}
          onSelect={() =>
            setSelectedGame(selectedGame === "Food Wars" ? null : "Food Wars")
          }
        />
      </div>
    </div>
  );
};

interface GameCardProps {
  title: string;
  icon: React.ReactNode;
  frames: string[];
  isSelected: boolean;
  onSelect: () => void;
  location: string;
}

const GameCard = ({ title, icon, frames, isSelected, location }: GameCardProps) => {
  return (
    <Link to={location}>
      <motion.div
        className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-black/20 shadow-lg hover:shadow-xl"
      }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        layout
      >
        {/* Card Header */}
        <motion.div
          className="p-2.5 px-5 flex items-center justify-between border-b border-black/10"
          layout
        >
          <div className="flex items-center gap-3">
            <motion.div
              className={`p-2 rounded-full ${
                isSelected ? "bg-black text-white" : "bg-black/5"
              }`}
              whileHover={{ rotate: 5 }}
              layout
            >
              {icon}
            </motion.div>
            <h2 className="text-xl font-medium">{title}</h2>
          </div>
        </motion.div>

        <motion.div
          className="p-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-sm font-medium text-black/60 mb-4">
            Frame Sequence
          </h3>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {frames.map((frame, index) => (
              <motion.div
                key={index}
                className="aspect-square rounded-lg overflow-hidden border border-[#6b6b6b] p-2"
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <img
                  src={frame || "/placeholder.svg"}
                  alt={`${title} frame ${index + 1}`}
                  className="w-full h-full object-contain p-1"
                />
              </motion.div>
            ))}
          </div>

          <motion.button
            className="mt-6 w-full py-3 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-4 h-4" />
            Play {title}
          </motion.button>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default Games;
