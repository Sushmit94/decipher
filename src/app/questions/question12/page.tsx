"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const QUESTION_12 = {
  id: 12,
  title: "Medical Mystery",
  flag: "DECIPHER{David_Morgan_Jones}", // Replace with actual doctor name
  description: "I was thinking of getting my loose Apronectomy. My friend said that they had a recommendation for a doctor specializing in that, but only sent me this photo of this building. Who's the doctor? Before submitting, wrap the doctor's name in DECIPHER{name_of_doctor}. Special characters allowed.",
  example: "For example, if the name of the doctor was Jean Pierre Brehier, the flag would be DECIPHER{Jean_Pierre_Brehier}.",
  challenge: "new.png" // Replace with actual image filename
};

export default function Question12Page() {
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
    } catch (error: any) {
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
      
      // Question 12 requires completing previous questions first
      // Adjust this number based on your point system
      if (points >= 12) {
        setCompleted(true);
        setIsSuccess(true);
      } else if (points < 11) {
        // User hasn't completed previous questions, redirect them
        setError("You must complete Questions 1-11 first!");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (flagInput.trim() === QUESTION_12.flag) {
      setIsSubmitting(true);
      try {
        const response = await api.post("/api/v1/register/add-points", {});
        // Check if response is successful
        if (response.data.success) {
          setCompleted(true);
          setTotalPoints(response.data.data.points);
          setMessage(`Correct! You found the doctor! You earned ${response.data.data.pointsAdded} point(s)! Total: ${response.data.data.points}. Redirecting...`);
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
          
          // Auto-navigate to next question after 3 seconds (if question13 exists)
          setTimeout(() => {
            router.push('/questions');
          }, 3000);
          
        } else {
          throw new Error(response.data.message || "Failed to add points");
        }
        
      } catch (error: any) {
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
      setMessage("Incorrect doctor name. Check the building more carefully!");
      setIsSuccess(false);
      
      // Clear message after 3 seconds for incorrect answers
      setTimeout(() => setMessage(""), 3000);
    }
  };


  const downloadImage = () => {
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = `/${QUESTION_12.challenge}`;
    link.download = 'medical_building.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <p className="text-xl font-poppins text-green-200">Loading question status...</p>
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
      <div className="fixed inset-0 bg-black/50" style={{ zIndex: -1 }}></div>
      
      {/* Content */}
      <div className="relative z-10 text-white p-8">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
<div className="flex items-center mb-8">
  <div className="flex-1">
    <button 
      onClick={() => router.push('/questions')}
      className="bg-black/70 backdrop-blur-sm border-2 border-green-400/50 hover:border-green-300 px-3 py-1.5 rounded hover:bg-green-900/30 font-poppins text-green-200 text-sm transition-all group"
    >
      <span className="mr-1">&lt;&lt;</span>
      <span className="group-hover:animate-pulse">BACK</span>
    </button>
  </div>
  
  <div className="flex-1">
    <h1 className="text-4xl font-bold font-poppins text-orange-400 text-center">
      <span className="text-orange-300">[</span> QUESTION {QUESTION_12.id} <span className="text-orange-300">]</span>
    </h1>
  </div>
  
  <div className="flex-1 flex justify-end">
    <div className="bg-black/70 backdrop-blur-sm border-2 border-cyan-400/50 px-4 py-2 rounded font-poppins text-cyan-200">
      Total: {totalPoints} pts
    </div>
  </div>
</div>

        {/* Error Display */}
        {error && (
          <div className="bg-black/50 backdrop-blur-sm border-2 border-red-400/70 p-6 rounded-lg mb-8 text-center">
            <span className="text-2xl mr-3">❌</span>
            <span className="text-xl font-poppins text-red-300">ERROR: {error}</span>
          </div>
        )}

      
        {/* Question Content */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-8 mb-8 relative">
        {completed && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-2 bg-green-900/70 border border-green-500 px-4 py-1 rounded-full text-green-200 font-semibold shadow-sm">
            <span className="text-lg">✅</span>
            <span>COMPLETED</span>
          </div>
        )}

          <h2 className="text-3xl font-bold mb-6 font-poppins text-white">{QUESTION_12.title}</h2>
          <p className="mb-4 text-lg text-gray-200 font-poppins">{QUESTION_12.description}</p>
          <p className="mb-8 text-md text-gray-300 font-poppins italic">{QUESTION_12.example}</p>
          
          {/* Challenge */}
          <div className="bg-black/60 border-2 border-green-400/50 rounded-lg p-6 mb-6">
            <h3 className="text-green-300 mb-4 text-xl font-poppins flex items-center">
              <span className="mr-3 text-2xl">🏥</span>
              BUILDING PHOTOGRAPH:
            </h3>
            
            {/* Image Display */}
            <div className="bg-black/60 p-6 rounded border-2 border-green-400/30 text-center">
              <div className="flex justify-center">
                <div className="bg-black/60 border-2 border-green-400/30 rounded-lg p-4 hover:border-green-300/60 transition-all">
                  <img 
                    src={`/${QUESTION_12.challenge}`} 
                    alt="Medical Building" 
                    className="max-w-full max-h-96 rounded border-2 border-green-400/40 shadow-lg hover:shadow-green-400/30 transition-all cursor-pointer"
                    onClick={() => window.open(`/${QUESTION_12.challenge}`, '_blank')}
                  />
                  <div className="text-center mt-4">
                    <div className="font-poppins text-lg text-green-300">medical_building.jpg</div>
                    <div className="font-poppins text-sm text-green-400 mt-2">[Click to view full size]</div>
                    <div className="font-poppins text-xs text-gray-400 mt-3">
                      Examine carefully for doctor information
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mt-3 font-poppins text-center">💡 Download the image for closer examination if needed</p>
            
            {/* Download button */}
            <div className="flex justify-center mt-4">
              <button 
                className="bg-black/70 backdrop-blur-sm border-2 border-green-400/50 hover:border-green-300 px-6 py-3 rounded-lg hover:bg-green-900/40 font-poppins text-green-200 transition-all group"
                onClick={downloadImage}
              >
                <span className="mr-3">⬇️</span>
                <span className="group-hover:animate-pulse">DOWNLOAD IMAGE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Flag Submission */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 mb-8">
          <label className="block text-white font-poppins text-xl mb-4 flex items-center">
            <span className="mr-3 text-2xl">🚩</span>
            SUBMIT DOCTOR'S NAME:
          </label>
          
          
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="DECIPHER{Doctor_Name_Here}"
                disabled={isSubmitting || completed}
                className="flex-1 bg-black/70 border-2 border-green-400/50 rounded-lg px-6 py-4 text-white font-poppins text-lg focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400/30 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting || completed}
                className="bg-black/70 backdrop-blur-sm border-2 border-green-400/50 hover:border-green-300 px-8 py-4 rounded-lg hover:bg-green-900/40 font-poppins text-green-200 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="mr-2">🚀</span>
                <span className="group-hover:animate-pulse">
                  {isSubmitting ? 'SUBMITTING...' : completed ? 'COMPLETED' : 'SUBMIT FLAG'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-6 rounded-lg text-center mb-8 backdrop-blur-sm border-2 transition-all duration-300 font-poppins text-lg ${
            isSuccess ? 'bg-black/50 border-green-400/70 text-green-200' : 'bg-black/50 border-red-400/70 text-red-200'
          }`}>
            <div className="font-bold">{message}</div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-6">
          
          {completed && (
            <button 
              onClick={() => router.push('/questions/question13')}
              className="bg-black/70 backdrop-blur-sm border-2 border-cyan-400/50 hover:border-cyan-300 px-6 py-4 rounded-lg hover:bg-cyan-900/40 font-poppins text-cyan-200 transition-all group animate-pulse"
            >
              <span className="mr-3">➡️</span>
              <span className="group-hover:animate-pulse">NEXT QUESTION</span>
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}