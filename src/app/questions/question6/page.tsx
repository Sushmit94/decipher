"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const QUESTION_6 = {
  id: 6,
  title: "Hidden in Plain Sight",
  difficulty: 'Expert',
  points: 400,
  flag: "DECIPHER{St3g_1s_Th3_b35t}",
  description: "Just staring at this image won't reveal anything. So, start thinking on how we can embed data in an image?? The flag like always is hidden somewhere in this image. Search for it and if you get it. I'll say you've already begun your journey as a hacker!",
  challenge: "image2.jpeg"
};

export default function Question6Page() {
  const [flagInput, setFlagInput] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (flagInput.trim() === QUESTION_6.flag) {
      if (!completed) {
        setCompleted(true);
        setMessage(`Correct! You earned ${QUESTION_6.points} points! You've already begun your journey as a hacker!`);
        setIsSuccess(true);
        
        // Save completion to localStorage
        const completedQuestions = JSON.parse(localStorage.getItem('completedQuestions') || '[]');
        if (!completedQuestions.includes(QUESTION_6.id)) {
          completedQuestions.push(QUESTION_6.id);
          localStorage.setItem('completedQuestions', JSON.stringify(completedQuestions));
          
          // Update total score
          const currentScore = parseInt(localStorage.getItem('totalScore') || '0');
          localStorage.setItem('totalScore', (currentScore + QUESTION_6.points).toString());
          
          // Update unlocked level
          const currentUnlocked = parseInt(localStorage.getItem('unlockedLevel') || '1');
          localStorage.setItem('unlockedLevel', Math.max(currentUnlocked, QUESTION_6.id + 1).toString());
        }
        
        // Dispatch event to notify questions page
        const event = new CustomEvent('questionCompleted', {
          detail: {
            questionId: QUESTION_6.id,
            points: QUESTION_6.points
          }
        });
        window.dispatchEvent(event);
        
      } else {
        setMessage("Already completed! You are truly a steganography master!");
        setIsSuccess(true);
      }
    } else {
      setMessage("Incorrect flag. The secret is still hidden!");
      setIsSuccess(false);
    }
    
    if (!isSuccess || flagInput.trim() !== QUESTION_6.flag) {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const showHint = () => {
    alert("💡 HINT: Try using steganography tools like steghide, binwalk, or online steg analyzers. The data might be hidden in the LSB (Least Significant Bits) or using other steganographic techniques!");
  };

  const downloadImage = () => {
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = '/image2.jpeg';
    link.download = 'steganography_challenge.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Check if already completed on component mount
  React.useEffect(() => {
    const completedQuestions = JSON.parse(localStorage.getItem('completedQuestions') || '[]');
    if (completedQuestions.includes(QUESTION_6.id)) {
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
            <span className="text-orange-300">[</span> QUESTION {QUESTION_6.id} <span className="text-orange-300">]</span>
          </h1>
          <div className="flex gap-4">
            <span className="bg-black/70 backdrop-blur-sm border-2 border-red-400/50 px-4 py-2 rounded font-mono text-red-200">
              {QUESTION_6.difficulty}
            </span>
            <span className="bg-black/70 backdrop-blur-sm border-2 border-yellow-400/50 px-4 py-2 rounded font-mono text-yellow-200">
              {QUESTION_6.points} pts
            </span>
          </div>
        </div>

        {/* Status */}
        {completed && (
          <div className="bg-black/50 backdrop-blur-sm border-2 border-green-400/70 p-6 rounded-lg mb-8 text-center animate-pulse">
            <span className="text-2xl mr-3">🎯</span>
            <span className="text-xl font-mono text-green-300">STEGANOGRAPHY MASTER - {QUESTION_6.points} POINTS EARNED</span>
          </div>
        )}

        {/* Question Content */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 font-mono text-white">{QUESTION_6.title}</h2>
          <p className="mb-8 text-lg text-gray-200 font-mono">{QUESTION_6.description}</p>
          
          {/* Challenge Image */}
          <div className="bg-black/60 border-2 border-purple-400/50 rounded-lg p-6 mb-6">
            <h3 className="text-purple-300 mb-4 text-xl font-mono flex items-center">
              <span className="mr-3 text-2xl">🖼️</span>
              SUSPICIOUS IMAGE:
            </h3>
            <div className="flex justify-center">
              <div className="bg-black/60 border-2 border-purple-400/30 rounded-lg p-4 hover:border-purple-300/60 transition-all">
                <img 
                  src="/image2.jpeg" 
                  alt="Steganography Challenge" 
                  className="max-w-full max-h-96 rounded border-2 border-purple-400/40 shadow-lg hover:shadow-purple-400/30 transition-all cursor-pointer"
                  onClick={() => window.open('/image2.jpeg', '_blank')}
                />
                <div className="text-center mt-4">
                  <div className="font-mono text-lg text-purple-300">steganography_challenge.jpeg</div>
                  <div className="font-mono text-sm text-purple-400 mt-2">[Click to view full size]</div>
                  <div className="font-mono text-xs text-gray-400 mt-3">
                    Contains hidden data using steganographic techniques
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4 font-mono text-center">
              💡 Download this image and analyze it with steganography tools
            </p>
            
            {/* Download button */}
            <div className="flex justify-center mt-4">
              <button 
                className="bg-black/70 backdrop-blur-sm border-2 border-purple-400/50 hover:border-purple-300 px-6 py-3 rounded-lg hover:bg-purple-900/40 font-mono text-purple-200 transition-all group"
                onClick={downloadImage}
              >
                <span className="mr-3">⬇️</span>
                <span className="group-hover:animate-pulse">DOWNLOAD IMAGE</span>
              </button>
            </div>
          </div>
          
          {/* Steganography Info */}
       
        </div>

        {/* Flag Submission */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 mb-8">
          <label className="block text-white font-mono text-xl mb-4 flex items-center">
            <span className="mr-3 text-2xl">🚩</span>
            SUBMIT YOUR FLAG:
          </label>
          <div>
            <div className="flex gap-4">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="DECIPHER{hidden_flag_here}"
                className="flex-1 bg-black/70 border-2 border-green-400/50 rounded-lg px-6 py-4 text-white font-mono text-lg focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400/30 transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
              <button
                onClick={handleSubmit}
                className="bg-black/70 backdrop-blur-sm border-2 border-green-400/50 hover:border-green-300 px-8 py-4 rounded-lg hover:bg-green-900/40 font-mono text-green-200 transition-all group"
              >
                <span className="mr-2">🔓</span>
                <span className="group-hover:animate-pulse">REVEAL SECRET</span>
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
            <span className="mr-3">🔍</span>
            <span className="group-hover:animate-pulse">ANALYSIS HINT</span>
          </button>
          <button 
            onClick={() => router.push('/questions/question5')}
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
              onClick={() => router.push('/questions/question7')}
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