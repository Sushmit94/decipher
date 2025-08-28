"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const QUESTION_12 = {
  id: 12,
  title: "Anonymous Cheating",
  flag: "DECIPHER{0x_tr4ns4ct12n_tr4c1ng_r3v34ls_4ll}",
  description: "A cheater just bought a flag to one of the problems to the CTF through a blockchain smart contract setup by the black market seller on the Sepolia testnet. He used his personal wallet to send 0.05 ETH to his alt wallet for buying the flag. Can you find the proof of him cheating? 🕵️‍♂️ Trace the transaction flow and discover what really happened on the blockchain. The truth is always recorded on-chain!",
  cheaterWallet: "0xaa8A4A0df322aB0a1B5D623450ee1d426aC43C2F",
  blockExplorer: "https://sepolia.etherscan.io/"
};

function Question12Page() {
  const [flagInput, setFlagInput] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const router = useRouter();

  // Function to fetch total points
  const fetchTotalPoints = async () => {
    try {
      const response = await api.get('/api/v1/register/get-points');
      
      console.log("API Response status:", response.status);
      console.log("API Response data:", response.data);

      // Handle both response formats
      if (response.data.success && typeof response.data.data?.points === 'number') {
        return response.data.data.points;
      } else if (typeof response.data.points === 'number') {
        // Handle direct points response format
        return response.data.points;
      }

      throw new Error('Invalid response format');
    } catch (error:any) {
      console.error('Error fetching points:', error);
      
      // Check if it's an authentication error
      if (error.response?.status === 401) {
        // Redirect to login if not authenticated
        router.push('/login');
        return 0;
      }
      
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Failed to fetch points';
      setError(errorMessage);
      return 0;
    }
  };

  // Check if question is already completed based on points
  const checkQuestionCompletion = async () => {
    setIsLoading(true);
    try {
      const points = await fetchTotalPoints();
      setTotalPoints(points);
      
      // Question 12 requires completing questions 1-9 first
      // If points >= 12, then question 12 is already solved
      if (points >= 12) {
        setCompleted(true);
        setIsSuccess(true);
      } else if (points < 9) {
        // User hasn't completed previous questions, redirect them
        setError("You must complete Questions 1-9 first!");
        setTimeout(() => {
          router.push('/questions');
        }, 2000);
      } else {
        setCompleted(false);
      }
    } catch (error) {
      console.error('Error checking question completion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check completion status on component mount
  useEffect(() => {
    checkQuestionCompletion();
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    if (flagInput.trim() === QUESTION_12.flag) {
      setIsSubmitting(true);
      try {
        const response = await api.post("/api/v1/register/add-points", {});
        // Check if response is successful
        if (response.data.success) {
          setCompleted(true);
          setTotalPoints(response.data.data.points);
          setMessage(`Correct! You earned ${response.data.data.pointsAdded} point(s)! Total: ${response.data.data.points}. Well done, blockchain detective! 🕵️‍♂️`);
          setIsSuccess(true);
          
          // Dispatch event to notify questions page
          const event = new CustomEvent('questionCompleted', {
            detail: {
              questionId: QUESTION_12.id,
              points: response.data.data.pointsAdded,
              totalPoints: response.data.data.points
            }
          });
          window.dispatchEvent(event);
          
          // Auto-navigate to next question after 4 seconds
          setTimeout(() => {
            router.push('/questions');
          }, 4000);
          
        } else {
          throw new Error(response.data.message || "Failed to add points");
        }
        
      } catch (error:any) {
        console.error("Error adding points:", error);
        
        // Check if it's an authentication error
        if (error.response?.status === 401) {
          setMessage("Authentication failed. Please log in again.");
          setIsSuccess(false);
        } else {
          const errorMessage = error.response?.data?.message || 
                             error.message || 
                             "Failed to submit answer. Please try again.";
          setMessage(errorMessage);
          setIsSuccess(false);
        }
        
        // Clear error message after 5 seconds
        setTimeout(() => setMessage(""), 5000);
        
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setMessage("Incorrect flag. Keep investigating the blockchain! 🔍");
      setIsSuccess(false);
      
      // Clear message after 3 seconds for incorrect answers
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const showHint = () => {
    alert("💡 HINT: Start by searching the cheater's wallet address on Sepolia Etherscan. Look for outgoing transactions of exactly 0.05 ETH. Then follow the trail to see what happened next! The blockchain never lies. 🔗");
  };

  const openBlockExplorer = () => {
    window.open(`${QUESTION_12.blockExplorer}address/${QUESTION_12.cheaterWallet}`, '_blank');
  };

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(QUESTION_12.cheaterWallet);
    alert('📋 Wallet address copied to clipboard!');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div 
          className="fixed inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/y.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -2
          }}
        ></div>
        <div className="fixed inset-0 bg-black/70" style={{ zIndex: -1 }}></div>
        <div className="relative z-10 text-white p-8">
          <div className="max-w-4xl mx-auto flex items-center justify-center min-h-screen">
            <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
              <p className="text-xl font-mono text-green-200">Loading blockchain investigation...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/y.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -2
        }}
      ></div>
      
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/70" style={{ zIndex: -1 }}></div>
      
      {/* Content */}
      <div className="relative z-12 text-white p-8">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => router.push('/questions')}
            className="bg-black/70 backdrop-blur-sm border-2 border-green-400/50 hover:border-green-300 px-6 py-3 rounded hover:bg-green-900/30 font-mono text-green-200 transition-all group"
          >
            <span className="mr-2">&lt;&lt;</span>
            <span className="group-hover:animate-pulse">BACK TO QUESTIONS</span>
          </button>
          <h1 className="text-4xl font-bold font-mono text-orange-400">
            <span className="text-orange-300">[</span> QUESTION {QUESTION_12.id} <span className="text-orange-300">]</span>
          </h1>
          <div className="flex gap-4">
            <span className="bg-black/70 backdrop-blur-sm border-2 border-cyan-400/50 px-4 py-2 rounded font-mono text-cyan-200">
              Total: {totalPoints} pts
            </span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-black/50 backdrop-blur-sm border-2 border-red-400/70 p-6 rounded-lg mb-8 text-center">
            <span className="text-2xl mr-3">❌</span>
            <span className="text-xl font-mono text-red-300">ERROR: {error}</span>
          </div>
        )}

        {/* Status */}
        {completed && (
          <div className="bg-black/50 backdrop-blur-sm border-2 border-green-400/70 p-6 rounded-lg mb-8 text-center animate-pulse">
            <span className="text-2xl mr-3">✅</span>
            <span className="text-xl font-mono text-green-300">Investigation Complete! Cheater caught red-handed! 🕵️‍♂️</span>
          </div>
        )}

        {/* Question Content */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 font-mono text-white flex items-center">
            <span className="mr-4 text-4xl">🕵️‍♂️</span>
            {QUESTION_12.title}
          </h2>
          <p className="mb-8 text-lg text-gray-200 font-mono leading-relaxed">{QUESTION_12.description}</p>
          
          {/* Investigation Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Cheater Wallet */}
            <div className="bg-black/60 border-2 border-red-400/50 rounded-lg p-6">
              <h3 className="text-red-300 mb-4 text-xl font-mono flex items-center">
                <span className="mr-3 text-2xl">👤</span>
                SUSPECT WALLET:
              </h3>
              <div 
                className="font-mono text-red-400 text-lg break-all cursor-pointer select-all bg-black/60 p-4 rounded border-2 border-red-400/30 hover:border-red-300/60 transition-all"
                onClick={copyWalletAddress}
                title="Click to copy wallet address"
              >
                {QUESTION_12.cheaterWallet}
              </div>
              <p className="text-gray-400 text-sm mt-3 font-mono">💡 Click to copy address</p>
            </div>

            {/* Block Explorer */}
            <div className="bg-black/60 border-2 border-blue-400/50 rounded-lg p-6">
              <h3 className="text-blue-300 mb-4 text-xl font-mono flex items-center">
                <span className="mr-3 text-2xl">🔗</span>
                BLOCK EXPLORER:
              </h3>
              <div 
                className="font-mono text-blue-400 text-lg break-all cursor-pointer select-all bg-black/60 p-4 rounded border-2 border-blue-400/30 hover:border-blue-300/60 transition-all"
                onClick={() => {
                  navigator.clipboard.writeText(QUESTION_12.blockExplorer);
                  alert('📋 Explorer URL copied to clipboard!');
                }}
                title="Click to copy URL"
              >
                {QUESTION_12.blockExplorer}
              </div>
              <p className="text-gray-400 text-sm mt-3 font-mono">💡 Sepolia Testnet Explorer</p>
            </div>
          </div>

          {/* Investigation Clues */}
          <div className="bg-black/60 border-2 border-yellow-400/50 rounded-lg p-6 mb-6">
            <h3 className="text-yellow-300 mb-4 text-xl font-mono flex items-center">
              <span className="mr-3 text-2xl">🔍</span>
              INVESTIGATION CLUES:
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-yellow-200 font-mono">
                <span className="mr-3">•</span>
                <span>Transaction Amount: <strong className="text-yellow-400">0.05 ETH</strong></span>
              </div>
              <div className="flex items-center text-yellow-200 font-mono">
                <span className="mr-3">•</span>
                <span>Network: <strong className="text-yellow-400">Sepolia Testnet</strong></span>
              </div>
              <div className="flex items-center text-yellow-200 font-mono">
                <span className="mr-3">•</span>
                <span>Purpose: <strong className="text-yellow-400">Flag Purchase from Black Market</strong></span>
              </div>
              <div className="flex items-center text-yellow-200 font-mono">
                <span className="mr-3">•</span>
                <span>Method: <strong className="text-yellow-400">Smart Contract Interaction</strong></span>
              </div>
            </div>
          </div>
          
          {/* Interactive Investigation Button */}
          <div className="text-center mb-6">
            <button
              onClick={openBlockExplorer}
              className="bg-black/70 backdrop-blur-sm border-2 border-purple-400/50 hover:border-purple-300 px-8 py-4 rounded-lg hover:bg-purple-900/40 font-mono text-purple-200 transition-all group text-xl"
            >
              <span className="mr-3 text-2xl">🔍</span>
              <span className="group-hover:animate-pulse">START BLOCKCHAIN INVESTIGATION</span>
            </button>
          </div>
        </div>

        {/* Flag Submission */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 mb-8">
          <label className="block text-white font-mono text-xl mb-4 flex items-center">
            <span className="mr-3 text-2xl">🚩</span>
            SUBMIT PROOF OF CHEATING:
          </label>
          
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="DECIPHER{proof_of_cheating_here}"
                disabled={isSubmitting || completed}
                className="flex-1 bg-black/70 border-2 border-green-400/50 rounded-lg px-6 py-4 text-white font-mono text-lg focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400/30 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting || completed}
                className="bg-black/70 backdrop-blur-sm border-2 border-green-400/50 hover:border-green-300 px-8 py-4 rounded-lg hover:bg-green-900/40 font-mono text-green-200 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="mr-2">🚀</span>
                <span className="group-hover:animate-pulse">
                  {isSubmitting ? 'ANALYZING...' : completed ? 'CASE CLOSED' : 'SUBMIT EVIDENCE'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-6 rounded-lg text-center mb-8 backdrop-blur-sm border-2 transition-all duration-300 font-mono text-lg ${
            isSuccess ? 'bg-black/50 border-green-400/70 text-green-200' : 'bg-black/50 border-red-400/70 text-red-200'
          }`}>
            <div className="font-bold">{message}</div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-6">
          <button 
            onClick={showHint}
            className="bg-black/70 backdrop-blur-sm border-2 border-yellow-400/50 hover:border-yellow-300 px-6 py-4 rounded-lg hover:bg-yellow-900/40 font-mono text-yellow-200 transition-all group"
          >
            <span className="mr-3">💡</span>
            <span className="group-hover:animate-pulse">INVESTIGATION HINT</span>
          </button>
          
          {completed && (
            <button 
              onClick={() => router.push('/questions')}
              className="bg-black/70 backdrop-blur-sm border-2 border-cyan-400/50 hover:border-cyan-300 px-6 py-4 rounded-lg hover:bg-cyan-900/40 font-mono text-cyan-200 transition-all group animate-pulse"
            >
              <span className="mr-3">🏠</span>
              <span className="group-hover:animate-pulse">BACK TO HQ</span>
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Question12Page;