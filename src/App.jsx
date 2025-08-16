import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ScanWaste from './components/ScanWaste';
import Services from './components/Services';
import AIModel from './components/AIModel';
import Leaderboard from './components/Leaderboard';
import Rewards from './components/Rewards';
import Profile from './components/Profile';
import CaseStudies from './components/CaseStudies';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scan" element={<ScanWaste />} />
            <Route path="/ai-model" element={<AIModel />} />
            <Route path="/services" element={<Services />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;