import React, { useState, useEffect } from 'react';
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { auth, db } from './firebaseConfig';
import { doc, addDoc, setDoc, getDoc, collection, query, where } from 'firebase/firestore';
import "./Checkout.css";

const Checkout = () => {
    const styles = {
        space: {
            height: '150px',
        },
        formGroup: {
            display: 'flex',
        },
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
    const [cart, setCart] = useState([
        { id: 1, name: 'Electric Hummer', price: 65.00, quantity: 1 },
        { id: 2, name: 'Mountain Bike', price: 120.00, quantity: 1 },
        { id: 3, name: 'Gaming Laptop', price: 1500.00, quantity: 1 },
        { id: 4, name: 'Smart Watch', price: 200.00, quantity: 1 },
        { id: 5, name: 'Bluetooth Speaker', price: 75.00, quantity: 1 },
    ]);
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);
    const total = cartItems.reduce((acc, product) => acc + parseFloat(product.price) * product.quantity, 0);

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const documentId = Date.now().toString();

            const cartItem = cartItems.map(item => ({
                id: item.id,
                product: item.name,
                quantity: item.quantity,
            }));

            const docRef = await setDoc(doc(db, 'invoices', documentId), {
                ...formData,
                items: cartItem, // Danh sách sản phẩm
                total: total, // Tổng giá trị hóa đơn
                createdAt: new Date(), // Ngày tạo hóa đơn
            });
            console.log('Document written with ID: ', documentId);
            alert('Invoice saved successfully!');
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error saving invoice');
        }
    };


    return (
        <div>
            <NavBar />
            {/* <div style={styles.space}></div> */}
            <section className="banner_area">
                <div className="container">
                    <div className="banner_text">
                        <h3>Chekout</h3>
                        <ul>
                            <li>
                                {/* <a href="index.html">Home</a> */}
                                <Link to="/cart">Cart</Link>
                            </li>
                            <li>
                                {/* <a href="checkout.html">Chekout</a> */}
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
                        {/* <h4>
                            Returning customer? <a href="#">Click here to login</a>
                        </h4> */}
                    </div>
                    <div className="row">
                        <form onSubmit={handleSubmit}
                            style={styles.formGroup}
                        // method="post"
                        // noValidate="novalidate"
                        >
                            <div className="col-lg-7">
                                <div className="main_title">
                                    {/* <h2>Billing Details</h2> */}
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
                                            {/* <label htmlFor="last">Last Name *</label> */}
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
                                            {/* <label htmlFor="company">Company Name</label> */}
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
                                            {/* <input
                                            type="text"
                                            className="form-control"
                                            id="address2"
                                            name="address2"
                                            placeholder="Apartment, Suit unit etc (optional)"
                                            required
                                        /> */}
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
                                                <h5 key={item.id}>{item.name} x {item.quantity} <span>${(item.price * item.quantity).toFixed(2)}</span></h5>
                                            ))}
                                            <h4>Subtotal <span>${total}</span></h4>
                                            <h5>Shipping And Handling <span className="text_f">Free Shipping</span></h5>
                                            <h3>Total <span>${total}</span></h3>
                                        </div>
                                        <div id="accordion" className="accordion_area">
                                            <div className="card">
                                                <div className="card-header" id="headingOne">
                                                    <h5 className="mb-0">
                                                        <button
                                                            className="btn btn-link"
                                                            data-toggle="collapse"
                                                            data-target="#collapseOne"
                                                            aria-expanded="true"
                                                            aria-controls="collapseOne"
                                                            type='button'
                                                        >
                                                            Direct Bank Transfer
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div
                                                    id="collapseOne"
                                                    className="collapse show"
                                                    aria-labelledby="headingOne"
                                                    data-parent="#accordion">
                                                    <div className="card-body">
                                                        {/* Make your payment directly into our bank account. Please
                                                    use your Order ID as the payment reference. Your order
                                                    won`t be shipped until the funds have cleared in our
                                                    account. */}
                                                        ...
                                                    </div>
                                                </div>
                                            </div>
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
                                                            Check Payment
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div
                                                    id="collapseTwo"
                                                    className="collapse"
                                                    aria-labelledby="headingTwo"
                                                    data-parent="#accordion">
                                                    <div className="card-body">
                                                        {/* Make your payment directly into our bank account. Please
                                                    use your Order ID as the payment reference. Your order
                                                    won`t be shipped until the funds have cleared in our
                                                    account. */}
                                                        ...
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingThree">
                                                    <h5 className="mb-0">
                                                        <button
                                                            className="btn btn-link collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapseThree"
                                                            aria-expanded="false"
                                                            aria-controls="collapseThree"
                                                            type='button'>
                                                            Paypal
                                                            <img src="img/checkout-card.png" alt="" />
                                                        </button>
                                                        <a href="#">What is PayPal?</a>
                                                    </h5>
                                                </div>
                                                <div
                                                    id="collapseThree"
                                                    className="collapse"
                                                    aria-labelledby="headingThree"
                                                    data-parent="#accordion">
                                                    <div className="card-body">
                                                        ...
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn pest_btn">
                                            place order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            {/* <div style={styles.space}></div> */}
            <Footer />
        </div>
    );
}

export default Checkout