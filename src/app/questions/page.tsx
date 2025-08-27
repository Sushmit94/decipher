"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Simple question data directly in component
const QUESTIONS = [
  {
    id: 1,
    title: "Welcome to CTF",
    difficulty: 'Easy',
    points: 100,
    flag: "DECIPHER{welcome_to_ctf}",
    description: "A simple Base64 decoding challenge to get you started."
  },
  {
    id: 2,
    title: "Caesar's Secret",
    difficulty: 'Easy',
    points: 150,
    flag: "DECIPHER{julius_caesar_cipher}",
    description: "Decode the Caesar cipher to find the flag."
  },
  {
    id: 3,
    title: "Hidden in Plain Sight",
    difficulty: 'Medium',
    points: 200,
    flag: "DECIPHER{steganography_rocks}",
    description: "Look deeper into the image to find the hidden message."
  },
  {
    id: 4,
    title: "Web Inspector",
    difficulty: 'Medium',
    points: 250,
    flag: "DECIPHER{inspect_element_pro}",
    description: "Use browser developer tools to find the flag."
  },
  {
    id: 5,
    title: "Binary Secrets",
    difficulty: 'Hard',
    points: 300,
    flag: "DECIPHER{binary_is_life}",
    description: "Convert the binary message to text."
  },
  {
    id: 6,
    title: "SQL Injection",
    difficulty: 'Hard',
    points: 400,
    flag: "DECIPHER{sql_injection_master}",
    description: "Find the SQL injection vulnerability."
  },
  {
    id:7,
    title:"Steganography",
    difficulty: 'Hard',
    points: 400,
    flag: "DECIPHER{sql_injection_master}",
    description: "Find the SQL injection vulnerability."
  },
  {
    id:8,
    title:"Steganography",
    difficulty: 'Hard',
    points: 400,
    flag: "DECIPHER{sql_injection_master}",
    description: "Find the SQL injection vulnerability."
  },
  {
    id:9,
    title:"steg",
    difficulty:"hard",
    points:400,
    flag: "DECIPHER{sql_injection_master}",
    description: "Find the SQL injection vulnerability."
  }
];

export default function QuestionsPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);

  const router = useRouter();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCompleted = JSON.parse(localStorage.getItem('completedQuestions') || '[]');
    const savedScore = parseInt(localStorage.getItem('totalScore') || '0');
    const savedUnlocked = parseInt(localStorage.getItem('unlockedLevel') || '1');
    
    setCompletedQuestions(savedCompleted);
    setTotalScore(savedScore);
    setUnlockedLevel(savedUnlocked);
  }, []);

  // Listen for question completion events
  useEffect(() => {
    const handleQuestionCompleted = (event: CustomEvent) => {
      const { questionId, points } = event.detail;
      
      setCompletedQuestions(prev => {
        if (!prev.includes(questionId)) {
          const newCompleted = [...prev, questionId];
          localStorage.setItem('completedQuestions', JSON.stringify(newCompleted));
          return newCompleted;
        }
        return prev;
      });
      
      setTotalScore(prev => {
        const newScore = prev + points;
        localStorage.setItem('totalScore', newScore.toString());
        return newScore;
      });
      
      setUnlockedLevel(prev => {
        const newUnlocked = Math.max(prev, questionId + 1);
        localStorage.setItem('unlockedLevel', newUnlocked.toString());
        return newUnlocked;
      });
    };

    window.addEventListener('questionCompleted', handleQuestionCompleted as EventListener);
    return () => window.removeEventListener('questionCompleted', handleQuestionCompleted as EventListener);
  }, []);

  const handleQuestionClick = (questionId: number) => {
    if (questionId <= unlockedLevel) {
      router.push(`/questions/question${questionId}`);
    }
  };

  const handleReset = () => {
    if (confirm('Reset all progress?')) {
      setCompletedQuestions([]);
      setUnlockedLevel(1);
      setTotalScore(0);
      
      // Clear localStorage
      localStorage.removeItem('completedQuestions');
      localStorage.removeItem('totalScore');
      localStorage.removeItem('unlockedLevel');
    }
  };

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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold font-mono text-orange-400 mb-6">
              <span className="text-orange-300">[</span> DECIPHER CTF <span className="text-orange-300">]</span>
            </h1>
            <div className="flex justify-center items-center gap-6 mb-4">
              
              <span className="bg-black/70 backdrop-blur-sm border-2 border-green-400/50 px-6 py-3 rounded font-mono text-green-200">
                <span className="mr-2">🏆</span>Score: {totalScore}
              </span>
             
            </div>
          </div>

          {/* Progress */}
          <div className="text-center mb-8">
            <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 inline-block">
              <p className="text-2xl font-mono text-white">
                <span className="text-yellow-300">Progress:</span> {completedQuestions.length} / {QUESTIONS.length} completed
              </p>
            </div>
          </div>

          {/* Questions Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {QUESTIONS.map((question) => {
              const completed = completedQuestions.includes(question.id);
              const unlocked = question.id <= unlockedLevel;
              
              return (
                <div
                  key={question.id}
                  onClick={() => handleQuestionClick(question.id)}
                  className={`bg-black/50 backdrop-blur-sm border-2 rounded-lg p-6 transition-all duration-300 ${
                    completed ? 
                      'border-green-400/70 hover:border-green-300 hover:bg-green-900/30 cursor-pointer' :
                    unlocked ? 
                      'border-blue-400/70 hover:border-blue-300 hover:bg-blue-900/30 cursor-pointer' :
                      'border-gray-400/30 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold font-mono border-2 ${
                      completed ? 
                        'bg-green-900/50 border-green-400/70 text-green-200' : 
                      unlocked ? 
                        'bg-blue-900/50 border-blue-400/70 text-blue-200' : 
                        'bg-gray-900/50 border-gray-400/50 text-gray-400'
                    }`}>
                      {completed ? '✓' : question.id}
                    </div>
                    <span className={`px-3 py-1 rounded font-mono text-sm border-2 ${
                      question.difficulty === 'Easy' ? 
                        'bg-green-900/50 border-green-400/50 text-green-200' :
                      question.difficulty === 'Medium' ? 
                        'bg-yellow-900/50 border-yellow-400/50 text-yellow-200' : 
                        'bg-red-900/50 border-red-400/50 text-red-200'
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 font-mono text-white">{question.title}</h3>
                  <p className="text-sm text-gray-300 mb-6 font-mono leading-relaxed">{question.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-mono flex items-center ${
                      completed ? 'text-green-300' : unlocked ? 'text-blue-300' : 'text-gray-400'
                    }`}>
                      <span className="mr-2">
                        {completed ? '✅' : unlocked ? '🔓' : '🔒'}
                      </span>
                      {completed ? 'COMPLETED' : unlocked ? 'AVAILABLE' : 'LOCKED'}
                    </span>
                    <span className="bg-black/70 backdrop-blur-sm border-2 border-yellow-400/50 px-4 py-2 rounded font-mono text-yellow-200">
                      {question.points} pts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}