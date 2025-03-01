import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import firebaseInstance from "../../../Firebase Singleton Pattern/firebaseConfig";

const useProductsObserver = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const productsQuery = query(
            collection(firebaseInstance.db, "products"),
            orderBy("sold", "desc") // Sắp xếp theo số lượng bán nhiều nhất
        );

        const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
            const productsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsList);
            setLoading(false);
        });

        return () => unsubscribe(); // Hủy đăng ký khi component unmount
    }, []);

    return { products, loading };
};

export default useProductsObserver;