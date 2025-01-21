import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailBuilder from './components/EmailBuilder';
import TemplateList from './components/TemplateList';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TemplateList />} />
            <Route path="/builder" element={<EmailBuilder />} />
            <Route path="/builder/:id" element={<EmailBuilder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

