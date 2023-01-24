import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App';
import BatteryStatus from './BatteryStatus';
// import Open from './Open';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/BatteryStatus" element={<BatteryStatus />} />
            {/* <Route path="/open" element={<Open />} /> */}
        </Routes>
    </Router>,
    <App />
);
