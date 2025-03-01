import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import Search from "../components/searchBox";
import Newsletter from "../components/newsletter";
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import CurrencyConverter from "../components/CurrencyConverter";
import { Typography } from "@mui/material";
import SimilarProducts from "./similar-product";
import CartIcon from "../components/CartIcon";
import CartSidebar from "../components/CartSidebar";
import firebaseInstance from './Firebase Singleton Pattern/firebaseConfig';
import { doc, setDoc, getDoc, getDocs, collection, query, where, addDoc, deleteDoc } from 'firebase/firestore';
import FacebookComments from './facebook-comments';

const Product = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const MAX_ITEMS_PER_PRODUCT = 9999;
    const MAX_TOTAL_ITEMS = 9999;
    const currentUrl = window.location.href;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const addToCart = async (product) => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
            alert("Vui lòng đăng nhập trước khi mua hàng");
            navigate('/navigation'); // Chuyển hướng nếu không đăng nhập
        } else {
            const userEmail = localStorage.getItem('savedEmail');

            setCartItems((prevItems) => {
                const totalQuantity = prevItems.reduce((acc, item) => acc + item.quantity, 0);
                const existingItem = prevItems.find((item) => item.id === product.id);

                // Kiểm tra nếu tổng số lượng sản phẩm đã đạt giới hạn
                if (totalQuantity >= MAX_TOTAL_ITEMS) {
                    alert('Bạn chỉ có thể thêm tối đa 20 sản phẩm vào giỏ hàng.');
                    return prevItems;
                }

                // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
                if (existingItem) {
                    // Kiểm tra xem số lượng sản phẩm có vượt quá 5 hay không
                    if (existingItem.quantity >= MAX_ITEMS_PER_PRODUCT) {
                        alert('Số lượng sản phẩm này đã đạt tối đa (5).');
                        return prevItems;
                    }

                    // Tăng số lượng sản phẩm nếu chưa đạt tối đa
                    const updatedItems = prevItems.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    );

                    // Cập nhật Firestore với giỏ hàng đã cập nhật
                    const cartDocRef = doc(firebaseInstance.db, "carts", userEmail);
                    setDoc(cartDocRef, { items: updatedItems }, { merge: true }); // Cập nhật Firestore

                    return updatedItems; // Trả về giỏ hàng đã cập nhật
                } else {
                    // Thêm sản phẩm mới vào giỏ hàng
                    const newItem = { ...product, quantity: 1, userEmail };
                    const updatedItems = [...prevItems, newItem];

                    // Cập nhật Firestore với giỏ hàng đã cập nhật
                    const cartDocRef = doc(firebaseInstance.db, "carts", userEmail);
                    setDoc(cartDocRef, { items: updatedItems }, { merge: true }); // Cập nhật Firestore

                    return updatedItems; // Trả về giỏ hàng đã cập nhật
                }
            });
        }
    };
    const removeFromCart = async (id) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => item.id !== id);

            const userEmail = localStorage.getItem('savedEmail');
            const cartDocRef = doc(firebaseInstance.db, "carts", userEmail);
            setDoc(cartDocRef, { items: updatedItems }, { merge: true });

            return updatedItems;
        });
    };
    const handleQuantityChange = async (productId, newQuantity) => {
        const userEmail = localStorage.getItem('savedEmail');
        if (newQuantity < 1) {
            removeFromCart(productId); // Gọi hàm xóa
        } else if (newQuantity > MAX_ITEMS_PER_PRODUCT) {
            alert("Số lượng sản phẩm không được vượt quá 20.");
        } else {
            setCartItems((prevItems) => {
                const updatedItems = prevItems.map((item) =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                );

                // Cập nhật giỏ hàng vào Firestore
                const cartDocRef = doc(firebaseInstance.db, "carts", userEmail);
                setDoc(cartDocRef, { items: updatedItems }, { merge: true }); // Cập nhật Firestore

                return updatedItems; // Trả về giỏ hàng đã cập nhật
            });
        }
    };

    const location = useLocation();
    const product = location.state || {};
    // const prd = {
    //     id,
    //     name,
    //     price,
    //     image,
    //     image_L,
    //     description,
    //     categoryId,
    // }
    return (
        <div>
            <ScrollToTop />
            <NavBar></NavBar>
            <div>
                <section className="banner_area">
                    <div className="container">
                        <div className="banner_text">
                            <h3>Product Details</h3>
                            <ul>
                                <li>
                                    <Link to="/shop">Shop</Link>
                                </li>
                                <li>
                                    <Link to="/product-details">Product Details</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="product_details_area p_100">
                    <div className="container">
                        <div className="row product_d_price">
                            <div className="col-lg-6">
                                <div className="product_img">
                                    <img
                                        className="img-fluid"
                                        src={product.imageUrl}
                                        alt=""
                                        style={{ scale: '1.5', marginLeft: '70px', marginTop: '70px', borderRadius: '5px' }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="product_details_text">
                                    <h4>{product.name}</h4>
                                    <h5>
                                        Giá : <span>
                                            <strong><CurrencyConverter usdAmount={product.price} /></strong>
                                        </span>
                                    </h5>
                                    <div className="quantity_box">
                                        <label htmlFor="quantity">Số lượng :</label>
                                        <input type="text" placeholder={1} id="quantity" />
                                    </div>
                                    <a className="pink_more" href="" onClick={(e) => {
                                        e.preventDefault();
                                        // addToCart(product);
                                    }}>
                                        Thêm vào giỏ hàng
                                    </a>
                                </div>
                            </div>
                            <div className="container">
                                <CartIcon
                                    itemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                    onClick={toggleSidebar}
                                    recentItems={cartItems}
                                />
                                <CartSidebar
                                    cartItems={cartItems}
                                    isOpen={isSidebarOpen}
                                    onClose={toggleSidebar}
                                    onRemove={removeFromCart}
                                    onQuantityChange={handleQuantityChange}
                                />
                            </div>
                        </div>
                        <div className="product_tab_area">
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a
                                        className="nav-item nav-link active"
                                        id="nav-home-tab"
                                        data-toggle="tab"
                                        href="#nav-home"
                                        role="tab"
                                        aria-controls="nav-home"
                                        aria-selected="true"
                                    >
                                        Mô tả chung
                                    </a>
                                    <a
                                        className="nav-item nav-link"
                                        id="nav-contact-tab"
                                        data-toggle="tab"
                                        href="#nav-contact"
                                        role="tab"
                                        aria-controls="nav-contact"
                                        aria-selected="false"
                                    >
                                        Bình luận
                                    </a>

                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="nav-home"
                                    role="tabpanel"
                                    aria-labelledby="nav-home-tab">
                                    <Typography variant="body1" sx={{
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'none'
                                        }
                                    }}>
                                        {product.description.split('\n').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </Typography>

                                </div>

                                <div
                                    className="tab-pane fade"
                                    id="nav-contact"
                                    role="tabpanel"
                                    aria-labelledby="nav-contact-tab">
                                    <div style={{ marginTop: '20px' }}>
                                        <h3>Bình luận</h3>
                                        <FacebookComments currentUrl={currentUrl} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <SimilarProducts currentProductId={product.id} currentCategoryId={product.categoryId} />

            </div>
            <Footer></Footer>
        </div>
    );
}

export default Product