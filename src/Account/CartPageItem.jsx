// CartItem.js
import React from 'react';

const CartItem = ({ key, image, productName, price, quantity, onQuantityChange, onRemove }) => {
    return (
        <tr>
            <td>
                <img style={styles.customImg} src={image} alt={productName} />
            </td>
            <td>{productName}</td>
            <td>${parseFloat(price).toFixed(2)}</td>
            <td>
                <select className="product_select" value={quantity} onChange={onQuantityChange}>
                    {[...Array(5).keys()].map((num) => (
                        <option key={num} value={num + 1}>
                            {num + 1}
                        </option>
                    ))}
                </select>
            </td>
            <td>{`$${(parseFloat(price) * quantity).toFixed(2)}`}</td>
            <td>
                <button onClick={onRemove}>
                    <i className="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    );
};

const styles = {
    customImg: {
        scale: '0.7',
        borderRadius: '20px',
    }
}

export default CartItem;
