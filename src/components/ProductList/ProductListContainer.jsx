import React, { useState, useEffect } from 'react';
import firebaseInstance from '../../Account/Firebase Singleton Pattern/firebaseConfig';
import { collection, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import ProductListView from './ProductListView';
import { productObserver } from './ProductObserver';

const ProductListContainer = ({ setSelectedPage }) => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);// Trạng thái loading

    // Lấy danh sách sản phẩm
    useEffect(() => {
        setLoading(true);
        const q = query(collection(firebaseInstance.db, 'products'), orderBy('sold', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsData);
            productObserver.notify(productsData); // Thông báo cho tất cả observers
            setLoading(false); // Dữ liệu đã tải xong
        }, (error) => {
            console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            setLoading(false); // Ngừng loading nếu có lỗi
        });

        return () => unsubscribe();
    }, []);

    // Xóa sản phẩm
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(firebaseInstance.db, 'products', id));
            alert('Sản phẩm đã được xóa thành công!');
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            alert('Đã xảy ra lỗi khi xóa sản phẩm.');
        }
    };

    // Xóa nhiều sản phẩm
    const handleDeleteSelected = async () => {
        try {
            for (const id of selectedProducts) {
                await deleteDoc(doc(firebaseInstance.db, 'products', id));
            }
            alert('Các sản phẩm đã được xóa thành công!');
            setSelectedProducts([]);
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            alert('Đã xảy ra lỗi khi xóa sản phẩm.');
        }
    };

    // Chọn/bỏ chọn sản phẩm
    const handleSelectProduct = (id) => {
        setSelectedProducts(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <ProductListView
            products={products}
            selectedProducts={selectedProducts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedPage={setSelectedPage}
            handleDelete={handleDelete}
            handleDeleteSelected={handleDeleteSelected}
            handleSelectProduct={handleSelectProduct}
            loading={loading}
        />
    );
};

export default ProductListContainer;
