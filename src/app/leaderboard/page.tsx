'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import api from "@/lib/axios";

interface Team {
  teamName: string;
  points: number;
}

interface LeaderboardData {
  statusCode: number;
  data: Team[];
}

const LeaderboardPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        setError("");
        
        const response = await api.get<LeaderboardData>("/api/v1/leader/admin");
        
        if (response.data.statusCode === 200) {
          // Sort teams by points in descending order
          const sortedTeams = response.data.data.sort((a, b) => b.points - a.points);
          setTeams(sortedTeams);
        } else {
          setError("Failed to fetch leaderboard data");
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Failed to load leaderboard. Please try again.";
        setError(errorMessage);
        console.error("Error fetching leaderboard:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div 
          className="fixed inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/images/leaderboard.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -2
          }}
        ></div>
        
        {/* Enhanced Loading */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mb-4"></div>
            <p className="text-white text-lg font-semibold animate-pulse">Loading Leaderboard...</p>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <p className="text-white/80 text-sm font-medium">
            Leaderboard
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-red-400 font-mono text-2xl mb-4">ERROR</h2>
          <p className="text-red-300 font-mono mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-mono rounded-lg transition-colors"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/leaderboard.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -2
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Main Leaderboard Container */}
        <div className="w-full max-w-4xl">
          {/* Enhanced Title */}
          <div className="text-center mb-8">
            <h1
              className="text-6xl font-bold text-red-600 mb-2 tracking-wider drop-shadow-lg transform hover:scale-105 transition-transform duration-300"
              style={{
                fontFamily: "monospace",
                textShadow:
                  "2px 2px 0px #fff, -1px -1px 0px #000, 1px -1px 0px #000, 0 0 20px rgba(220, 38, 38, 0.5)",
              }}
            >
              LEADERBOARD
            </h1>
          </div>

          {/* Enhanced Leaderboard Table */}
          <div className="bg-transparent rounded-lg p-6 backdrop-blur-sm border-2 border-red-400/70 shadow-2xl hover:border-red-400/90 transition-all duration-300">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 mb-4 pb-3 border-b-2 border-red-400/70">
              <div className="text-center">
                <span className="text-red-200 font-bold text-xl drop-shadow-md">RANK</span>
              </div>
              <div className="text-center col-span-2">
                <span className="text-red-200 font-bold text-xl drop-shadow-md">TEAM</span>
              </div>
              <div className="text-center">
                <span className="text-red-200 font-bold text-xl drop-shadow-md">SCORE</span>
              </div>
            </div>

            {/* Enhanced Table Rows */}
            <div className="space-y-3">
              {teams.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3 animate-bounce">🏆</div>
                  <p className="text-red-300 font-mono text-lg">No teams registered yet</p>
                </div>
              ) : (
                teams.map((team, index) => {
                  const rank = index + 1;
                  const isTopThree = rank <= 3;
                  
                  return (
                    <div
                      key={`${team.teamName}-${index}`}
                      className={`group grid grid-cols-4 gap-4 py-4 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                        isTopThree
                          ? "bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 border-2 border-yellow-400/70 shadow-md hover:shadow-yellow-400/20 hover:bg-gradient-to-r hover:from-yellow-900/60 hover:to-yellow-800/60"
                          : "bg-red-950/40 border border-red-400/50 hover:bg-red-950/60 hover:border-red-400/70"
                      }`}
                    >
                      {/* Enhanced Rank */}
                      <div className="text-center flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          {getRankIcon(rank) && (
                            <span className="text-xl animate-pulse">{getRankIcon(rank)}</span>
                          )}
                          <span
                            className={`font-black text-xl drop-shadow-md ${
                              rank === 1
                                ? "text-yellow-500"
                                : rank === 2
                                ? "text-gray-400"
                                : rank === 3
                                ? "text-orange-500"
                                : "text-red-100"
                            }`}
                          >
                            {rank}.
                          </span>
                        </div>
                      </div>
                      
                      {/* Enhanced Team Name */}
                      <div className="col-span-2 text-center flex items-center justify-center">
                        <span className={`font-bold text-lg drop-shadow-sm transition-colors duration-300 ${
                          isTopThree ? "text-red-50 group-hover:text-white" : "text-red-100 group-hover:text-red-50"
                        }`}>
                          {team.teamName}
                        </span>
                      </div>
                      
                      {/* Enhanced Score */}
                      <div className="text-center flex items-center justify-center">
                        <span className={`font-bold text-lg drop-shadow-sm transition-colors duration-300 ${
                          isTopThree ? "text-red-50 group-hover:text-white" : "text-red-100 group-hover:text-red-50"
                        }`}>
                          {team.points.toLocaleString()}
                        </span>
                      </div>

                      {/* Subtle hover glow effect */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 bg-gradient-to-r from-red-400 to-yellow-400 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Enhanced bottom decoration */}
          <div className="flex justify-between items-end mt-8">
            <div className="text-red-500 text-2xl transform hover:scale-125 transition-transform duration-300 cursor-pointer">🚩</div>
            <div className="text-center">
              <div className="text-red-300/60 font-mono text-xs">
                Last Updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="text-red-500 text-2xl transform hover:scale-125 transition-transform duration-300 cursor-pointer">🚩</div>
          </div>
        </div>

        {/* Enhanced Refresh Button */}
        <button
          onClick={() => window.location.reload()}
          className="absolute top-6 right-6 group px-6 py-3 bg-black/60 backdrop-blur-sm border border-red-500/40 rounded-lg hover:bg-red-900/40 hover:border-red-400/70 transition-all duration-300 text-red-400 hover:text-red-300 font-mono font-semibold shadow-lg transform hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <span className="group-hover:animate-spin transition-transform duration-300">🔄</span>
            <span>REFRESH</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LeaderboardPage;