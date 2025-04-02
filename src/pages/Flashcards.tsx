import React, { useState } from 'react';
import { Car as Cards, Loader2 } from 'lucide-react';

interface Flashcard {
  question: string;
  answer: string;
}

function Flashcards() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>([]);

  const generateFlashcards = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setCards([
        {
          question: "What is the main concept discussed in the document?",
          answer: "The document primarily discusses the fundamental principles and their practical applications in real-world scenarios."
        },
        {
          question: "What are the key findings mentioned?",
          answer: "The key findings include strong correlation with real-world applications, importance of secondary effects, and promising results in practical implementations."
        },
        {
          question: "What does the conclusion suggest?",
          answer: "The conclusion suggests potential for further research while acknowledging that current findings provide a solid foundation for practical applications."
        }
      ]);
      setIsGenerating(false);
      setCurrentCard(0);
      setIsFlipped(false);
    }, 2000);
  };

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(curr => curr + 1);
      setIsFlipped(false);
    }
  };

  const previousCard = () => {
    if (currentCard > 0) {
      setCurrentCard(curr => curr - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">AI Flashcards</h2>
          <button
            onClick={generateFlashcards}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Cards className="w-5 h-5" />
            )}
            <span>{isGenerating ? 'Generating...' : 'Generate Flashcards'}</span>
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Create interactive flashcards from your document using AI
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {cards.length > 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div
              className="w-full max-w-lg aspect-[3/2] perspective-1000"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
                  <p className="text-xl text-center text-gray-800">
                    {cards[currentCard].question}
                  </p>
                </div>
                {/* Back of card */}
                <div className="absolute w-full h-full backface-hidden bg-blue-50 rounded-xl shadow-lg p-6 flex items-center justify-center rotate-y-180">
                  <p className="text-xl text-center text-gray-800">
                    {cards[currentCard].answer}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex items-center space-x-4">
              <button
                onClick={previousCard}
                disabled={currentCard === 0}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-600">
                {currentCard + 1} of {cards.length}
              </span>
              <button
                onClick={nextCard}
                disabled={currentCard === cards.length - 1}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Click "Generate Flashcards" to create AI-powered flashcards from your document</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Flashcards;