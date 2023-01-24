import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App';
// import SpeedLog from './SpeedLog';
// import Open from './Open';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Router>
    //     <Routes>
    //         <Route path="/" element={<Control />} />
    //         <Route path="/speedlog" element={<SpeedLog />} />
    //         <Route path="/open" element={<Open />} />
    //     </Routes>
    // </Router>,
    <App />
);
