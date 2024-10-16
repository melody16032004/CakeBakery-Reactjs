import React, { useState, useEffect } from 'react';
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from './firebaseConfig';
import { doc, addDoc, setDoc, getDoc, collection, query, where, deleteDoc } from 'firebase/firestore';
import "./Checkout.css";
import { Typography } from '@mui/material';
import axios from 'axios';



const Checkout = () => {
    const styles = {
        space: {
            height: '150px',
        },
        formGroup: {
            display: 'flex',
        },
        countDown: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
        }
    }

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        email: '',
        phone: '',
        orderNotes: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [isAddressValid, setIsAddressValid] = useState(true);

    const validateAddressWithPositionstack = async () => {
        const address = `${formData.address}`;
        const API_KEY = 'ce8e6250c3f808c529e178c70f3fd3f0';
        const url = `http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${encodeURIComponent(address)}`;

        try {
            const response = await axios.get(url);
            const result = response.data.data;

            if (result.length > 0) {
                setIsAddressValid(true); // Address is valid
            } else {
                setIsAddressValid(false); // Address is invalid
                // alert('The address you entered is invalid. Please enter a valid address.');
                alert('Địa chỉ bạn nhập không tồn tại.\nVui lòng nhập địa chỉ chính xác.');
            }
        } catch (error) {
            console.error('Error validating address: ', error);
            setIsAddressValid(false);
            alert('Địa chỉ không tồn tại.');
        }
    };

    const [cartItems, setCartItems] = useState([]);
    const [timeLeft, setTimeLeft] = useState(300); // Countdown timer for 5 minutes = 300
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [orderId, setOrderId] = useState(localStorage.getItem('orderId') || null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);

    // useEffect(() => {
    //     let interval;
    //     if (isTimerActive && timeLeft > 0) {
    //         interval = setInterval(() => {
    //             setTimeLeft(prevTime => {
    //                 if (prevTime <= 1) {
    //                     clearInterval(interval);
    //                     handleConfirmOrder();
    //                     return 0;
    //                 }
    //                 return prevTime - 1;
    //             });
    //         }, 1000);
    //     }

    //     return () => clearInterval(interval); 
    // }, [isTimerActive, timeLeft]);
    useEffect(() => {
        // Start timer immediately on component mount
        setIsTimerActive(true);

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime == 0) {
                    clearInterval(interval);
                    resetTimer();
                    navigate('/cart'); // Redirect to CartPage
                    alert('Thời gian đã hết! Bạn sẽ được chuyển hướng về trang giỏ hàng.');
                    return 0; // Set time left to 0
                }
                return prevTime - 1;
            });
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);
    const resetTimer = () => {
        setTimeLeft(300); // Reset timer to 300 seconds
        localStorage.removeItem('timerStart'); // Optionally remove timer start from local storage
    };

    useEffect(() => {
        const timerStart = localStorage.getItem('timerStart');
        const storedOrderId = localStorage.getItem('orderId');
        if (timerStart) {
            const timeElapsed = Math.floor((new Date().getTime() - parseInt(timerStart, 10)) / 1000);
            const remainingTime = 300 - timeElapsed;  // 300 seconds (5 minutes)

            if (remainingTime > 0) {
                setTimeLeft(remainingTime);
                setIsTimerActive(true);
            } else {
                // Time has expired, handle order confirmation
                handleConfirmOrder();
            }
        }

        if (storedOrderId) {
            setOrderId(storedOrderId); // Ensure orderId is set if it exists in localStorage
        }

        // Clear timer on component unmount
        return () => {
            localStorage.removeItem('timerStart');
        };
    }, []);

    const total = cartItems.reduce((acc, product) => acc + parseFloat(product.price) * product.quantity, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validateAddressWithPositionstack();

            if (isAddressValid) {
                console.log('Address is valid, submitting order...');

                const documentId = Date.now().toString();

                const cartItem = cartItems.map(item => ({
                    id: item.id,
                    product: item.name,
                    quantity: item.quantity,
                }));

                await setDoc(doc(db, 'invoices', documentId), {
                    ...formData,
                    items: cartItem, // Danh sách sản phẩm
                    total: total, // Tổng giá trị hóa đơn
                    createdAt: new Date(), // Ngày tạo hóa đơn
                    status: "Đang xử lý",
                    id: documentId,
                });
                const newOrderId = documentId; // Replace this with your actual order creation logic
                setOrderId(newOrderId);
                localStorage.setItem('orderId', newOrderId); // Store the order ID in localStorage
                localStorage.setItem('timerStart', new Date().getTime().toString()); // Save start time in localStorage

                setIsTimerActive(true); // Activate the timer
                setTimeLeft(300);
                console.log('Document written with ID: ', documentId);
                alert('Đơn hàng của bạn đã được giao.\nVui lòng kiểm tra đơn hàng, xin cảm ơn!');
            }



        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error saving invoice');
        }
    };

    const handleCancelOrder = async () => {
        if (!orderId) {
            console.error('Order ID is missing. Cannot cancel order.');
            return;
        }

        try {
            await deleteDoc(doc(db, 'invoices', orderId)); // Delete the order document from Firestore
            setIsTimerActive(false); // Stop the timer
            setOrderId(null); // Reset the order ID
            setTimeLeft(300); // Reset the timer
            localStorage.removeItem('orderId'); // Remove orderId from local storage
            localStorage.removeItem('timerStart'); // Remove the timer start from local storage
            alert('Your order has been canceled.');
            navigate('/cart'); // Redirect the user after cancellation
            resetTimer();
        } catch (error) {
            console.error('Error canceling order: ', error);
            alert('Error canceling the order');
        }
    };

    const handleMomoPayment = () => {
        // Your Momo payment logic here
        navigate('/momo');
    }

    const handleConfirmOrder = async () => {
        if (orderId) {
            try {
                console.log(`Order ${orderId} has been confirmed.`);
                alert('The order has been confirmed after the timer ran out.');

                await deleteCartItems();
                setIsTimerActive(false); // Stop the timer
                localStorage.removeItem('timerStart'); // Clear the timer from localStorage
            } catch (error) {
                console.error('Error confirming order: ', error);
            }
        } else {
            console.log("Order ID is missing. Cannot confirm order.");
        }
    };

    const deleteCartItems = async () => {
        const cartItemsRef = collection(db, 'carts');
        const q = query(cartItemsRef, where('userEmail', '==', auth.email)); // Assuming you filter by user ID

        const querySnapshot = await getDoc(q);
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref)); // Prepare delete promises

        await Promise.all(deletePromises); // Wait for all deletions to complete
        console.log('Cart items have been deleted successfully.');
    };


    return (
        <div>
            <NavBar />
            <section className="banner_area">
                <div className="container">
                    <div className="banner_text">
                        <h3>Chekout</h3>
                        <ul>
                            <li>
                                <Link to="/cart">Cart</Link>
                            </li>
                            <li>
                                <Link to="/checkout">Chekout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* --------------------------------------------------------- */}
            <section className="billing_details_area p_100">
                <div className="container">
                    <div className="return_option">
                    </div>
                    <div className="row">
                        <form onSubmit={handleSubmit}
                            style={styles.formGroup}
                        >
                            <div className="col-lg-7">
                                <div className="main_title">
                                    <h2>Chi tiết thanh toán</h2>
                                </div>
                                <div className="billing_form_area">
                                    <div
                                        className="billing_form row"
                                        id="contactForm">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="first">Tên *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="first"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="last">Họ *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="last"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="company">Tên công ty</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="company"
                                                name="company"
                                                placeholder="Company Name"
                                                value={formData.company}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            {/* <label htmlFor="address">Address *</label> */}
                                            <label htmlFor="address">Địa chỉ *</label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                name="address"
                                                placeholder="Street Address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="email">Email Address *</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="phone">Phone *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phone"
                                                name="phone"
                                                placeholder="Select an option"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="phone">Order Notes</label>
                                            <textarea
                                                className="form-control"
                                                name="orderNotes"
                                                id="message"
                                                rows={1}
                                                placeholder="Note about your order. e.g. special note for delivery"
                                                value={formData.orderNotes}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="order_box_price">
                                    <div className="main_title">
                                        {/* <h2>Your Order</h2> */}
                                        <h2>Đơn hàng của bạn</h2>
                                    </div>
                                    <div className="payment_list">
                                        <div className="price_single_cost">
                                            <h5>Product <span>Total</span></h5>
                                            {cartItems.map(item => (
                                                <Typography variant='h5' color='grey' key={item.id}>
                                                    {item.name} x {item.quantity}
                                                    <span style={{ display: 'flex', justifyContent: 'end' }}>
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </Typography>
                                            ))}
                                            <div style={{ padding: '10px 0' }} />
                                            <h4>Subtotal <span>${(total).toFixed(2)}</span></h4>
                                            <h5>Shipping And Handling <span className="text_f">Free Shipping</span></h5>
                                            <h3>Total <span>${(total).toFixed(2)}</span></h3>
                                        </div>
                                        {/* Countdown Timer */}

                                        <div id="accordion" className="accordion_area">

                                            {/* MoMo Payment */}
                                            <div className="card">
                                                <div className="card-header" id="headingOne">
                                                    <h5 className="mb-0">
                                                        <button
                                                            className="btn btn-link collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapseOne"
                                                            aria-expanded="false"
                                                            aria-controls="collapseOne"
                                                            type='button'>
                                                            MoMo Payment
                                                            <img src="img/momo-logo.png" alt="MoMo Logo" style={{ width: '50px', marginLeft: '10px' }} />
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div
                                                    id="collapseOne"
                                                    className="collapse"
                                                    aria-labelledby="headingOne"
                                                    data-parent="#accordion">
                                                    <div className="card-body">
                                                        <Typography variant='body2' color='textPrimary'>Use MoMo to pay for your order.</Typography>
                                                        <button className="btn pest_btn" onClick={handleMomoPayment}>
                                                            Pay with MoMo
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Cash Payment */}
                                            <div className="card">
                                                <div className="card-header" id="headingTwo">
                                                    <h5 className="mb-0">
                                                        <button
                                                            className="btn btn-link collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapseTwo"
                                                            aria-expanded="false"
                                                            aria-controls="collapseTwo"
                                                            type='button'>
                                                            Cash Payment {/* Thay đổi ở đây */}
                                                            <img src="img/cash-logo.png" alt="Cash Logo" style={{ width: '50px', marginLeft: '10px' }} /> {/* Thay đổi logo nếu cần */}
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div
                                                    id="collapseTwo"
                                                    className="collapse"
                                                    aria-labelledby="headingTwo"
                                                    data-parent="#accordion">
                                                    <div className="card-body">
                                                        <Typography variant='body2' color='textPrimary'>Use cash to pay for your order.</Typography>
                                                        <button type="submit" className="btn pest_btn">
                                                            Pay with Cash
                                                        </button>
                                                        {/* {isTimerActive ? (
                                                            <button type="button" className="btn pest_btn cancel_btn" onClick={handleCancelOrder}>
                                                                Cancel Order
                                                            </button>
                                                        ) : (
                                                            <button type="submit" className="btn pest_btn">
                                                                Pay with Cash
                                                            </button>
                                                        )} */}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        {isTimerActive && (
                                            <div style={styles.countDown}>
                                                <h5>Time left to cancel: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</h5>
                                            </div>
                                        )}



                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Checkout