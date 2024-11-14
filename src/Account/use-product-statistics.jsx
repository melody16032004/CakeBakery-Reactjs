import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Account/firebaseConfig';

const useProductStatistics = () => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            // Thay đổi cú pháp để tương thích với Firebase v9
            const ordersSnapshot = await getDocs(collection(db, 'invoices'));
            const productStats = {};

            ordersSnapshot.forEach(doc => {
                const order = doc.data();

                // Duyệt qua danh sách sản phẩm trong từng đơn hàng
                order.items.forEach(item => {
                    const { productId, quantity } = item;

                    // Nếu productId đã có trong thống kê, cộng thêm số lượng
                    if (productStats[productId]) {
                        productStats[productId] += quantity;
                    } else {
                        // Nếu chưa có, khởi tạo với số lượng ban đầu
                        productStats[productId] = quantity;
                    }
                });
            });

            setStatistics(productStats);
        };

        fetchOrders();
    }, []);

    return statistics;
};

export default useProductStatistics;
