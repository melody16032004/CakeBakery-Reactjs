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



    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const totalQuantity = prevItems.reduce((acc, item) => acc + item.quantity, 0);

            // Kiểm tra nếu tổng số lượng sản phẩm đã đạt đến giới hạn
            if (totalQuantity >= MAX_ITEMS_IN_CART) {
                alert('Bạn chỉ có thể thêm tối đa 20 sản phẩm vào giỏ hàng.');
                return prevItems;  // Không thêm sản phẩm mới
            }

            const existingItem = prevItems.find((item) => item.id === product.id);

            // Kiểm tra nếu số lượng thêm vào sẽ vượt quá giới hạn
            if (existingItem && totalQuantity + 1 > MAX_ITEMS_IN_CART) {
                alert('Số lượng sản phẩm trong giỏ đã đạt tối đa.');
                return prevItems;
            }

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };
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
                <h1>Shopping Cart</h1>


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
                    onCheckout={handleCheckout}
                />

                <ProductList addToCart={addToCart} />
            </div>

            <Footer />

        </div>
    );
}

export default Home