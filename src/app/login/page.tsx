"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function LoginPage() {
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.post("/api/v1/register/login", { teamName, password });
      router.push("/questions");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Authentication failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ef4444' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Navigation */}
      <Link href="/" className="absolute top-6 left-6 z-20">
        <button className="group flex items-center space-x-2 px-4 py-2 bg-black/60 backdrop-blur-sm border border-red-500/30 rounded-lg hover:bg-red-900/30 hover:border-red-400/50 transition-all duration-300">
          <svg
            className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-red-400 group-hover:text-red-300 font-mono font-semibold transition-colors">
            BACK
          </span>
        </button>
      </Link>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 mb-2"
            style={{
              fontFamily: "'Pixeboy', monospace",
              textShadow: "0 0 20px rgba(239, 68, 68, 0.8)",
            }}
          >
            ACCESS
          </h1>
          <p className="text-red-300/80 font-mono text-lg">
            Team authentication required
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-black/60 backdrop-blur-lg border border-red-500/30 rounded-xl p-8 shadow-2xl shadow-red-500/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team Name Field */}
            <div>
              <label className="block text-red-400 font-mono font-semibold mb-2 text-sm uppercase tracking-wider">
                Team Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-red-500/40 rounded-lg text-red-100 font-mono 
                         placeholder-red-400/50 focus:border-red-400/80 focus:outline-none focus:ring-2 focus:ring-red-500/20
                         transition-all duration-300"
                placeholder="Enter team name..."
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-red-400 font-mono font-semibold mb-2 text-sm uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-red-500/40 rounded-lg text-red-100 font-mono 
                         placeholder-red-400/50 focus:border-red-400/80 focus:outline-none focus:ring-2 focus:ring-red-500/20
                         transition-all duration-300"
                placeholder="Enter password..."
                required
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/50 border border-red-500 rounded-lg p-3 text-red-300 text-sm font-mono">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 
                       text-white font-mono font-bold text-lg rounded-lg transition-all duration-300 
                       hover:shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed
                       transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
            >
              {isLoading ? "AUTHENTICATING..." : "ACCESS GRANTED"}
            </button>
          </form>

        </div>
        <div className="text-center mt-8">
          <p className="text-red-500/40 font-mono text-xs">
            © 2025 DECIPHER CTF - Secure Registration Protocol
          </p>
        </div>
      </div>
    </div>
  );
}
