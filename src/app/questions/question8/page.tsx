"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const QUESTION_8 = {
  id: 8,
  title: "Hidden Frequencies",
  difficulty: 'Expert',
  points: 600,
  flag: "DECIPHER{sp3ctr0}",
  description: "Not everything you hear is what it seems. Sometimes, you need to look beyond the sound waves. Audio files can hide secrets in their frequency spectrum, waveforms, or even in the silence between notes. Use audio analysis tools to uncover what's hidden in the digital sound.",
  challenge: "audio1.wav"
};

export default function Question8Page() {
  const [flagInput, setFlagInput] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (flagInput.trim() === QUESTION_8.flag) {
      if (!completed) {
        setIsSubmitting(true);
        try {
          const response = await api.post("/api/v1/register/add-points", {});
          // Check if response is successful
          if (response.data.success) {
            setCompleted(true);
            setMessage(`Outstanding audio analysis! You earned ${response.data.data.pointsAdded} point(s)! Total: ${response.data.data.points}. You've mastered the art of audio forensics!`);
            setIsSuccess(true);
            
            // Dispatch event to notify questions page
            const event = new CustomEvent('questionCompleted', {
              detail: {
                questionId: QUESTION_8.id,
                points: response.data.data.pointsAdded,
                totalPoints: response.data.data.points
              }
            });
            window.dispatchEvent(event);
            
            // Auto-navigate to next question after 3 seconds
            setTimeout(() => {
              router.push('/questions/question9');
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
        setMessage("Already completed! You are truly an audio forensics expert! Redirecting to next question...");
        setIsSuccess(true);
        
        // Navigate to next question
        setTimeout(() => {
          router.push('/questions/question9');
        }, 1500);
      }
    } else {
      setMessage("Incorrect flag. The frequencies still hold their secrets!");
      setIsSuccess(false);
      
      // Clear message after 3 seconds for incorrect answers
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const showHint = () => {
    alert("💡 HINT: Audio forensics techniques to try:\n• Use Audacity to view waveform and spectrogram\n• Analyze frequency spectrum for hidden patterns\n• Check for LSB (Least Significant Bit) steganography\n• Look for hidden data in silence or noise\n• Try tools like SonicVisualiser, Spek, or online spectrum analyzers\n• Examine metadata and file headers\n• Listen for morse code, DTMF tones, or binary audio\n• Check both time domain and frequency domain!");
  };

  const downloadAudio = () => {
    // Create a temporary link to download the audio
    const link = document.createElement('a');
    link.href = '/audio1.wav';
    link.download = 'suspicious_audio.wav';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePlayback = () => {
    const audio = document.getElementById('challengeAudio');
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  // Check if already completed on component mount
  React.useEffect(() => {
    const completedQuestions = JSON.parse(localStorage.getItem('completedQuestions') || '[]');
    if (completedQuestions.includes(QUESTION_8.id)) {
      setCompleted(true);
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/y.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -2
        }}
      ></div>
      
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/70" style={{ zIndex: -1 }}></div>
      
      {/* Content */}
      <div className="relative z-10 text-white p-8">
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
            <span className="text-orange-300">[</span> QUESTION {QUESTION_8.id} <span className="text-orange-300">]</span>
          </h1>
          <div className="flex gap-4">
            <span className="bg-black/70 backdrop-blur-sm border-2 border-red-400/50 px-4 py-2 rounded font-mono text-red-200">
              {QUESTION_8.difficulty}
            </span>
            <span className="bg-black/70 backdrop-blur-sm border-2 border-yellow-400/50 px-4 py-2 rounded font-mono text-yellow-200">
              {QUESTION_8.points} pts
            </span>
          </div>
        </div>

        {/* Status */}
        {completed && (
          <div className="bg-black/50 backdrop-blur-sm border-2 border-green-400/70 p-6 rounded-lg mb-8 text-center animate-pulse">
            <span className="text-2xl mr-3">🎵</span>
            <span className="text-xl font-mono text-green-300">AUDIO FORENSICS EXPERT - {QUESTION_8.points} POINTS EARNED</span>
          </div>
        )}

        {/* Question Content */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 font-mono text-white">{QUESTION_8.title}</h2>
          <p className="mb-8 text-lg text-gray-200 font-mono">{QUESTION_8.description}</p>
          
          {/* Audio Challenge */}
          <div className="bg-black/60 border-2 border-purple-400/50 rounded-lg p-6 mb-6">
            <h3 className="text-purple-300 mb-4 text-xl font-mono flex items-center">
              <span className="mr-3 text-2xl">🎧</span>
              SUSPICIOUS AUDIO FILE:
            </h3>
            <div className="bg-black/40 border-2 border-purple-400/30 rounded-lg p-6 hover:border-purple-300/60 transition-all">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎵</div>
                <div className="font-mono text-lg text-purple-300 mb-2">ENCRYPTED AUDIO TRANSMISSION</div>
                <div className="font-mono text-sm text-gray-300 bg-black/60 p-3 rounded border border-purple-400/20">
                  suspicious_audio.wav
                </div>
                <div className="font-mono text-xs text-gray-400 mt-3">
                  🔊 Audio contains hidden data - analyze carefully
                </div>
              </div>

              {/* Audio Player */}
              <div className="bg-black/60 border-2 border-purple-400/30 rounded-lg p-4 mb-4">
                <audio 
                  id="challengeAudio"
                  src="/audio1.wav"
                  onEnded={() => setIsPlaying(false)}
                  className="w-full"
                  controls
                >
                  Your browser does not support the audio element.
                </audio>
              </div>

              {/* Audio Controls */}
              <div className="flex justify-center gap-4 mb-4">
                <button 
                  onClick={togglePlayback}
                  className={`bg-black/70 backdrop-blur-sm border-2 px-6 py-3 rounded-lg font-mono transition-all group ${
                    isPlaying 
                      ? 'border-red-400/50 hover:border-red-300 text-red-200 hover:bg-red-900/40' 
                      : 'border-green-400/50 hover:border-green-300 text-green-200 hover:bg-green-900/40'
                  }`}
                >
                  <span className="mr-3">{isPlaying ? '⏸️' : '▶️'}</span>
                  <span className="group-hover:animate-pulse">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>
                <button 
                  onClick={downloadAudio}
                  className="bg-black/70 backdrop-blur-sm border-2 border-purple-400/50 hover:border-purple-300 px-6 py-3 rounded-lg hover:bg-purple-900/40 font-mono text-purple-200 transition-all group"
                >
                  <span className="mr-3">⬇️</span>
                  <span className="group-hover:animate-pulse">DOWNLOAD</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-900/50 border-2 border-yellow-400/50 rounded-lg p-6">
            <p className="text-yellow-200 text-lg font-mono">
              <span className="text-yellow-300 font-bold">FLAG FORMAT:</span> DECIPHER{'{flag_text}'}
            </p>
          </div>
        </div>

        {/* Flag Submission */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 mb-8">
          <label className="block text-white font-mono text-xl mb-4 flex items-center">
            <span className="mr-3 text-2xl">🚩</span>
            SUBMIT DISCOVERED FREQUENCY:
          </label>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="DECIPHER{hidden_in_spectrum}"
                disabled={isSubmitting}
                className="flex-1 bg-black/70 border-2 border-green-400/50 rounded-lg px-6 py-4 text-white font-mono text-lg focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400/30 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black/70 backdrop-blur-sm border-2 border-green-400/50 hover:border-green-300 px-8 py-4 rounded-lg hover:bg-green-900/40 font-mono text-green-200 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="mr-2">🔊</span>
                <span className="group-hover:animate-pulse">
                  {isSubmitting ? 'SUBMITTING...' : 'DECODE SIGNAL'}
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
            className="bg-black/70 backdrop-blur-sm border-2 border-purple-400/50 hover:border-purple-300 px-6 py-4 rounded-lg hover:bg-purple-900/40 font-mono text-purple-200 transition-all group"
          >
            <span className="mr-3">🔍</span>
            <span className="group-hover:animate-pulse">ANALYSIS GUIDE</span>
          </button>
          <button 
            onClick={() => router.push('/questions/question7')}
            className="bg-black/70 backdrop-blur-sm border-2 border-blue-400/50 hover:border-blue-300 px-6 py-4 rounded-lg hover:bg-blue-900/40 font-mono text-blue-200 transition-all group"
          >
            <span className="mr-3">⬅️</span>
            <span className="group-hover:animate-pulse">PREV QUESTION</span>
          </button>
          <button 
            onClick={() => router.push('/questions')}
            className="bg-black/70 backdrop-blur-sm border-2 border-orange-400/50 hover:border-orange-300 px-6 py-4 rounded-lg hover:bg-orange-900/40 font-mono text-orange-200 transition-all group"
          >
            <span className="mr-3">📋</span>
            <span className="group-hover:animate-pulse">ALL QUESTIONS</span>
          </button>
          {completed && (
            <button 
              onClick={() => router.push('/questions/question9')}
              className="bg-black/70 backdrop-blur-sm border-2 border-cyan-400/50 hover:border-cyan-300 px-6 py-4 rounded-lg hover:bg-cyan-900/40 font-mono text-cyan-200 transition-all group animate-pulse"
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