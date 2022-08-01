import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Restaurant from './pages/restaurant';
import User from './pages/user';
import NotFound from './pages/home';
import "./index.css"
import "./style.css"

function App() {
  const title = 'Omni Menu';
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <Router>
      <nav>
        {/* This is not exactly professional but it is functional */}
        <Routes>
          <Route path='/'/>
          <Route path="*" element={
            <h2>Omni Menu</h2>
          }/>
        </Routes>
        <a href='/'>Home</a>
        <a href='/user'>User</a>
        <a href='/restaurant'>Restaurant</a>
      </nav>
      <div className='superPage'>
        <div className='page'>
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
        </div>
      </div>
    </Router>
  );
}

export default App;
