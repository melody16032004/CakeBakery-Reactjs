import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { hover } from '@testing-library/user-event/dist/hover';

const Login = ({ setShowLogin, setShowForget, setCartItems }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const styles = {
        subLogin: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        withoutAccount: {
            fontSize: 15,
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '200px',
            margin: '50px auto',
            backgroundColor: 'transparent',
            ...(isHovered && {
                backgroundColor: '#f195b2',
            })
        },
        customLink: {
            textDecoration: 'none',
            color: 'white',
            fontStyle: 'italic',

            ...(isHovered && {
                color: 'black',
            }),

        }
    }
    useEffect(() => {
        const storedEmail = localStorage.getItem('savedEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);

            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("savedEmail", email);

            if (email === 'hoangdoan103@gmail.com')
                navigate('/admin');
            else

                navigate('/home');
            alert('Đăng nhập thành công!');
        } catch (error) {
            if (error.message === "Firebase: Error (auth/invalid-credential).")
                alert("Tài khoản hoặc mật khẩu không đúng");
        }
    };
    const handleAlert = () => {
        alert("Bạn đã đăng nhập với vai trò là khách!");
    }


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

                <div className='subLogin' style={styles.subLogin}>
                    <p onClick={setShowLogin}>Chưa có tài khoản? Đăng ký</p>
                    <p onClick={setShowForget}>Quên mật khẩu?</p>
                </div>
                <button style={styles.withoutAccount}
                    onClick={handleAlert}>
                    <Link style={styles.customLink}
                        to="/home"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Login without account!
                    </Link>

                </button>
            </form>
        </div>
    );

};




export default Login;
