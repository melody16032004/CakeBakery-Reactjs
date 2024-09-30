import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from "../Account/Register";
import Login from "../Account/Login";
import ForgetPassword from "../Account/ForgetPassword";
import '../Account/Register.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const NavigateLogin = () => {
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
                        <Login
                            setShowLogin={() => handleToggle('register')}
                            navigate={navigate}
                            setShowForget={() => handleToggle('forget')}
                        // setCartItems={setCartItems}
                        />
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
}

export default NavigateLogin