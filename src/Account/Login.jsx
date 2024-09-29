import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ setShowLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Lấy tài khoản từ localStorage khi component được render lần đầu
    useEffect(() => {
        const storedEmail = localStorage.getItem('savedEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        // Xử lý đăng nhập tại đây  
        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("savedEmail", email);
            alert('Đăng nhập thành công!');
            navigate('/home');
            // Bạn có thể chuyển hướng tới trang khác ở đây
        } catch (error) {
            if (error.message === "Firebase: Error (auth/invalid-credential).")
                alert("Tài khoản hoặc mật khẩu không đúng");
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Đăng Nhập</h2>
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
                <button type="submit">Đăng nhập</button>

                <p onClick={setShowLogin}>Chưa có tài khoản? Đăng ký</p>
            </form>

        </div>
    );
};

export default Login;
