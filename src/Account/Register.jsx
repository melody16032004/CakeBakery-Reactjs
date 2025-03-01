import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebaseInstance from './Firebase Singleton Pattern/firebaseConfig';
// import { useNavigate } from 'react-router-dom';

const Register = ({ setShowLogin, navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const navigate = useNavigate();
    // const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        // Kiểm tra điều kiện
        if (!email || !password || !confirmPassword) {
            alert('Vui lòng điền đầy đủ thông tin');
        } else if (password !== confirmPassword) {
            alert('Mật khẩu không khớp');
        } else if (password.length < 6) {
            alert('Mật khẩu phải ít nhất 6 kí tự');
        } else {
            // Gọi Firebase hoặc API đăng ký tại đây
            await createUserWithEmailAndPassword(firebaseInstance.auth, email, password);
            localStorage.setItem("isAuthenticated", true);
            alert('Đăng ký thành công!');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setShowLogin(true);
        }
    };


    return (
        <div>

            <form onSubmit={handleRegister}>
                <h2>Đăng Ký</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Đăng ký</button>
                {/* {error && <p className="error-message">{error}</p>} */}
                <div className='login' onClick={setShowLogin}>Đã có tài khoản? Đăng nhập</div>
            </form>

        </div>
    );
};

export default Register;
