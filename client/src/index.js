import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App';
import BatteryStatus from './BatteryStatus';
import MotorStatus from './MotorStatus';
import Chat from './Chat';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/BatteryStatus" element={<BatteryStatus />} />
            <Route path="/MotorStatus" element={<MotorStatus />} />
            <Route path="/Chat" element={<Chat />} />
        </Routes>
    </Router>,
    <App />
);
