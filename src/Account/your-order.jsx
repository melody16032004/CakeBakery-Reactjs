import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; // Import cấu hình Firebase
import { collection, getDocs } from 'firebase/firestore'; // Import các hàm Firestore
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { Typography } from '@mui/material';

const Order = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [customerEmail, setCustomerEmail] = useState(null);

    // Lấy customerEmail từ localStorage
    useEffect(() => {
        const storedEmail = localStorage.getItem('savedEmail'); // Lấy email từ localStorage
        if (storedEmail) {
            setCustomerEmail(storedEmail);
        } else {
            setError('Không tìm thấy email trong localStorage.');
        }
    }, []);

    // Lấy dữ liệu invoices từ Firestore và lọc theo email
    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'invoices')); // Lấy toàn bộ invoices
                const invoicesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Lọc các invoices theo email
                const filteredInvoices = invoicesData.filter(invoice => invoice.email === customerEmail);

                setInvoices(filteredInvoices);
            } catch (err) {
                setError('Lỗi khi lấy dữ liệu từ Firestore.');
            } finally {
                setLoading(false);
            }
        };

        if (customerEmail) {
            fetchInvoices(); // Chỉ thực hiện truy vấn nếu có email
        }
    }, [customerEmail]);

    if (loading) return <div>Đang tải đơn hàng...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <NavBar />
            <div style={{ padding: '150px' }}>

                <h1>Đơn hàng của {customerEmail}</h1>

                {invoices.length === 0 ? (
                    <p>Không có đơn hàng nào cho tài khoản này.</p>
                ) : (
                    <ul>
                        {invoices.map((invoice) => (
                            <li key={invoice.id}>
                                <h3>ID Đơn hàng: {invoice.id}</h3>
                                <Typography variant='body2' color='textPrimary'>Trạng thái: {invoice.status}</Typography>
                                <Typography variant='body2' color='textPrimary'>Tổng cộng: ${invoice.total}</Typography>
                                <Typography variant='body2' color='textPrimary'>Địa chỉ: {invoice.address}</Typography>
                                <Typography variant='body2' color='textPrimary'>Số điện thoại: {invoice.phone}</Typography>
                                <h4>Sản phẩm:</h4>
                                <ul>
                                    {invoice.items.map((item, index) => (
                                        <li key={index}>
                                            Sản phẩm: {item.product}, Số lượng: {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}

            </div>
            <Footer />
        </>
    );
};

export default Order;
