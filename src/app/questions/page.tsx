"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

interface PointsPayload {
  points?: number;
  [key: string]: unknown;
}

// Simple question data directly in component
const QUESTIONS = [
  {
    id: 1,
    title: "Welcome to CTF",
    difficulty: 'Easy',
    points: 1,
    flag: "DECIPHER{W3lc0m3_n3wb135}",
    description: "A simple Base64 decoding challenge to get you started."
  },
  {
    id: 2,
    title: "Ancient Script",
    difficulty: 'Easy',
    points: 1,
    flag: "DECIPHER{Khaleesi}",
    description: "Decode the secret language."
  },
  {
    id: 3,
    title: "Hidden in Plain Sight",
    difficulty: 'Medium',
    points: 1,
    flag: "DECIPHER{3x1ft00l_w0rks}",
    description: "Look deeper into the image to find the hidden message."
  },
  {
    id: 4,
    title: "Mr. ROBOT",
    difficulty: 'Medium',
    points: 1,
    flag: "DECIPHER{y0u_f0und_th3_r0bot5}",
    description: "Where are the Mr. Robots hiding?"
  },
  {
    id: 5,
    title: "Secrets",
    difficulty: 'Hard',
    points: 1,
    flag: "DECIPHER{Pavlou}",
    description: "Convert the binary message to text."
  },
  {
    id: 6,
    title: "Image Analysis",
    difficulty: 'Hard',
    points: 1,
    flag: "DECIPHER{D3c1ph3r_1s_Th3_B3st_3v3nt_s0_f4r}",
    description: "Find the hidden message within the image."
  },
  {
    id: 7,
    title: "Thala for a reason",
    difficulty: 'Hard',
    points: 1,
    flag: "DECIPHER{Dh0N1_1s_Th3_B3st}",
    description: "Isn't 7 the best number????"
  },
  {
    id: 8,
    title: "Spectre",
    difficulty: 'Hard',
    points: 1,
    flag: "DECIPHER{sp3ctr0}",
    description: "Uncover the hidden layers of the audio."
  },
  {
    id: 9,
    title: "Final Challenge",
    difficulty: "Hard",
    points: 1,
    flag: "DECIPHER{URL_p4r4m3t3r_m4n1pul4t10n_1s_fun}",
    description: "The ultimate challenge awaits the worthy."
  },
  {
    id: 10,
    title: "Anonymous Cheating",
    difficulty: "Hard",
    points: 1,
    flag: "DECIPHER{ch3a1er_c4ught}",
    description: "Find the cheater!!!"
  },
  {
    id: 11,
    title: "Double Trouble",
    difficulty: "Hard",
    points: 1,
    flag: "DECIPHER{dualboot}",
    description: "This time we use two different encoding methods."
  },
  {
    id: 12,
    title: "Medical Mystery",
    difficulty: "Hard",
    points: 1,
    flag: "DECIPHER{David_Morgan_Jones}",
    description: "Help me find the doctor!"
  },
  

];

export default function QuestionsPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [serverPoints, setServerPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Function to fetch points from API using axios
  const fetchPointsFromAPI = async (): Promise<number> => {
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

  // Calculate completed questions based on server points
  const calculateProgressFromPoints = (points: number) => {
    // If points = 0, no questions solved, unlock question 1
    // If points = 4, 4 questions solved, unlock question 5
    const completedCount = points;
    const completedQuestionIds = Array.from({ length: completedCount }, (_, i) => i + 1);
    const nextUnlockedLevel = Math.min(completedCount + 1, QUESTIONS.length + 1);
    
    return {
      completedQuestionIds,
      unlockedLevel: nextUnlockedLevel,
      totalScore: points
    };
  };

  // Load data on component mount
  useEffect(() => {
    const initializeFromServer = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get points from server API
        const apiPoints = await fetchPointsFromAPI();
        setServerPoints(apiPoints);
        
        // Calculate progress based on server points
        const progress = calculateProgressFromPoints(apiPoints);
        
        setCompletedQuestions(progress.completedQuestionIds);
        setTotalScore(progress.totalScore);
        setUnlockedLevel(progress.unlockedLevel);
        
        console.log('Initialized from server:', {
          serverPoints: apiPoints,
          completed: progress.completedQuestionIds,
          unlocked: progress.unlockedLevel
        });
        
      } catch (error: any) {
        console.error('Error initializing from server:', error);
        const errorMessage = error.response?.data?.message || 
                           error.message || 
                           'Failed to load data from server';
        setError(errorMessage);
        
        // Fallback to default state
        setServerPoints(0);
        setCompletedQuestions([]);
        setTotalScore(0);
        setUnlockedLevel(1);
      } finally {
        setIsLoading(false);
      }
    };

    initializeFromServer();
  }, [router]);

  // Listen for question completion events (for real-time updates)
  useEffect(() => {
    const handleQuestionCompleted = async (event: Event) => {
  const customEvent = event as CustomEvent<{ questionId: number; points: number }>;
  const { questionId, points } = customEvent.detail;
      
      console.log('Question completed event:', { questionId, points });
      
      // Refresh from server after completion
      try {
        const apiPoints = await fetchPointsFromAPI();
        const progress = calculateProgressFromPoints(apiPoints);
        
        setServerPoints(apiPoints);
        setCompletedQuestions(progress.completedQuestionIds);
        setTotalScore(progress.totalScore);
        setUnlockedLevel(progress.unlockedLevel);
        
        console.log('Updated after question completion:', {
          questionId,
          newServerPoints: apiPoints,
          newCompleted: progress.completedQuestionIds
        });
      } catch (error: any) {
        console.error('Error updating after question completion:', error);
        const errorMessage = error.response?.data?.message || 
                           error.message || 
                           'Failed to update after question completion';
        setError(errorMessage);
      }
    };

    window.addEventListener('questionCompleted', handleQuestionCompleted as EventListener);
    return () => window.removeEventListener('questionCompleted', handleQuestionCompleted as EventListener);
  }, []);

  const handleQuestionClick = (questionId: number) => {
    if (questionId <= unlockedLevel) {
      router.push(`/questions/question${questionId}`);
    }
  };

  const handleRefreshFromServer = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Refresh data from server API
      const apiPoints = await fetchPointsFromAPI();
      const progress = calculateProgressFromPoints(apiPoints);
      
      setServerPoints(apiPoints);
      setCompletedQuestions(progress.completedQuestionIds);
      setTotalScore(progress.totalScore);
      setUnlockedLevel(progress.unlockedLevel);
      
      console.log('Manually refreshed from server:', {
        serverPoints: apiPoints,
        completed: progress.completedQuestionIds,
        unlocked: progress.unlockedLevel
      });
    } catch (error: any) {
      console.error('Error refreshing from server:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Failed to refresh data';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl font-poppins">Loading...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-red-400 text-xl font-poppins mb-4">Error: {error}</div>
          <button 
            onClick={handleRefreshFromServer}
            className="bg-blue-600 hover:bg-blue-700 text-white font-poppins px-6 py-2 rounded"
          >
            Retry
          </button>
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold font-poppins text-orange-400 mb-6">
              <span className="text-orange-300">[</span> DECIPHER <span className="text-orange-300">]</span>
            </h1>
            <div className="flex justify-center items-center gap-6 mb-4">
              <span className="bg-black/70 backdrop-blur-sm border-2 border-green-400/50 px-6 py-3 rounded font-poppins text-green-200">
                <span className="mr-1">Total Points: {serverPoints}</span>
              </span>
              
            </div>
            {error && (
              <div className="bg-red-900/50 border-2 border-red-400/50 rounded-lg p-3 max-w-md mx-auto">
                <p className="text-red-200 font-poppins text-sm">⚠️ {error}</p>
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="text-center mb-8">
            <div className="bg-black/50 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 inline-block">
              <p className="text-2xl font-poppins text-white">
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
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold font-poppins border-2 ${
                      completed ? 
                        'bg-green-900/50 border-green-400/70 text-green-200' : 
                      unlocked ? 
                        'bg-blue-900/50 border-blue-400/70 text-blue-200' : 
                        'bg-gray-900/50 border-gray-400/50 text-gray-400'
                    }`}>
                      {completed ? '✓' : question.id}
                    </div>
                    <span className={`px-3 py-1 rounded font-poppins text-sm border-2 ${
                      question.difficulty === 'Easy' ? 
                        'bg-green-900/50 border-green-400/50 text-green-200' :
                      question.difficulty === 'Medium' ? 
                        'bg-yellow-900/50 border-yellow-400/50 text-yellow-200' : 
                        'bg-red-900/50 border-red-400/50 text-red-200'
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 font-poppins text-white">{question.title}</h3>
                  <p className="text-sm text-gray-300 mb-6 font-poppins leading-relaxed">{question.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-poppins flex items-center ${
                      completed ? 'text-green-300' : unlocked ? 'text-blue-300' : 'text-gray-400'
                    }`}>
                      <span className="mr-2">
                        {completed ? '✅' : unlocked ? '🔓' : '🔒'}
                      </span>
                      {completed ? 'COMPLETED' : unlocked ? 'AVAILABLE' : 'LOCKED'}
                    </span>
                    <span className="bg-black/70 backdrop-blur-sm border-2 border-yellow-400/50 px-4 py-2 rounded font-poppins text-yellow-200">
                      {question.points} pt
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