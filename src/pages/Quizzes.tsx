import React, { useState } from 'react';
import { Brain, Loader2, Check, X } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

function Quizzes() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const generateQuiz = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setQuestions([
        {
          question: "What is the primary focus of the document?",
          options: [
            "Theoretical concepts only",
            "Practical applications only",
            "Both theoretical concepts and practical applications",
            "Neither theoretical nor practical content"
          ],
          correctAnswer: 2
        },
        {
          question: "Which of the following is mentioned as a key finding?",
          options: [
            "Weak correlation with applications",
            "Strong correlation with real-world applications",
            "No correlation found",
            "Inconclusive results"
          ],
          correctAnswer: 1
        },
        {
          question: "What does the conclusion suggest about future research?",
          options: [
            "No further research needed",
            "Current findings are inconclusive",
            "Further research could yield additional insights",
            "Research should be discontinued"
          ],
          correctAnswer: 2
        }
      ]);
      setIsGenerating(false);
      setCurrentQuestion(0);
      setSelectedAnswers([]);
      setShowResults(false);
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">AI Quizzes</h2>
          <button
            onClick={generateQuiz}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Brain className="w-5 h-5" />
            )}
            <span>{isGenerating ? 'Generating...' : 'Generate Quiz'}</span>
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Test your knowledge with AI-generated quizzes
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {questions.length > 0 ? (
          <div className="max-w-2xl mx-auto">
            {showResults ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Quiz Results</h3>
                  <p className="text-lg">
                    Score: {calculateScore()} out of {questions.length}
                  </p>
                </div>
                
                {questions.map((question, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                    <p className="font-medium mb-4">{question.question}</p>
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg mb-2 flex items-center justify-between ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-100'
                            : selectedAnswers[index] === optionIndex
                            ? 'bg-red-100'
                            : 'bg-gray-50'
                        }`}
                      >
                        <span>{option}</span>
                        {optionIndex === question.correctAnswer ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : selectedAnswers[index] === optionIndex ? (
                          <X className="w-5 h-5 text-red-600" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                ))}
                
                <button
                  onClick={generateQuiz}
                  className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="mb-6">
                  <span className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <h3 className="text-lg font-medium mt-2">
                    {questions[currentQuestion].question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg transition-colors ${
                        selectedAnswers[currentQuestion] === index
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Click "Generate Quiz" to create an AI-powered quiz from your document</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quizzes;