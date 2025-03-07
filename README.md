# Image Match Games

A fast-paced, interactive game platform featuring memory-matching games built with React, TypeScript, and Tailwind CSS.

## 🎮 Overview

Image Match Games is a web application that offers engaging memory-matching games where players must quickly find a target image among a grid of similar images. The platform currently features two games:

- **Space Fun**: A space-themed matching game with cosmic imagery
- **Food Wars**: A food-themed matching game with culinary visuals

## ✨ Features

- **Responsive Design**: Optimized for both desktop and mobile play
- **Dynamic Difficulty**: Game speed increases as your score grows
- **Lives System**: Earn extra lives at score milestones
- **Scoring System**: Earn more points for faster matches
- **Smooth Animations**: Engaging visual feedback using Framer Motion
- **Adaptive Grid**: Grid size adjusts based on screen size (25 images on mobile, 112 on desktop)

## 🛠️ Tech Stack

- **React**: Frontend library for building the user interface
- **TypeScript**: Type-safe JavaScript for better code quality
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: For navigation between different game pages
- **Framer Motion**: For smooth animations and transitions
- **Locomotive Scroll**: For enhanced scrolling experience

## 🎯 How to Play

1. Select a game from the games page
2. Click "Start Game" to begin
3. Find the target image shown at the top among the grid of images below
4. Click on the matching image before time runs out
5. Score points for correct matches (faster matches = more points)
6. Lose a life for incorrect matches or when time runs out
7. Gain an extra life for every 1000 points scored
8. Game gets faster as your score increases:
   - Score > 300: 8 seconds per round
   - Score > 500: 7 seconds per round
   - Score > 1000: 5 seconds per round

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/image-match-games.git

# Navigate to the project directory
cd image-match-games

# Install dependencies
npm install

# Start the development server
npm run dev