import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import OriginalContent from './pages/OriginalContent';
import Notes from './pages/Notes';
import Summary from './pages/Summary';
import Flashcards from './pages/Flashcards';
import Quizzes from './pages/Quizzes';

function App() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout pdfUrl={pdfUrl} />}>
          <Route index element={<OriginalContent onPdfUpload={setPdfUrl} />} />
          <Route path="notes" element={<Notes />} />
          <Route path="summary" element={<Summary />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="quizzes" element={<Quizzes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;