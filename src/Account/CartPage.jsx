import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CartPageItem from "./CartPageItem";
import NavBar from "../components/navbar";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import Newsletter from "../components/newsletter";
import { auth, db } from './firebaseConfig';
import { doc, setDoc, getDoc, collection, query, where } from 'firebase/firestore';


const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true); // Thêm state loading
    const [delayPassed, setDelayPassed] = useState(false);
    const navigate = useNavigate();

    // const [email, setEmail] = useState("");

    // Hàm để lấy dữ liệu từ Firestore
    const fetchCartItems = async () => {
        const userEmail = localStorage.getItem('savedEmail');
        if (userEmail) {
            const cartDocRef = doc(db, "carts", userEmail);
            const cartSnapshot = await getDoc(cartDocRef);
            if (cartSnapshot.exists()) {
                const data = cartSnapshot.data();
                const items = data.items || [];
                setCartItems(items); // Cập nhật giỏ hàng từ Firestore
                localStorage.setItem('cartItems', JSON.stringify(items)); // Lưu vào localStorage
            } else {
                // Nếu tài liệu không tồn tại, có thể tạo một tài liệu mới
                await setDoc(cartDocRef, { items: [] }); // Tạo tài liệu giỏ hàng rỗng
                console.log("No cart found for this user. Created a new cart.");
                setCartItems([]); // Cập nhật giỏ hàng là rỗng
                localStorage.setItem('cartItems', JSON.stringify([])); // Lưu vào localStorage
            }
        }
        setLoading(false);
    };
    // Gọi fetchCartItems khi component mount
    useEffect(() => {
        // Gọi fetchCartItems để lấy dữ liệu
        fetchCartItems();

        // Đặt thời gian delay 2 giây trước khi cho phép hiển thị nội dung
        const delayTimer = setTimeout(() => {
            setDelayPassed(true); // Sau 2 giây, cho phép hiển thị
        }, 2000);

        return () => clearTimeout(delayTimer); // Dọn dẹp timer khi component bị unmount
    }, []);

    // Function to save cart items and email to local storage
    const saveCartToLocalStorage = (cartItems) => {
        const cartData = { cartItems };
        localStorage.setItem('cartItems', JSON.stringify(cartData));
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        navigate('/checkout', { replace: true });
    }

    const handleQuantityChange = async (productId, newQuantity) => {
        const userEmail = localStorage.getItem('savedEmail');
        if (Number(newQuantity) < 1) {
            removeFromCart(productId); // Gọi hàm xóa
        } else if (Number(newQuantity) > 20) {
            alert("Số lượng sản phẩm không được vượt quá 20.");
        } else {
            setCartItems((prevItems) => {
                const updatedItems = prevItems.map((item) =>
                    item.id === productId ? { ...item, quantity: Number(newQuantity) } : item
                );

                // Cập nhật giỏ hàng vào Firestore
                const cartDocRef = doc(db, "carts", userEmail);
                setDoc(cartDocRef, { items: updatedItems }, { merge: true }); // Cập nhật Firestore

                return updatedItems; // Trả về giỏ hàng đã cập nhật
            });
        }
    };

    const removeFromCart = async (id) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => item.id !== id);

            const userEmail = localStorage.getItem('savedEmail');
            const cartDocRef = doc(db, "carts", userEmail);
            setDoc(cartDocRef, { items: updatedItems }, { merge: true }); // Cập nhật Firestore

            return updatedItems;
        });
    };

    const total = cartItems.reduce((acc, product) => acc + parseFloat(product.price) * product.quantity, 0);

    if (loading || !delayPassed) {
        // Hiển thị màn hình loading nếu đang trong quá trình fetch hoặc thời gian delay chưa kết thúc
        return (
            <div>
                <NavBar />
                <section className="loading_screen" style={{ textAlign: "center", paddingTop: "200px", paddingBottom: "100px" }}>
                    <h2>Loading your cart...</h2>
                </section>
                <Footer />
            </div>
        );
    }

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
                                        onRemove={() => removeFromCart(product.id)}
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
                                    {/* <Link to="/checkout" onClick={handleCheckout}>
                                        
                                    </Link> */}
                                    <a className="pest_btn" href="#" onClick={handleCheckout}>Proceed to Checkout</a>
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