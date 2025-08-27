"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const QUESTION_2 = {
  id: 2,
  title: "Caesar's Secret",
  difficulty: 'Easy',
  points: 150,
  flag: "DECIPHER{julius_caesar_cipher}",
  description: "Decode the Caesar cipher to find the flag. Remember, Caesar used a shift of 3!",
  challenge: "GHFLSKHU{mxolxv_fdhvdu_flskhu}"
};

export default function Question2Page() {
  const [flagInput, setFlagInput] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (flagInput.trim() === QUESTION_2.flag) {
      if (!completed) {
        setCompleted(true);
        setMessage(`Correct! You earned ${QUESTION_2.points} points! Redirecting to next question...`);
        setIsSuccess(true);
        
        // Save completion to localStorage
        const completedQuestions = JSON.parse(localStorage.getItem('completedQuestions') || '[]');
        if (!completedQuestions.includes(QUESTION_2.id)) {
          completedQuestions.push(QUESTION_2.id);
          localStorage.setItem('completedQuestions', JSON.stringify(completedQuestions));
          
          // Update total score
          const currentScore = parseInt(localStorage.getItem('totalScore') || '0');
          localStorage.setItem('totalScore', (currentScore + QUESTION_2.points).toString());
          
          // Update unlocked level
          const currentUnlocked = parseInt(localStorage.getItem('unlockedLevel') || '1');
          localStorage.setItem('unlockedLevel', Math.max(currentUnlocked, QUESTION_2.id + 1).toString());
        }
        
        // Dispatch event to notify questions page
        const event = new CustomEvent('questionCompleted', {
          detail: {
            questionId: QUESTION_2.id,
            points: QUESTION_2.points
          }
        });
        window.dispatchEvent(event);
        
        // Auto-navigate to next question after 2 seconds
        setTimeout(() => {
          router.push('/questions/question3');
        }, 2000);
        
      } else {
        setMessage("Already completed! Redirecting to next question...");
        setIsSuccess(true);
        
        // Navigate to next question
        setTimeout(() => {
          router.push('/questions/question3');
        }, 1500);
      }
    } else {
      setMessage("Incorrect flag. Try again!");
      setIsSuccess(false);
    }
    
    if (!isSuccess || flagInput.trim() !== QUESTION_2.flag) {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const showHint = () => {
    alert("💡 HINT: This is a Caesar cipher with a shift of 3. Each letter is shifted 3 positions forward in the alphabet!");
  };

  // Check if already completed on component mount
  React.useEffect(() => {
    const completedQuestions = JSON.parse(localStorage.getItem('completedQuestions') || '[]');
    if (completedQuestions.includes(QUESTION_2.id)) {
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
            <span className="text-orange-300">[</span> QUESTION {QUESTION_2.id} <span className="text-orange-300">]</span>
          </h1>
          <div className="flex gap-4">
            <span className="bg-black/70 backdrop-blur-sm border-2 border-green-400/50 px-4 py-2 rounded font-mono text-green-200">
              {QUESTION_2.difficulty}
            </span>
            <span className="bg-black/70 backdrop-blur-sm border-2 border-yellow-400/50 px-4 py-2 rounded font-mono text-yellow-200">
              {QUESTION_2.points} pts
            </span>
          </div>
        </div>

        {/* Status */}
        {completed && (
          <div className="bg-black/50 backdrop-blur-sm border-2 border-green-400/70 p-6 rounded-lg mb-8 text-center animate-pulse">
            <span className="text-2xl mr-3">✅</span>
            <span className="text-xl font-mono text-green-300">COMPLETED - {QUESTION_2.points} POINTS EARNED</span>
          </div>
        )}

        {/* Question Content */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 font-mono text-white">{QUESTION_2.title}</h2>
          <p className="mb-8 text-lg text-gray-200 font-mono">{QUESTION_2.description}</p>
          
          {/* Challenge */}
          <div className="bg-black/60 border-2 border-yellow-400/50 rounded-lg p-6 mb-6">
            <h3 className="text-yellow-300 mb-4 text-xl font-mono flex items-center">
              <span className="mr-3 text-2xl">🏛️</span>
              CAESAR'S CIPHER:
            </h3>
            <div 
              className="font-mono text-green-400 text-lg break-all cursor-pointer select-all bg-black/60 p-4 rounded border-2 border-green-400/30 hover:border-green-300/60 transition-all"
              onClick={() => {
                navigator.clipboard.writeText(QUESTION_2.challenge);
                alert('📋 Copied to clipboard!');
              }}
              title="Click to copy"
            >
              {QUESTION_2.challenge}
            </div>
            <p className="text-gray-400 text-sm mt-3 font-mono">💡 Click the cipher above to copy it to your clipboard</p>
          </div>
          
          <div className="bg-purple-900/50 border-2 border-purple-400/50 rounded-lg p-6 mb-6">
            <h4 className="text-purple-300 mb-3 text-lg font-mono">CIPHER INFO:</h4>
            <div className="text-purple-200 font-mono space-y-2">
              <p>• Caesar cipher shifts each letter by a fixed number</p>
              <p>• Julius Caesar used a shift of 3 positions</p>
              <p>• A → D, B → E, C → F, etc.</p>
              <p>• To decode: shift back 3 positions</p>
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
            SUBMIT YOUR FLAG:
          </label>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="DECIPHER{...}"
                className="flex-1 bg-black/70 border-2 border-green-400/50 rounded-lg px-6 py-4 text-white font-mono text-lg focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400/30 transition-all"
              />
              <button
                type="submit"
                className="bg-black/70 backdrop-blur-sm border-2 border-green-400/50 hover:border-green-300 px-8 py-4 rounded-lg hover:bg-green-900/40 font-mono text-green-200 transition-all group"
              >
                <span className="mr-2">🚀</span>
                <span className="group-hover:animate-pulse">SUBMIT FLAG</span>
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
            <span className="mr-3">💡</span>
            <span className="group-hover:animate-pulse">GET HINT</span>
          </button>
          <button 
            onClick={() => router.push('/questions/question1')}
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
              onClick={() => router.push('/questions/question3')}
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