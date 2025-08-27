'use client';

import React from 'react';
import Image from 'next/image';

const LeaderboardPage = () => {
  // Synthetic data for teams
  const teams = [
    { rank: 1, name: "Code Warriors", score: 2850 },
    { rank: 2, name: "Debug Masters", score: 2720 },
    { rank: 3, name: "Cyber Phantoms", score: 2650 },
    { rank: 4, name: "Binary Breakers", score: 2480 },
    { rank: 5, name: "Hash Hunters", score: 2350 },
    { rank: 6, name: "Script Slayers", score: 2200 },
    { rank: 7, name: "Logic Legends", score: 2100 },
    { rank: 8, name: "Pixel Pirates", score: 1950 },
    { rank: 9, name: "Data Dragons", score: 1800 },
    { rank: 10, name: "Tech Titans", score: 1650 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/image1.jpeg"
          alt="Pixel Art Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* CTF Logo/Brand (top left) */}
    

        {/* Main Leaderboard Container */}
        <div className="w-full max-w-4xl">
          {/* Title */}
          <div className="text-center mb-8">
            <h1
              className="text-6xl font-bold text-red-600 mb-2 tracking-wider drop-shadow-lg"
              style={{
                fontFamily: "monospace",
                textShadow:
                  "2px 2px 0px #fff, -1px -1px 0px #000, 1px -1px 0px #000",
              }}
            >
              LEADERBOARD
            </h1>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-transparent rounded-lg p-6 backdrop-blur-sm border-2 border-red-400/70 shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 mb-4 pb-3 border-b-2 border-red-400/70">
              <div className="text-center">
                <span className="text-red-200 font-bold text-xl">RANK</span>
              </div>
              <div className="text-center">
                <span className="text-red-200 font-bold text-xl">TEAM</span>
              </div>
              <div className="text-center">
                <span className="text-red-200 font-bold text-xl">SCORE</span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
              {teams.map((team, index) => (
                <div
                  key={team.rank}
                  className={`grid grid-cols-3 gap-4 py-3 px-2 rounded-md transition-all duration-200 hover:bg-red-100/30 ${
                    index < 3
                      ? "bg-yellow-200/30 border border-yellow-400/60"
                      : "bg-white/20"
                  }`}
                >
                  <div className="text-center">
                    <span
                      className={`font-bold text-lg ${
                        team.rank === 1
                          ? "text-yellow-400"
                          : team.rank === 2
                          ? "text-gray-300"
                          : team.rank === 3
                          ? "text-orange-400"
                          : "text-red-100"
                      }`}
                    >
                      {team.rank}.
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="font-semibold text-red-100 text-lg">
                      {team.name}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-red-100 text-lg">
                      {team.score.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom decoration - small flags */}
          <div className="flex justify-between items-end mt-8">
            <div className="text-red-500 text-2xl">🚩</div>
            <div className="text-red-500 text-2xl">🚩</div>
          </div>
        </div>

        {/* Footer text */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <p className="text-white/80 text-sm font-medium">
            Sign up to compete, edit, inspect and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
