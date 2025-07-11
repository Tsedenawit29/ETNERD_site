import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Add this line
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ✅ Wrap App in BrowserRouter with basename */}
    <BrowserRouter basename="/admin">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
