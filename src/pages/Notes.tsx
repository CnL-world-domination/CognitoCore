import React, { useState } from 'react';
import { BookOpen, Loader2 } from 'lucide-react';

function Notes() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);

  const generateNotes = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setNotes([
        "Chapter 1: Key Concepts",
        "• Important point about the main topic",
        "• Secondary concept explained in detail",
        "• Related examples and applications",
        "Chapter 2: Analysis",
        "• Detailed breakdown of the subject matter",
        "• Critical analysis of key arguments"
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">AI Notes</h2>
          <button
            onClick={generateNotes}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <BookOpen className="w-5 h-5" />
            )}
            <span>{isGenerating ? 'Generating...' : 'Generate Notes'}</span>
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Generate comprehensive notes from your document using AI
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div
                key={index}
                className={`p-4 ${
                  note.startsWith('Chapter') 
                    ? 'font-semibold text-lg' 
                    : 'pl-8'
                } ${
                  note.startsWith('•') 
                    ? 'text-gray-700' 
                    : 'text-gray-900'
                }`}
              >
                {note}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Click "Generate Notes" to create AI-powered notes from your document</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;