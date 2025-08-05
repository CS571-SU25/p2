import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Summary from './pages/Summary';
import Navbar from './components/Navbar';
import MissingData from './pages/MissingData';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/practice" element={<Practice />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/missing" element={<MissingData />} />
            </Routes>
        </Router>
    );
}
