import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ setShowLogin, setShowForget, setCartItems }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('savedEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    // Function to load cart based on user email after successful login
    // const loadUserCart = (userEmail) => {
    //     const storedCartData = localStorage.getItem('cartData');
    //     if (storedCartData) {
    //         const cartDataArray = JSON.parse(storedCartData);
    //         const userCartData = cartDataArray.find(cart => cart.email === userEmail);
    //         if (userCartData) {
    //             setCartItems(userCartData.cartItems); 
    //         } else {
    //             setCartItems([]);
    //         }
    //     } else {
    //         setCartItems([]);
    //     }
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);

            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("savedEmail", email);

            // loadUserCart(email);

            alert('Đăng nhập thành công!');
            navigate('/home');
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

                <div className='subLogin' style={styles.subLogin}>
                    <p onClick={setShowLogin}>Chưa có tài khoản? Đăng ký</p>
                    <p onClick={setShowForget}>Quên mật khẩu?</p>
                </div>

            </form>
        </div>
    );
};

const styles = {
    subLogin: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}

export default Login;
