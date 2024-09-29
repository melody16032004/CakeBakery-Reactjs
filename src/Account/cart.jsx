import React from 'react';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id}>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity:
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    min="1"
                                />
                            </p>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                    <h3>Total Price: ${totalPrice}</h3>
                </div>
            )}
        </div>
    );
};

export default Cart;
