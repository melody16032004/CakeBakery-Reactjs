import Register from "./Account/Register";
import Login from "./Account/Login";
import Home from "./Account/Home";
import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './Account/Register.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    // Thêm độ trễ cho hiệu ứng
    setAnimating(true);
    setTimeout(() => {
      setShowLogin(!showLogin);
      setAnimating(false);
    }, 500); // Thời gian hiệu ứng (0.5 giây)
  };

  return (


    <div className="App">
      <div className="form-container">
        <div className={`login-container ${showLogin ? 'active' : animating ? 'exit' : ''}`}>
          <Login setShowLogin={handleToggle} navigate={navigate} />
        </div>
        <div className={`register-container ${!showLogin ? 'active' : animating ? 'exit' : ''}`}>
          <Register setShowLogin={handleToggle} navigate={navigate} />
        </div>
      </div>
    </div>


  );
};

export default App;
