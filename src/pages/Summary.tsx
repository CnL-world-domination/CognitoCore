import React, { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';

function Summary() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState<string>('');

  const generateSummary = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setSummary(
        `This document explores the fundamental principles of the subject matter, covering key concepts and their practical applications. The main thesis argues for a comprehensive approach to understanding the topic, supported by various examples and case studies.

The analysis reveals several important findings:
1. The primary concept demonstrates strong correlation with real-world applications
2. Secondary effects play a crucial role in overall outcomes
3. Practical implementations show promising results

The conclusion suggests that further research could yield additional insights, while current findings provide a solid foundation for practical applications.`
      );
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">AI Summary</h2>
          <button
            onClick={generateSummary}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <FileText className="w-5 h-5" />
            )}
            <span>{isGenerating ? 'Generating...' : 'Generate Summary'}</span>
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Create a concise summary of your document using AI
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {summary ? (
          <div className="prose max-w-none">
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="whitespace-pre-wrap text-gray-700">{summary}</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Click "Generate Summary" to create an AI-powered summary of your document</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Summary;