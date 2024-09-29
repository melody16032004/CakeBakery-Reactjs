import Register from "./Account/Register";
import Login from "./Account/Login";
import Home from "./Account/Home";
import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './Account/Register.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ForgetPassword from "./Account/ForgetPassword";



const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showForget, setShowForget] = useState(false);

  const [currentView, setCurrentView] = useState('login');
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (view) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentView(view);
      setAnimating(false);
    }, 500); // Thời gian hiệu ứng (0.5 giây)
  };

  return (
    <div className="App">
      <div className="form-container">
        {currentView === 'forget' && (
          <div className={`forget-container ${animating ? 'exit' : 'active'}`}>
            <ForgetPassword setShowForget={() => handleToggle('login')} navigate={navigate} />
          </div>
        )}
        {currentView === 'login' && (
          <div className={`login-container ${animating ? 'exit' : 'active'}`}>
            <Login setShowLogin={() => handleToggle('register')} navigate={navigate} setShowForget={() => handleToggle('forget')} />
          </div>
        )}
        {currentView === 'register' && (
          <div className={`register-container ${animating ? 'exit' : 'active'}`}>
            <Register setShowLogin={() => handleToggle('login')} navigate={navigate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
