"use client";

import { useState, useEffect } from "react";

export default function HumorSection({ isFirstTime }) {
  const [currentJoke, setCurrentJoke] = useState(0);

  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything! 😄",
    "What do you call a fake noodle? An impasta! 🍝",
    "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
    "What do you call a bear with no teeth? A gummy bear! 🐻",
    "Why don't eggs tell jokes? They'd crack each other up! 🥚",
    "What do you call a fish wearing a bowtie? So-fish-ticated! 🐠",
    "Why did the math book look so sad? Because it had too many problems! 📚",
    "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks! 🦕"
  ];

  useEffect(() => {
    setCurrentJoke(Math.floor(Math.random() * jokes.length));
  }, []);

  const getNewJoke = () => {
    setCurrentJoke(Math.floor(Math.random() * jokes.length));
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">😂</span>
        <h3 className="text-xl font-semibold" style={{color: "var(--feelheal-purple)"}}>
          Daily Humor
        </h3>
      </div>

      {isFirstTime ? (
        <div className="text-center">
          <div className="mb-4">
            <div className="text-4xl mb-2">😄</div>
            <p className="text-gray-600 mb-4">Daily jokes and memes to brighten your day</p>
            <p className="text-sm text-gray-500">
              Laughter is the best medicine for your mental health.
            </p>
          </div>
          <button 
            onClick={getNewJoke}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium hover:from-yellow-600 hover:to-orange-600 transition-all"
          >
            Get a Joke
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-4">
            <div className="text-center">
              <div className="text-2xl mb-2">😄</div>
              <p className="text-gray-700 mb-3">
                {jokes[currentJoke]}
              </p>
              <button 
                onClick={getNewJoke}
                className="text-sm px-3 py-1 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors"
                style={{color: "var(--feelheal-purple)"}}
              >
                Another Joke
              </button>
            </div>
          </div>
          <div className="text-center">
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Save to Favorites
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
