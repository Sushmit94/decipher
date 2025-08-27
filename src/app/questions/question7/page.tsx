"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const QUESTION_7 = {
  id: 7,
  title: "Digital Detective Work",
  difficulty: 'Expert',
  points: 500,
  flag: "DECIPHER{Dh0N1_1s_Th3_B3st}",
  description: "Welcome to the world of OSINT (Open Source Intelligence)! Your mission is to gather information from publicly available sources. Investigate the given website thoroughly - examine the source code, check for hidden elements, analyze metadata, and use your detective skills to uncover the hidden flag. Remember, in OSINT, the devil is in the details!",
  challenge: "https://mathurninaad.github.io/PookieDhoni/"
};

export default function Question7Page() {
  const [flagInput, setFlagInput] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (flagInput.trim() === QUESTION_7.flag) {
      if (!completed) {
        setCompleted(true);
        setMessage(`Excellent detective work! You earned ${QUESTION_7.points} points! You've mastered the art of OSINT!`);
        setIsSuccess(true);
        
        // Save completion to localStorage
        const completedQuestions = JSON.parse(localStorage.getItem('completedQuestions') || '[]');
        if (!completedQuestions.includes(QUESTION_7.id)) {
          completedQuestions.push(QUESTION_7.id);
          localStorage.setItem('completedQuestions', JSON.stringify(completedQuestions));
          
          // Update total score
          const currentScore = parseInt(localStorage.getItem('totalScore') || '0');
          localStorage.setItem('totalScore', (currentScore + QUESTION_7.points).toString());
          
          // Update unlocked level
          const currentUnlocked = parseInt(localStorage.getItem('unlockedLevel') || '1');
          localStorage.setItem('unlockedLevel', Math.max(currentUnlocked, QUESTION_7.id + 1).toString());
        }
        
        // Dispatch event to notify questions page
        const event = new CustomEvent('questionCompleted', {
          detail: {
            questionId: QUESTION_7.id,
            points: QUESTION_7.points
          }
        });
        window.dispatchEvent(event);
        
      } else {
        setMessage("Already completed! You are truly an OSINT master!");
        setIsSuccess(true);
      }
    } else {
      setMessage("Incorrect flag. Keep investigating - the truth is out there!");
      setIsSuccess(false);
    }
    
    if (!isSuccess || flagInput.trim() !== QUESTION_7.flag) {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const showHint = () => {
    alert("💡 HINT: OSINT is about thorough investigation! Try:\n• View page source (Ctrl+U)\n• Check developer tools (F12)\n• Look for hidden HTML comments\n• Examine JavaScript files\n• Check for hidden divs or elements\n• Analyze metadata and headers\n• Search for encoded content\n• Don't forget to check all linked resources!");
  };

  const openTarget = () => {
    window.open(QUESTION_7.challenge, '_blank');
  };

  // Check if already completed on component mount
  React.useEffect(() => {
    const completedQuestions = JSON.parse(localStorage.getItem('completedQuestions') || '[]');
    if (completedQuestions.includes(QUESTION_7.id)) {
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
            <span className="text-orange-300">[</span> QUESTION {QUESTION_7.id} <span className="text-orange-300">]</span>
          </h1>
          <div className="flex gap-4">
            <span className="bg-black/70 backdrop-blur-sm border-2 border-red-400/50 px-4 py-2 rounded font-mono text-red-200">
              {QUESTION_7.difficulty}
            </span>
            <span className="bg-black/70 backdrop-blur-sm border-2 border-yellow-400/50 px-4 py-2 rounded font-mono text-yellow-200">
              {QUESTION_7.points} pts
            </span>
          </div>
        </div>

        {/* Status */}
        {completed && (
          <div className="bg-black/50 backdrop-blur-sm border-2 border-green-400/70 p-6 rounded-lg mb-8 text-center animate-pulse">
            <span className="text-2xl mr-3">🕵️</span>
            <span className="text-xl font-mono text-green-300">OSINT MASTER - {QUESTION_7.points} POINTS EARNED</span>
          </div>
        )}

        {/* Question Content */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 font-mono text-white">{QUESTION_7.title}</h2>
          <p className="mb-8 text-lg text-gray-200 font-mono">{QUESTION_7.description}</p>
          
          {/* Target Website */}
          <div className="bg-black/60 border-2 border-blue-400/50 rounded-lg p-6 mb-6">
            <h3 className="text-blue-300 mb-4 text-xl font-mono flex items-center">
              <span className="mr-3 text-2xl">🎯</span>
              TARGET WEBSITE:
            </h3>
            <div className="bg-black/40 border-2 border-blue-400/30 rounded-lg p-6 hover:border-blue-300/60 transition-all">
              <div className="text-center">
                <div className="text-6xl mb-4">🌐</div>
                <div className="font-mono text-lg text-blue-300 mb-2">INVESTIGATION TARGET</div>
                <div className="font-mono text-sm text-gray-300 break-all bg-black/60 p-3 rounded border border-blue-400/20">
                  {QUESTION_7.challenge}
                </div>
                <div className="font-mono text-xs text-gray-400 mt-3">
                  🔍 Analyze this website thoroughly to find the hidden flag
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6 gap-4">
              <button 
                className="bg-black/70 backdrop-blur-sm border-2 border-blue-400/50 hover:border-blue-300 px-6 py-3 rounded-lg hover:bg-blue-900/40 font-mono text-blue-200 transition-all group"
                onClick={openTarget}
              >
                <span className="mr-3">🔍</span>
                <span className="group-hover:animate-pulse">INVESTIGATE SITE</span>
              </button>
              <button 
                className="bg-black/70 backdrop-blur-sm border-2 border-cyan-400/50 hover:border-cyan-300 px-6 py-3 rounded-lg hover:bg-cyan-900/40 font-mono text-cyan-200 transition-all group"
                onClick={() => navigator.clipboard.writeText(QUESTION_7.challenge)}
              >
                <span className="mr-3">📋</span>
                <span className="group-hover:animate-pulse">COPY URL</span>
              </button>
            </div>
          </div>
          
          
          </div>

          {/* Investigation Checklist */}
          

        {/* Flag Submission */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 mb-8">
          <label className="block text-white font-mono text-xl mb-4 flex items-center">
            <span className="mr-3 text-2xl">🚩</span>
            SUBMIT YOUR FINDINGS:
          </label>
          <div>
            <div className="flex gap-4">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="DECIPHER{your_discovered_flag}"
                className="flex-1 bg-black/70 border-2 border-green-400/50 rounded-lg px-6 py-4 text-white font-mono text-lg focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400/30 transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
              <button
                onClick={handleSubmit}
                className="bg-black/70 backdrop-blur-sm border-2 border-green-400/50 hover:border-green-300 px-8 py-4 rounded-lg hover:bg-green-900/40 font-mono text-green-200 transition-all group"
              >
                <span className="mr-2">🔍</span>
                <span className="group-hover:animate-pulse">CASE CLOSED</span>
              </button>
            </div>
          </div>
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
            <span className="mr-3">💡</span>
            <span className="group-hover:animate-pulse">INVESTIGATION TIPS</span>
          </button>
          <button 
            onClick={() => router.push('/questions/question6')}
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
              onClick={() => router.push('/questions/question8')}
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