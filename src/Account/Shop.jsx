import React, { useState, useEffect } from 'react';
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import Search from "../components/searchBox";
import Newsletter from "../components/newsletter";
import Card from "../components/card";
import CartIcon from '../components/CartIcon';
import CartSidebar from '../components/CartSidebar';
import "../index.css";
import ProductList from './ProductList';
import { auth, db } from './firebaseConfig';
import { doc, setDoc, getDoc, collection, query, where } from 'firebase/firestore';

function Shop() {
    const MAX_ITEMS_IN_CART = 20;
    const [cartItems, setCartItems] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Số lượng sản phẩm hiển thị mỗi trang
    const products = [
        { id: 0, name: "Cupcake of Vanela", price: "20", image: "img/cake-feature/c-feature-1.jpg", image_L: "img/product/product-details-1.jpg" },
        { id: 1, name: "Cupcake of Matcha", price: "25.5", image: "img/cake-feature/c-feature-2.jpg", image_L: "img/product/product-details-2.jpg" },
        { id: 2, name: "Chocolate Cake", price: "23.45", image: "img/cake-feature/c-feature-3.jpg", image_L: "img/product/product-details-3.jpg" },
        { id: 3, name: "Cherry Cupcake", price: "22", image: "img/cake-feature/c-feature-4.jpg", image_L: "img/cake-feature/c-feature-4.jpg" },
        { id: 4, name: "Double Chocolate Pie", price: "8.99", image: "img/cake-feature/c-feature-5.jpg", image_L: "img/product/product-details-5.jpg" },
        { id: 5, name: "Zabaglione Cake", price: "52.99", image: "img/cake-feature/c-feature-6.jpg", image_L: "img/product/product-details-6.jpg" },
        { id: 6, name: "Velvet Cake", price: "35.25", image: "img/cake-feature/c-feature-7.jpg", image_L: "img/product/product-details-7.jpg" },
        { id: 7, name: "Cherry Cupcake Vanila", price: "23", image: "img/cake-feature/c-feature-8.jpg", image_L: "img/product/product-details-8.jpg" },
        { id: 8, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
        // { id: 9, name: "Crumby Cupcake", price: "25", image: "img/cake-feature/c-feature-9.jpg", image_L: "img/product/product-details-9.jpg" },
    ];

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
    };
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Cập nhật localStorage
    }, [cartItems]);

    useEffect(() => {

        fetchCartItems();
    }, []);

    const addToCart = async (product) => {
        const userEmail = localStorage.getItem('savedEmail');

        setCartItems((prevItems) => {
            const totalQuantity = prevItems.reduce((acc, item) => acc + item.quantity, 0);

            if (totalQuantity >= MAX_ITEMS_IN_CART) {
                alert('Bạn chỉ có thể thêm tối đa 20 sản phẩm vào giỏ hàng.');
                return prevItems;
            }

            const existingItem = prevItems.find((item) => item.id === product.id);

            if (existingItem && totalQuantity + 1 > MAX_ITEMS_IN_CART) {
                alert('Số lượng sản phẩm trong giỏ đã đạt tối đa.');
                return prevItems;
            }

            if (existingItem) {
                // Tăng số lượng sản phẩm nếu đã tồn tại
                const updatedItems = prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );

                // Cập nhật Firestore
                const cartDocRef = doc(db, "carts", userEmail);
                setDoc(cartDocRef, { items: updatedItems }, { merge: true }); // Cập nhật Firestore

                return updatedItems; // Trả về giỏ hàng đã cập nhật
            } else {
                const newItem = { ...product, quantity: 1, userEmail };
                const updatedItems = [...prevItems, newItem];

                // Cập nhật Firestore
                const cartDocRef = doc(db, "carts", userEmail);
                setDoc(cartDocRef, { items: updatedItems }, { merge: true }); // Cập nhật Firestore

                return updatedItems; // Trả về giỏ hàng đã cập nhật
            }
        });
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

    const handleQuantityChange = async (productId, newQuantity) => {
        const userEmail = localStorage.getItem('savedEmail');
        if (newQuantity < 1) {
            removeFromCart(productId); // Gọi hàm xóa
        } else if (newQuantity > MAX_ITEMS_IN_CART) {
            alert("Số lượng sản phẩm không được vượt quá 20.");
        } else {
            setCartItems((prevItems) => {
                const updatedItems = prevItems.map((item) =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                );

                // Cập nhật giỏ hàng vào Firestore
                const cartDocRef = doc(db, "carts", userEmail);
                setDoc(cartDocRef, { items: updatedItems }, { merge: true }); // Cập nhật Firestore

                return updatedItems; // Trả về giỏ hàng đã cập nhật
            });
        }
    };
    const handleCheckout = () => {
        setLoading(true);  // Kích hoạt trạng thái loading
        setTimeout(() => {
            setLoading(false);  // Tắt trạng thái loading sau 3 giây
            alert('Proceeding to checkout');
        }, 3000);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedProducts = products.slice(startIndex, endIndex);



    const productList = paginatedProducts.map(product => (
        <Card
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            image_L={product.image_L}
            addToCart={addToCart}
        />
    ));

    const totalPages = Math.ceil(products.length / itemsPerPage); // Tổng số trang

    const getPaginationItems = () => {
        const pages = [];
        const maxVisiblePages = 3; // Số trang tối đa hiển thị

        // Tính toán trang bắt đầu và kết thúc
        let startPage, endPage;

        if (currentPage <= 3) {
            startPage = 1;
            endPage = Math.min(maxVisiblePages, totalPages);
        } else if (currentPage >= totalPages - 2) {
            startPage = Math.max(totalPages - maxVisiblePages + 1, 1);
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        // Thêm các trang vào mảng pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Thêm dấu ba chấm nếu cần
        if (startPage > 1) {
            pages.unshift('...');
            pages.unshift(1);
        }
        if (endPage < totalPages) {
            pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div>
            <NavBar />
            <div>
                <section className="banner_area">
                    <div className="container">
                        <div className="banner_text">
                            <h3>Shop</h3>
                            <ul>
                                <li>
                                    <Link to="/home">Home</Link>
                                </li>
                                <li>
                                    <Link to="/shop">Shop</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="product_area p_100">
                    <div className="container">
                        <div className="row product_inner_row">
                            <div className="col-lg-9">
                                <div className="row m0 product_task_bar">
                                    <div className="product_task_inner">
                                        <div className="float-left">
                                            <span>Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, products.length)} of {products.length} results</span>
                                        </div>
                                        <div className="float-right">
                                            <h4>Sort by :</h4>
                                            <select className="short">
                                                <option data-display="Default">A to Z</option>
                                                <option value={1}>Default</option>
                                                <option value={2}>Default</option>
                                                <option value={4}>Default</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row product_item_inner">
                                    {productList}
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
                                {/* ------------------------------------------- */}
                                <div className="product_pagination">
                                    {/* {totalPages > 1 ? (
                                        <div className="left_btn">
                                            <a href="#" onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}>
                                                <i className="lnr lnr-arrow-left" /> New posts
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="left_btn"></div>
                                    )} */}
                                    {/* Ẩn nút New posts nếu đang ở trang đầu */}
                                    {currentPage > 1 ? (
                                        <div className="left_btn">
                                            <a href="#" onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}>
                                                <i className="lnr lnr-arrow-left" /> New posts
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="left_btn"></div>
                                    )}

                                    <div className="middle_list">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                {getPaginationItems().map((item, index) => (
                                                    <li key={index} className={`page-item ${item === currentPage ? 'active' : ''}`}>
                                                        {item === '...' ? (
                                                            <span className="page-link">...</span>
                                                        ) : (
                                                            <a className="page-link" onClick={() => handlePageChange(item)}>
                                                                {item}
                                                            </a>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    </div>
                                    {/* Ẩn nút Older posts nếu đang ở trang cuối */}
                                    {currentPage < totalPages ? (
                                        <div className="right_btn">
                                            <a href="#" onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}>
                                                Older posts <i className="lnr lnr-arrow-right" />
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="right_btn"></div>
                                    )}
                                    {/* {totalPages > 1 && (
                                        <div className="right_btn">
                                            <a href="#" onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}>
                                                Older posts <i className="lnr lnr-arrow-right" />
                                            </a>
                                        </div>
                                    )} */}
                                    {/* --------------------------------------- */}
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="product_left_sidebar">
                                    <aside className="left_sidebar search_widget">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Enter Search Keywords" />
                                            <div className="input-group-append">
                                                <button className="btn" type="button">
                                                    <i className="icon icon-Search" />
                                                </button>
                                            </div>
                                        </div>
                                    </aside>
                                    <aside className="left_sidebar p_catgories_widget">
                                        <div className="p_w_title">
                                            <h3>Product Categories</h3>
                                        </div>
                                        <ul className="list_style">
                                            <li><a href="#">Cupcake (17)</a></li>
                                            <li><a href="#">Chocolate (15)</a></li>
                                            <li><a href="#">Celebration (14)</a></li>
                                            <li><a href="#">Wedding Cake (8)</a></li>
                                            <li><a href="#">Desserts (11)</a></li>
                                        </ul>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Newsletter />
            </div>
            <Footer />
        </div>
        // <div>
        //     <NavBar></NavBar>

        //     <div>
        //         <section className="banner_area">
        //             <div className="container">
        //                 <div className="banner_text">
        //                     <h3>Shop</h3>
        //                     <ul>
        //                         <li>
        //                             <Link to="/home">Home</Link>
        //                         </li>
        //                         <li>
        //                             <Link to="/shop">Shop</Link>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </section>

        //         {/*  */}

        //         <section className="product_area p_100">
        //             <div className="container">
        //                 <div className="row product_inner_row">
        //                     <div className="col-lg-9">
        //                         <div className="row m0 product_task_bar">
        //                             <div className="product_task_inner">
        //                                 <div className="float-left">
        //                                     <span>Showing 1 - 10 of 55 results</span>
        //                                 </div>
        //                                 <div className="float-right">
        //                                     <h4>Sort by :</h4>
        //                                     <select className="short">
        //                                         <option data-display="Default">A to Z</option>
        //                                         <option value={1}>Default</option>
        //                                         <option value={2}>Default</option>
        //                                         <option value={4}>Default</option>
        //                                     </select>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <div className="row product_item_inner">
        //                             {productList}
        //                             <div className="container">

        //                                 <CartIcon
        //                                     itemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        //                                     onClick={toggleSidebar}
        //                                     recentItems={cartItems} />

        //                                 <CartSidebar
        //                                     cartItems={cartItems}
        //                                     isOpen={isSidebarOpen}
        //                                     onClose={toggleSidebar}
        //                                     onRemove={removeFromCart}
        //                                     onQuantityChange={handleQuantityChange} />

        //                             </div>
        //                         </div>
        //                         <div className="product_pagination">
        //                             <div className="left_btn">
        //                                 <a href="#">
        //                                     <i className="lnr lnr-arrow-left" /> New posts
        //                                 </a>
        //                             </div>
        //                             <div className="middle_list">
        //                                 <nav aria-label="Page navigation example">
        //                                     <ul className="pagination">
        //                                         <li className="page-item active">
        //                                             <a className="page-link" href="#">
        //                                                 1
        //                                             </a>
        //                                         </li>
        //                                         <li className="page-item">
        //                                             <a className="page-link" href="#">
        //                                                 2
        //                                             </a>
        //                                         </li>
        //                                         <li className="page-item">
        //                                             <a className="page-link" href="#">
        //                                                 3
        //                                             </a>
        //                                         </li>
        //                                         <li className="page-item">
        //                                             <a className="page-link" href="#">
        //                                                 ...
        //                                             </a>
        //                                         </li>
        //                                         <li className="page-item">
        //                                             <a className="page-link" href="#">
        //                                                 12
        //                                             </a>
        //                                         </li>
        //                                     </ul>
        //                                 </nav>
        //                             </div>
        //                             <div className="right_btn">
        //                                 <a href="#">
        //                                     Older posts <i className="lnr lnr-arrow-right" />
        //                                 </a>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div className="col-lg-3">
        //                         <div className="product_left_sidebar">
        //                             <aside className="left_sidebar search_widget">
        //                                 <div className="input-group">
        //                                     <input
        //                                         type="text"
        //                                         className="form-control"
        //                                         placeholder="Enter Search Keywords"
        //                                     />
        //                                     <div className="input-group-append">
        //                                         <button className="btn" type="button">
        //                                             <i className="icon icon-Search" />
        //                                         </button>
        //                                     </div>
        //                                 </div>
        //                             </aside>
        //                             <aside className="left_sidebar p_catgories_widget">
        //                                 <div className="p_w_title">
        //                                     <h3>Product Categories</h3>
        //                                 </div>
        //                                 <ul className="list_style">
        //                                     <li>
        //                                         <a href="#">Cupcake (17)</a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="#">Chocolate (15)</a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="#">Celebration (14)</a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="#">Wedding Cake (8)</a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="#">Desserts (11)</a>
        //                                     </li>
        //                                 </ul>
        //                             </aside>

        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </section>

        //         {/*  */}

        //         <Newsletter></Newsletter>
        //     </div>
        //     <Footer></Footer>
        // </div>
    );
}

export default Shop