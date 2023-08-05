import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Router/Login';
import SendSMS from './Router/SendSMS';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SendSMS" element={<SendSMS />} />
      </Routes>
    </div>
  );
}

export default App;
