import React, { useState, useEffect } from 'react';
import NavBar from "../components/navbar";
import Footer from "../components/footer";
// import CustomSlider from "../components/slider";
import ProductList from './ProductList';
// import Cart from './cart';
import "../index.css";
import CartIcon from '../components/CartIcon';
import CartSidebar from '../components/CartSidebar';

function Home() {

    const MAX_ITEMS_IN_CART = 20;
    const [cartItems, setCartItems] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        console.log('Cart from localStorage:', storedCart);  // Kiểm tra nội dung lấy ra từ localStorage
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);


    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Lưu trữ giỏ hàng dưới dạng chuỗi JSON
        }
    }, [cartItems]);

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else if (newQuantity > 20) {
            // Nếu số lượng mới lớn hơn 10, không thực hiện thay đổi
            alert("Số lượng sản phẩm không được vượt quá 20.");
        } else
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
    };
    const handleCheckout = () => {
        alert('Proceeding to checkout');
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div>
            <NavBar />
            <div className="container">
                <CartIcon
                    itemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    onClick={toggleSidebar}
                    recentItems={cartItems} />

                <CartSidebar
                    cartItems={cartItems}
                    isOpen={isSidebarOpen}
                    onClose={toggleSidebar}
                    onRemove={removeFromCart}
                    onQuantityChange={handleQuantityChange}
                    onCheckout={handleCheckout} />
            </div>

            <Footer />

        </div>
    );
}

export default Home