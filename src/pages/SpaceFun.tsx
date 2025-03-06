"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Timer, Award, RefreshCw, Heart } from "lucide-react";
import spaceFun from "../assets/space-fun/json";

const SpaceFun = () => {
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [gameImages, setGameImages] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [gameRound, setGameRound] = useState(0);
  const [previousScoreBracket, setPreviousScoreBracket] = useState(0);

  // Determine starting time based on score
  const getStartingTime = useCallback((currentScore: number) => {
    if (currentScore > 1000) return 5;
    if (currentScore > 500) return 7;
    if (currentScore > 300) return 8;
    return 10;
  }, []);

  // Shuffle and prepare game images
  const prepareGameRound = useCallback(() => {
    // Shuffle the spaceFun array
    const shuffled = [...spaceFun].sort(() => Math.random() - 0.5);
  
    // Determine the number of images based on screen width
    const isSmallScreen = window.innerWidth < 768; // Adjust breakpoint as needed
    const imageCount = isSmallScreen ? 25 : 112; // 25 for small screens, 112 for larger screens
  
    // Prepare the image set
    let gameImageSet: string[] = [];
  
    if (shuffled.length < imageCount) {
      gameImageSet = [...shuffled];
  
      while (gameImageSet.length < imageCount) {
        const randomIndex = Math.floor(Math.random() * shuffled.length);
        gameImageSet.push(shuffled[randomIndex]);
      }
    } else {
      gameImageSet = shuffled.slice(0, imageCount);
    }
  
    // Shuffle again for randomness
    gameImageSet = gameImageSet.sort(() => Math.random() - 0.5);
  
    // Select a random target image
    const targetIndex = Math.floor(Math.random() * gameImageSet.length);
    const target = gameImageSet[targetIndex];
  
    setTargetImage(target);
    setGameImages(gameImageSet);
  
    // Set time based on current score
    setTimeLeft(getStartingTime(score));
  
    setGameRound((prev) => prev + 1);
  }, [score, getStartingTime]);
  

  // Start game
  const startGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setPreviousScoreBracket(0);
    setGameActive(true);
    setGameRound(0);
    prepareGameRound();
  }, [prepareGameRound]);

  // Check if player should get an extra life
  useEffect(() => {
    // Calculate which 200-point bracket the player is in
    const currentScoreBracket = Math.floor(score / 1000);

    // If they've moved up to a new bracket, give them a life
    if (currentScoreBracket > previousScoreBracket) {
      setLives((prev) => prev + 1);
      setPreviousScoreBracket(currentScoreBracket);
    }
  }, [score, previousScoreBracket]);

  // Handle image selection
  const handleImageSelect = (selectedImage: string) => {
    if (!gameActive) return;

    if (selectedImage === targetImage) {
      // Correct selection
      const pointsGained = Math.ceil(timeLeft * 10);
      setScore((prev) => prev + pointsGained); // More points for faster selection
    } else {
      // Wrong selection
      setLives((prev) => prev - 1); // Lose a life

      // Check if game over
      if (lives <= 1) {
        setGameActive(false);
        return;
      } else {
        console.log("Wrong selection, -50 points");
      }

      setScore((prev) => Math.max(0, prev - 50)); // Lose 50 points, but not below 0
    }

    // Short delay before next round
    setTimeout(() => {
      prepareGameRound();
    }, 1000);
  };

  useEffect(() => {
    if (lives <= 0) {
      setGameActive(false);
    }
  }, [lives]);

  // Timer effect
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up
          setLives((prev) => prev - 1); // Lose a life
          setScore((prev) => Math.max(0, prev - 30)); // Lose 30 points for timeout
          // Prepare next round after a short delay
          if(lives > 1) {
            setTimeout(() => {
              prepareGameRound();
            }, 1000);
          }

          // Reset timer based on current score
          return getStartingTime(score);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, prepareGameRound, score, getStartingTime]);

  return (
    <div className="min-h-screen bg-white text-black p-4 max-w-[97vw] mx-auto">
      {/* Game Controls */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
            <Award className="w-5 h-5" />
            <span className="font-bold">{score}</span>
          </div>

          <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg">
            <Heart className="w-5 h-5" />
            <span className="font-bold">{lives}</span>
          </div>
        </div>

        {gameActive ? (
          <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-lg">
            <Timer className="w-5 h-5" />
            <span className="font-bold">{timeLeft}s</span>
          </div>
        ) : (
          <motion.button
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
          >
            <RefreshCw className="w-5 h-5" />
            {gameRound > 0 ? "Play Again" : "Start Game"}
          </motion.button>
        )}
      </div>

      {/* Game Instructions */}
      {!gameActive && (
        <motion.div
          className="text-center mb-8 bg-black/5 p-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-bold mb-2">How to Play</h2>
          <p>
            Find the matching image from the grid below before time runs out!
          </p>
          <p className="text-sm mt-2 text-black/70">
            Score more points by finding matches quickly.
          </p>
          <p className="text-sm mt-2 text-black/70">
            Get an extra life every 200 points. Game gets faster as your score
            increases!
          </p>
        </motion.div>
      )}

      {/* Game Grid using Flex with Fixed Target Image */}
      <div className="lg:relative">
        {/* Fixed Target Image */}
        {gameActive && (
          <div className="lg:fixed lg:top-2 lg:left-[50vw] lg:-translate-x-1/2 lg:z-10">
            <p className="mb-2 font-medium">Find this image:</p>
            <div className="relative w-20 h-20 lg:w-[100px] lg:h-[100px] p-2.5 border-2 border-black rounded-lg overflow-hidden bg-black/5">
              {targetImage && (
                <motion.img
                  src={targetImage}
                  alt="Target image to find"
                  className="w-full h-full object-contain"
                  key={`target-${gameRound}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </div>
        )}

        {/* Game Images Grid */}
        <div className="flex flex-wrap gap-2 mt-4">
          {gameImages.map((image, index) => (
            <motion.div
              key={`${image}-${index}-${gameRound}`}
              className="w-14 lg:w-[74px] h-14 lg:h-[74px] bg-white border border-[#7a7a7a] rounded-md overflow-hidden cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleImageSelect(image)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Game image ${index}`}
                className="w-full h-full p-2 object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpaceFun;
