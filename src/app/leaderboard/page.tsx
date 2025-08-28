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
              {teams.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-red-300 font-mono text-lg">No teams registered yet</p>
                </div>
              ) : (
                teams.map((team, index) => {
                  const rank = index + 1;
                  return (
                    <div
                      key={`${team.teamName}-${index}`}
                      className={`grid grid-cols-3 gap-4 py-3 px-2 rounded-md transition-all duration-200 hover:bg-red-100/30 ${
                        index < 3
                          ? "bg-yellow-200/30 border border-yellow-400/60"
                          : "bg-white/20"
                      }`}
                    >
                      <div className="text-center">
                        <span
                          className={`font-bold text-lg ${
                            rank === 1
                              ? "text-yellow-400"
                              : rank === 2
                              ? "text-gray-300"
                              : rank === 3
                              ? "text-orange-400"
                              : "text-red-100"
                          }`}
                        >
                          {rank}.
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="font-semibold text-red-100 text-lg">
                          {team.teamName}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="font-bold text-red-100 text-lg">
                          {team.points.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Bottom decoration - small flags */}
          <div className="flex justify-between items-end mt-8">
            <div className="text-red-500 text-2xl">🚩</div>
            <div className="text-red-500 text-2xl">🚩</div>
          </div>
        </div>
        {/* Refresh Button */}
        <button
          onClick={() => window.location.reload()}
          className="absolute top-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-sm border border-red-500/30 rounded-lg hover:bg-red-900/30 hover:border-red-400/50 transition-all duration-300 text-red-400 hover:text-red-300 font-mono font-semibold"
        >
          REFRESH
        </button>
      </div>
    </div>
  );
};

export default LeaderboardPage;