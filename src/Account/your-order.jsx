import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { Box, Typography, Paper, Container, CircularProgress, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Biểu tượng mở rộng
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; // Biểu tượng thu lại
import { Link } from 'react-router-dom';

// Styled component cho Background
const StyledContainer = styled(Container)({
    backgroundColor: '#f8f8f8',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

// Styled component cho Card
const StyledPaper = styled(Paper)({
    padding: '20px',
    borderRadius: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    marginBottom: '20px',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.02)',
    },
});

// Styled component cho thông tin ẩn
const HiddenInfo = styled(Box)(({ visible }) => ({
    display: visible ? 'block' : 'none',
    marginTop: '10px',
}));

// Styled component cho nút
const StyledIconButton = styled(IconButton)({
    marginLeft: '10px', // Khoảng cách giữa thông tin và nút
    color: '#ff4081',
});

const Order = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [customerEmail, setCustomerEmail] = useState(null);

    // State để quản lý hiển thị thông tin chi tiết
    const [visibleDetails, setVisibleDetails] = useState({});

    useEffect(() => {
        const storedEmail = localStorage.getItem('savedEmail');
        if (storedEmail) {
            setCustomerEmail(storedEmail);
        } else {
            setError('Không tìm thấy email trong localStorage.');
        }
    }, []);

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'invoices'));
                const invoicesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                const filteredInvoices = invoicesData.filter(invoice => invoice.email === customerEmail);
                setInvoices(filteredInvoices);
            } catch (err) {
                setError('Lỗi khi lấy dữ liệu từ Firestore.');
            } finally {
                setLoading(false);
            }
        };

        if (customerEmail) {
            fetchInvoices();
        }
    }, [customerEmail]);

    const handleToggleDetails = (id) => {
        setVisibleDetails((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '100px 0' }}><CircularProgress /></div>;
    if (error) return <div style={{ textAlign: 'center', padding: '100px 0' }}>{error}</div>;

    return (
        <>
            <NavBar />
            <section className="banner_area">
                <div className="container">
                    <div className="banner_text">
                        <h3>Chekout</h3>
                        <ul>
                            <li>
                                <Link to="/home">Trang chủ</Link>
                            </li>
                            <li>
                                <Link to="/order">Đơn hàng</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* --------------------------------------------------------- */}
            <StyledContainer sx={{ paddingTop: '100px', paddingBottom: '50px' }}>
                <Typography variant="h4" textAlign="center" gutterBottom>
                    Đơn hàng của {customerEmail}
                </Typography>

                {invoices.length === 0 ? (
                    <Typography variant="h6" textAlign="center" color="textSecondary">
                        Không có đơn hàng nào cho tài khoản này.
                    </Typography>
                ) : (
                    <Box>
                        {invoices.map((invoice) => (
                            <StyledPaper elevation={3} key={invoice.id}>
                                <Box display="flex" alignItems="center">
                                    <Box flexGrow={1}>
                                        <Typography variant="h6" gutterBottom>
                                            ID Đơn hàng: {invoice.id}
                                        </Typography>
                                        <Typography variant='body1' color='textSecondary'>Tổng cộng: <strong>${invoice.total}</strong></Typography>
                                        <Typography variant='body1' color='textSecondary'>Trạng thái: <strong>{invoice.status}</strong></Typography>
                                    </Box>
                                    {/* Nút Hiện/Ẩn chi tiết với icon */}
                                    <StyledIconButton onClick={() => handleToggleDetails(invoice.id)}>
                                        {visibleDetails[invoice.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </StyledIconButton>
                                </Box>

                                {/* Thông tin ẩn */}
                                <HiddenInfo visible={visibleDetails[invoice.id]} sx={{ padding: '10px 0' }}>
                                    <Typography variant='body1'>Địa chỉ: {invoice.address}</Typography>
                                    <Typography variant='body1'>Số điện thoại: {invoice.phone}</Typography>
                                    <Typography variant='subtitle1' mt={2} gutterBottom>Sản phẩm:</Typography>
                                    <Box component="ul" sx={{ paddingLeft: '20px' }}>
                                        {invoice.items.map((item, index) => (
                                            <li key={index} style={{ marginBottom: '10px' }}>
                                                Sản phẩm: <strong>{item.product}</strong>, Số lượng: <strong>{item.quantity}</strong>
                                            </li>
                                        ))}
                                    </Box>
                                </HiddenInfo>
                            </StyledPaper>
                        ))}
                    </Box>
                )}
            </StyledContainer>
            <Footer />
        </>
    );
};

export default Order;
