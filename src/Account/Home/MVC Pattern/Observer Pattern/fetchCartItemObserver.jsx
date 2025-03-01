import { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import firebaseInstance from './Firebase Singleton Pattern/firebaseConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const userEmail = localStorage.getItem('savedEmail');
            if (userEmail) {
                const cartDocRef = doc(firebaseInstance.db, "carts", userEmail);
                const cartSnapshot = await getDoc(cartDocRef);
                if (cartSnapshot.exists()) {
                    setCartItems(cartSnapshot.data().items || []);
                } else {
                    await setDoc(cartDocRef, { items: [] });
                }
            }
        };
        fetchCartItems();
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
