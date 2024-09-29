import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = ({ setShowForget }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            alert('Email đặt lại mật khẩu đã được gửi.');

            await sendPasswordResetEmail(auth, email);
            setMessage('Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.');
            setEmail('');

            // Chuyển hướng đến màn hình đăng nhập sau khi gửi email
            setTimeout(() => {
                setShowForget('login');
                navigate('/');
            }, 3000);
        } catch (error) {
            setMessage('Không thể gửi email đặt lại mật khẩu. Vui lòng kiểm tra lại email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Quên Mật Khẩu</h2>
            <form onSubmit={handlePasswordReset}>
                <input
                    type="email"
                    placeholder="Nhập email để đặt lại mật khẩu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Đang gửi...' : 'Gửi Email Đặt Lại Mật Khẩu'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgetPassword