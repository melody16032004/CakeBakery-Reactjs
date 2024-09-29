import React, { useState } from 'react';

const CartIcon = ({ itemCount, onClick, recentItems }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={styles.cartIconContainer}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <i className="fas fa-shopping-cart" style={styles.icon}></i>
            {itemCount > 0 && (
                <span style={styles.itemCount}>{itemCount}</span>
            )}
            {isHovered && recentItems.length > 0 && (
                <div style={styles.dropdown}>
                    <h4 style={styles.dropdownTitle}>Sản phẩm đã thêm</h4>
                    <ul style={styles.dropdownList}>
                        {recentItems.slice(-3).map((item, index) => (
                            <li key={index} style={styles.dropdownItem}>
                                {item.name} - {item.quantity} Each
                            </li>
                        ))}
                    </ul>
                    <button style={styles.viewCartButton}>Xem giỏ hàng</button>
                </div>
            )}
        </div>
    );
};

const styles = {
    cartIconContainer: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#f195b2',
        padding: '15px',
        borderRadius: '50%',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        zIndex: 1000,
    },
    icon: {
        fontSize: '24px',
        color: 'white',
    },
    itemCount: {
        position: 'absolute',
        top: '-5px',
        right: '-10px',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        padding: '0px 8px',
        fontSize: '12px',
    },
    dropdown: {
        position: 'absolute',
        bottom: '60px',
        right: '0',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        padding: '10px',
        width: '200px',
        zIndex: 1000,
    },
    dropdownTitle: {
        margin: '0 0 10px',
        fontSize: '14px',
        fontWeight: 'bold',
    },
    dropdownList: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    dropdownItem: {
        marginBottom: '5px',
        fontSize: '12px',
    },
    viewCartButton: {
        marginTop: '10px',
        padding: '5px 10px',
        backgroundColor: '#f195b2',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default CartIcon;
