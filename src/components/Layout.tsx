import React from 'react';
import { Outlet } from 'react-router-dom';
import { Volume2, Timer } from 'lucide-react';
import Navigation from './Navigation';
import PDFViewer from './PDFViewer';
import Navbar from './Navbar';

interface LayoutProps {
  pdfUrl: string | null;
}

function Layout({ pdfUrl }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Navigation */}
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Top Navigation */}
          <Navigation />
          
          {/* Content Area */}
          <div className="flex">
            {/* Left Side - Document Viewer */}
            <div className="w-2/3 border-r border-gray-200">
              <div className="bg-gray-100 p-2 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <span>1</span>
                  </button>
                  <span>/ 10</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <Volume2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Focused Reading</span>
                    <div className="w-12 h-6 bg-blue-500 rounded-full"></div>
                    <Timer className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">0</span>
                  </div>
                </div>
              </div>
              <div className="h-[calc(100vh-16rem)] bg-gray-50 overflow-auto">
                <PDFViewer url={pdfUrl} />
              </div>
            </div>

            {/* Right Side - AI Features */}
            <div className="w-1/3">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;