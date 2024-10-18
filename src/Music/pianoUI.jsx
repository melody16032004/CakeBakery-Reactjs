import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import Search from "../components/searchBox";
import Newsletter from "../components/newsletter";

import CartIcon from '../components/CartIcon';
import CartSidebar from '../components/CartSidebar';
import "../index.css";
import ProductList from '../Account/ProductList';
import { auth, db } from '../Account/firebaseConfig';
import { doc, setDoc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import "../index.css";
import NavigateLogin from '../components/navigate-login';
import CircularProgress from '@mui/material/CircularProgress';
import Card from './card';

function Shop() {
    const MAX_TOTAL_ITEMS = 20;
    const MAX_ITEMS_PER_PRODUCT = 5;
    const [cartItems, setCartItems] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Số lượng sản phẩm hiển thị mỗi trang
    const [sortOption, setSortOption] = useState('default');
    const [filterCategory, setFilterCategory] = useState('all');
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

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

        const fetchProducts = async () => {
            try {
                setLoading(true);

                const productsCollection = collection(db, 'music-products'); // 'products' is your collection name
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productsList);

                setLoading(false);
            } catch (error) {
                setLoading(false);
            }


        };

        fetchProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Cập nhật localStorage
    }, [cartItems]);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
            return;
        } else {
            fetchCartItems();
        }
        // fetchCartItems();
    }, []);

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
                    const cartDocRef = doc(db, "carts", userEmail);
                    setDoc(cartDocRef, { items: updatedItems }, { merge: true }); // Cập nhật Firestore

                    return updatedItems; // Trả về giỏ hàng đã cập nhật
                } else {
                    // Thêm sản phẩm mới vào giỏ hàng
                    const newItem = { ...product, quantity: 1, userEmail };
                    const updatedItems = [...prevItems, newItem];

                    // Cập nhật Firestore với giỏ hàng đã cập nhật
                    const cartDocRef = doc(db, "carts", userEmail);
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
            const cartDocRef = doc(db, "carts", userEmail);
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

    // Hàm xử lý khi người dùng chọn sắp xếp
    const handleSortChange = (event) => {
        const selectedOption = event.target.value;
        setSortOption(selectedOption);
        // Thực hiện các hành động sắp xếp dựa trên selectedOption
    };
    // Khôi phục trạng thái từ localStorage khi component render
    useEffect(() => {
        const savedSortOption = localStorage.getItem('sortOption');
        if (savedSortOption) {
            setSortOption(savedSortOption);
        }
    }, []);

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
        setCurrentPage(1); // Đặt lại trang về 1 khi thay đổi lọc
    };
    // Lọc và sắp xếp sản phẩm
    const filteredProducts = products.filter(product =>
        filterCategory === 'all' || product.category === filterCategory
    );
    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOption === 'priceAsc') {
            return a.price - b.price;  // Sắp xếp theo giá tăng dần
        } else if (sortOption === 'priceDesc') {
            return b.price - a.price;  // Sắp xếp theo giá giảm dần
        } else if (sortOption === 'nameAsc') {
            return a.name.localeCompare(b.name);  // Sắp xếp theo tên A-Z
        } else if (sortOption === 'nameDesc') {
            return b.name.localeCompare(a.name);  // Sắp xếp theo tên Z-A
        }
        return 0;  // Giữ nguyên thứ tự mặc định
    });
    const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const productList = paginatedProducts.map(product => (
        <Card
            product={product}
            addToCart={addToCart}
        />
    ));
    // 

    return (
        <div>
            <div>
                <section className="product_area p_100">
                    <div className="container">
                        <div className="">

                            <div className="col-lg-9">
                                <div className="row m0 product_task_bar">
                                    <div className="product_task_inner">
                                        <div className="float-left">
                                            <span>Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, products.length)} of {products.length} results</span>
                                        </div>
                                        <div className="float-right">
                                            <h4>Sort by :</h4>
                                            <select className="short" onChange={handleSortChange} value={sortOption}>
                                                <option value="default">Default</option>
                                                <option value="priceAsc">Price: Low to High</option>
                                                <option value="priceDesc">Price: High to Low</option>
                                                <option value="nameAsc">Name: A to Z</option>
                                                <option value="nameDesc">Name: Z to A</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row product_item_inner">
                                    {/* Show loading spinner or message */}
                                    {loading ? (
                                        <div style={styles.centerContent}>
                                            {/* <p>Loading products...</p> */}
                                            <CircularProgress />
                                        </div>
                                    ) : (
                                        paginatedProducts.length > 0 ? (
                                            productList
                                        ) : (
                                            <div style={styles.centerContent}>No products available</div>
                                        )
                                    )}

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
                                    {/* --------------------------------------- */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
}

const styles = {
    centerContent: {
        marginLeft: '45%',
    }
}

export default Shop