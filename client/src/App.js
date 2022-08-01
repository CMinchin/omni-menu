import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Restaurant from './pages/restaurant';
import User from './pages/user';
import NotFound from './pages/user';

function App() {
  const title = 'Omni Menu';
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Home />}
        />
        <Route 
          path="/restaurant" 
          element={<Restaurant />}
        />
        <Route 
          path="/user" 
          element={<User />}
        />
        <Route 
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Router>
  );
}

export default App;
