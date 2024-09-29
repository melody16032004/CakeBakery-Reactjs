import React, { useEffect, useState } from "react";
import CartPageItem from "./CartPageItem";
import NavBar from "../components/navbar";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import Newsletter from "../components/newsletter";


const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    // const products = [
    //     { id: 1, name: "Wheel Axel", price: "$25.00", image: "img/product/cart-img.jpg", quantity: 1 },
    //     { id: 2, name: "Brake Pad", price: "$15.00", image: "img/product/cart-img-2.jpg", quantity: 1 },
    // ];

    const handleQuantityChange = (id, newQuantity) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
        );
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Cập nhật localStorage
    };

    const handleRemove = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Cập nhật localStorage
    };

    const total = cartItems.reduce((acc, product) => acc + parseFloat(product.price) * product.quantity, 0);

    return (

        <div>
            <NavBar />
            <section className="banner_area">
                <div className="container">
                    <div className="banner_text">
                        <h3>Cart</h3>
                        <ul>
                            <li>
                                <Link to="/shop">Main Shop</Link>
                            </li>
                            <li>
                                <Link to="/cart">Cart Page</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="cart_table_area p_100">
                <div className="container">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Preview</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(product => (
                                    <CartPageItem
                                        key={product.id}
                                        image={product.image}
                                        productName={product.name}
                                        price={product.price}
                                        quantity={product.quantity}
                                        onQuantityChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                        onRemove={() => handleRemove(product.id)}
                                    />
                                ))}
                                {cartItems.length !== 0 ? (
                                    <tr>
                                        <td colSpan="3" />
                                        <td colSpan="2">
                                            <form className="form-inline" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Coupon code"
                                                    />
                                                </div>
                                                <button type="submit" className="btn">
                                                    Apply Coupon
                                                </button>
                                            </form>
                                        </td>
                                        <td colSpan="1" />
                                    </tr>
                                )
                                    : (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', padding: '40px 0px' }}>
                                                Giỏ hàng của bạn hiện không có sản phẩm nào.
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row cart_total_inner">
                        <div className="col-lg-7" />
                        <div className="col-lg-5">
                            <div className="cart_total_text">
                                <div className="cart_head">Cart Total</div>
                                <div className="sub_total">
                                    <h5>
                                        Sub Total <span>${total.toFixed(2)}</span>
                                    </h5>
                                </div>
                                <div className="total">
                                    <h4>
                                        Total <span>${total.toFixed(2)}</span>
                                    </h4>
                                </div>
                                <div className="cart_footer">
                                    <a className="pest_btn" href="#">
                                        Proceed to Checkout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default CartPage