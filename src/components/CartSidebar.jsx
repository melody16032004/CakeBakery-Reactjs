import React, { useState, useEffect, useRef } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ cartItems, onClose, isOpen, onRemove, onQuantityChange }) => {
    const [isScrollable, setIsScrollable] = useState(false);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const navigate = useNavigate();
    const itemListRef = useRef(null);

    useEffect(() => {
        const checkScrollable = () => {
            const list = itemListRef.current;
            if (list && list.scrollHeight > list.clientHeight) {
                setIsScrollable(true);
            } else {
                setIsScrollable(false);
            }
        };

        checkScrollable();
        window.addEventListener('resize', checkScrollable);

        return () => {
            window.removeEventListener('resize', checkScrollable);
        };
    }, [cartItems]);

    const handleClick = () => {
        navigate('/cart', { replace: true });
    };

    // Kiểm tra xem đã cuộn đến cuối danh sách chưa
    const handleScroll = () => {
        const list = itemListRef.current;
        if (list.scrollTop + list.clientHeight >= list.scrollHeight - 5) {
            setIsScrolledToBottom(true);
        } else {
            setIsScrolledToBottom(false);
        }
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = () => {
        // Add your checkout logic here
        alert("Proceeding to checkout!");
        // You can also redirect to a checkout page or handle payment logic
    };
    const handleInputChange = (e, itemId) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            onQuantityChange(itemId, value);
        }
    };
    return (
        <div
            style={{
                ...styles.sidebarContainer,
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            }}
        >
            <div style={styles.sidebar}>
                <button className='closebtn' style={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <h2>Your Cart</h2>
                {
                    cartItems.length === 0 ? (
                        <p className='noted' style={styles.noted}>Your cart is empty</p>) : (
                        <>

                            <div
                                style={styles.itemListContainer}
                                ref={itemListRef}
                                onScroll={handleScroll}
                            >
                                <ul style={styles.itemList}>
                                    {cartItems.map((item) => (
                                        <li key={item.id} style={styles.item}>
                                            <div style={styles.itemDetails}>
                                                <span className='namePro'>{item.name}</span>

                                                <div style={styles.qtyContainer}>
                                                    <button className='changeQty'
                                                        style={styles.qtyButton}
                                                        onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                                                    // disabled={item.quantity > 10}
                                                    >
                                                        -
                                                    </button>
                                                    {/* <span>Qty: {item.quantity}</span> */}
                                                    <input className='inputQty'
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleInputChange(e, item.id)}
                                                        style={styles.qtyInput}
                                                        min="1"
                                                    />
                                                    <button className='changeQty'
                                                        style={styles.qtyButton}
                                                        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                            </div>
                                            <div className='subline'>
                                                <span className='pricePro' style={styles.price}>Price: ${item.price * item.quantity}</span>
                                                <button
                                                    className="remove-btn"
                                                    onClick={() => onRemove(item.id)}>
                                                    <i className="fas fa-trash"></i> {/* Icon remove */}
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </div>

                        </>
                    )
                }
                {isScrollable && !isScrolledToBottom && (
                    <div style={styles.scrollArrow}>
                        <i className="fas fa-arrow-down"></i>
                    </div>
                )}
            </div>
            {cartItems.length > 0 && (
                <div style={styles.checkoutButtonContainer}>

                    <div style={styles.totalContainer}>
                        <button className='pest_btn' style={styles.checkoutButton} onClick={handleClick}>
                            {/* <Link to="/cart">Move to Cart Page</Link> */}
                            Move to Cart Page
                        </button>
                    </div>
                </div>

            )}
        </div>
    );
};

const styles = {
    noted: {
        color: '#ccc',
        fontSize: '15px',
    },

    sidebarContainer: {
        position: 'fixed',
        top: 0,
        right: '0px',
        width: '400px',
        height: '100%',
        backgroundColor: '#fff',
        boxShadow: '-2px 0px 5px rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.3s ease-in-out', // Smooth animation
        transform: 'translateX(0)',
        zIndex: 1000,
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
    },
    sidebar: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    closeButton: {
        border: 'none',
        backgroundColor: '#fff',
        fontSize: '36px',
        color: 'black',
        position: 'absolute', // Adjust position of the close button
        top: '0px',
        right: '360px',
        width: '15px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
    },
    itemListContainer: {
        flexGrow: 1, // Phần này chiếm toàn bộ không gian còn lại
        overflowY: 'scroll', // Cuộn dọc nếu có quá nhiều sản phẩm
        marginBottom: '10px',
        maxHeight: 'calc(100vh - 250px)',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    },
    itemList: {
        listStyleType: 'none',
        padding: 0,
    },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: '10px',
        padding: '10px 0',
        borderBottom: '1px solid #ccc',
        flexDirection: 'column'
    },
    itemDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flex: 1,
        // whiteSpace: 'nowrap',
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
        // maxWidth: '380px',

    },
    qtyAndPriceContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    qtyContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // margin: '0 30px',

    },
    qtyButton: {
        padding: '0px 10px',
        fontsize: '30px',
        backgroundcolor: '#b8b6b6',
        color: 'white',
        border: 'none',
        borderradius: '5px',
        cursor: 'pointer',
        margin: '0px 5px',
    },
    price: {
        color: '#f195b2',
        fontWeight: 'bold',
    },
    scrollArrow: {
        position: 'absolute',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '140px',
        left: '50%',
        // transform: 'translateX(-50%)',
        backgroundColor: '#fff',
        borderRadius: '50%',
        padding: '5px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)',
        cursor: 'pointer',
        zIndex: 1001,
    },
    totalContainer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    checkoutButtonContainer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%', // Kích thước chiều rộng giống với sidebar
        backgroundColor: '#fff',
        boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.5)',
        padding: '10px',
        textAlign: 'center',
    },

    checkoutButton: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f195b2',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
};

export default CartSidebar;
