import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface OriginalContentProps {
  onPdfUpload: (url: string | null) => void;
}

function OriginalContent({ onPdfUpload }: OriginalContentProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      if (file.type === 'application/pdf') {
        const url = URL.createObjectURL(file);
        onPdfUpload(url);
      } else {
        onPdfUpload(null);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
        <h2 className="mt-6 text-xl font-semibold">Have a Question about your import?</h2>
        <p className="mt-2 text-gray-600">
          You can ask questions about your imported content, and your answers will appear here
        </p>
        
        <div className="mt-8">
          <p className="text-sm text-gray-500">Don't know what to ask? Here are few ideas on where to start</p>
          <div className="mt-4 flex justify-center space-x-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600">
              Write a paragraph...
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600">
              Explain concept...
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600">
              Compare with...
            </button>
          </div>
        </div>

        <div className="mt-8 relative">
          <input
            type="text"
            placeholder="Ask AI assistant..."
            className="w-full pl-4 pr-24 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <button 
              onClick={handleUploadClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Upload Document"
            >
              <Upload className="w-5 h-5 text-gray-600" />
            </button>
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm">
              This Session
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf"
          />
        </div>
      </div>
    </div>
  );
}

export default OriginalContent;