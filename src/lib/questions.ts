// lib/questions.ts
export interface Question {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  flag: string;
  description: string;
  challenge?: string; // The actual challenge content
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Welcome to CTF",
    difficulty: 'Easy',
    points: 100,
    flag: "DECIPHER{welcome_to_ctf}",
    description: "A simple Base64 decoding challenge to get you started.",
    challenge: "SGVyZSBpcyB5b3VyIGZpcnN0IGZsYWc6IERFQ0lQSEVSe3dlbGNvbWVfdG9fY3RmfQ=="
  },
  {
    id: 2,
    title: "Caesar's Secret",
    difficulty: 'Easy',
    points: 150,
    flag: "DECIPHER{julius_caesar_cipher}",
    description: "Decode the Caesar cipher to find the flag.",
    challenge: "QRPVCURE{wh?vhf_pnrfne_pvcure}"
  },
  {
    id: 3,
    title: "Hidden in Plain Sight",
    difficulty: 'Medium',
    points: 200,
    flag: "DECIPHER{steganography_rocks}",
    description: "Look deeper into the image to find the hidden message.",
    challenge: "Download and analyze the image file for hidden data."
  },
  {
    id: 4,
    title: "Web Inspector",
    difficulty: 'Medium',
    points: 250,
    flag: "DECIPHER{inspect_element_pro}",
    description: "Use browser developer tools to find the flag.",
    challenge: "The flag is hidden in the HTML comments or CSS."
  },
  {
    id: 5,
    title: "Binary Secrets",
    difficulty: 'Hard',
    points: 300,
    flag: "DECIPHER{binary_is_life}",
    description: "Convert the binary message to text.",
    challenge: "0100010001000101010000110100100101010000010010000100010101010010011110110110001001101001011011100110000101110010011110010101111101101001011100110101111101101100011010010110011001100101011111010"
  },
  {
    id: 6,
    title: "SQL Injection",
    difficulty: 'Hard',
    points: 400,
    flag: "DECIPHER{sql_injection_master}",
    description: "Find the SQL injection vulnerability.",
    challenge: "Login form is vulnerable to SQL injection. Find the admin credentials."
  }
];

// Helper functions
export const getQuestionById = (id: number): Question | undefined => {
  return QUESTIONS.find(q => q.id === id);
};

export const getNextQuestionId = (currentId: number): number | null => {
  return currentId < QUESTIONS.length ? currentId + 1 : null;
};

export const getTotalQuestions = (): number => {
  return QUESTIONS.length;
};