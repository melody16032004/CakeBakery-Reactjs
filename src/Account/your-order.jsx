import React, { useEffect, useState } from 'react';
import firebaseInstance from './Firebase Singleton Pattern/firebaseConfig';
import { collection, getDocs, addDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { Box, Typography, Paper, Container, CircularProgress, TextField, Button, Fab } from '@mui/material';
import { Modal, Autocomplete } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { styled } from '@mui/system';
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

const Order = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [customerEmail, setCustomerEmail] = useState(null);
    const [feedback, setFeedback] = useState(''); // State để lưu feedback của người dùng
    const [feedbacks, setFeedbacks] = useState({});
    const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState({}); // Kiểm tra feedback đã được gửi chưa
    const [visibleDetails, setVisibleDetails] = useState({});


    const [open, setOpen] = useState(false);
    // const [feedback, setFeedback] = useState('');
    // const [username, setUsername] = useState('');
    const [tags, setTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [rating, setRating] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        const storedEmail = localStorage.getItem('savedEmail');
        if (storedEmail) {
            setCustomerEmail(storedEmail);
        } else {
            setError('Không tìm thấy email trong localStorage.');
        }

        // Lấy trạng thái feedback từ localStorage
        const storedFeedbackStatus = JSON.parse(localStorage.getItem('feedbackStatus')) || {};
        setIsFeedbackSubmitted(storedFeedbackStatus);
    }, []);

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            try {
                const invoicesQuery = query(
                    collection(firebaseInstance.db, 'invoices'),
                    orderBy('createdAt', 'desc') // Sắp xếp từ mới nhất đến cũ nhất
                );
                const querySnapshot = await getDocs(invoicesQuery);

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

    // Hàm xử lý khi người dùng nhập feedback
    const handleFeedbackChange = (id, value) => {
        setFeedbacks(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    // Hàm gửi feedback cho từng đơn hàng
    const handleFeedbackSubmit = async (id) => {
        const feedback = feedbacks[id];
        if (feedback && rating) {
            try {
                await updateDoc(doc(firebaseInstance.db, 'invoices', id), { feedback });
                await updateDoc(doc(firebaseInstance.db, 'invoices', id), { rating });
                alert('Feedback đã được gửi thành công!');

                // Cập nhật trạng thái feedback đã gửi
                const newFeedbackStatus = { ...isFeedbackSubmitted, [id]: true };
                setIsFeedbackSubmitted(newFeedbackStatus);

                // Lưu trạng thái feedback vào localStorage
                localStorage.setItem('feedbackStatus', JSON.stringify(newFeedbackStatus));
                handleClose();
                setRating(0);
            } catch (error) {
                console.error('Lỗi khi cập nhật feedback:', error);
            }
        } else {
            alert('Vui lòng nhập feedback và đánh giá trước khi gửi!');
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '100px 0' }}><CircularProgress /></div>;
    if (error) return <div style={{ textAlign: 'center', padding: '100px 0' }}>{error}</div>;

    return (
        <>
            <NavBar />
            <section className="banner_area">
                <div className="container">
                    <div className="banner_text">
                        <h3>Checkout</h3>
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

            <StyledContainer sx={{ paddingTop: '100px', paddingBottom: '50px' }}>
                <Typography variant="h4" textAlign="center" gutterBottom>
                    Đơn hàng của bạn
                </Typography>

                {invoices.length === 0 ? (
                    <Typography variant="h6" textAlign="center" color="textSecondary">
                        Không có đơn hàng nào cho tài khoản này.
                    </Typography>
                ) : (
                    <Box>
                        {invoices.map((invoice) => (
                            <StyledPaper elevation={3} key={invoice.id} sx={{
                                margin: "20px 250px",
                            }}>
                                <Box display="flex" alignItems="center">
                                    <Box flexGrow={1}>
                                        <Typography variant="h6" gutterBottom>
                                            Mã đơn hàng: #{invoice.id}
                                        </Typography>
                                        <Typography variant="body1" color="textDisabled" sx={{
                                            '&:hover': {
                                                textDecoration: 'none',
                                            }
                                        }}>
                                            Tổng cộng: <strong>{invoice.total.toLocaleString('vi-VN')} đ</strong>
                                        </Typography>
                                        <Typography variant="body1" display="flex" alignItems="center" color="textSecondary" sx={{
                                            '&:hover': {
                                                textDecoration: 'none',
                                            }
                                        }}>
                                            Trạng thái:&nbsp;
                                            <Box sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                borderRadius: '8px',
                                                padding: '4px 10px',
                                                backgroundColor: invoice.status !== 'Đang xử lý' ? 'green' : 'gray',
                                            }}>
                                                <strong style={{ color: 'white' }}>{invoice.status}</strong>
                                            </Box>
                                        </Typography>
                                        {invoice.status === "Đang vận chuyển" && (
                                            <Typography variant="body2" color="#f195b2" sx={{
                                                textDecoration: 'none',
                                                color: '#f195b2',
                                                '&:hover': {
                                                    textDecoration: 'none',
                                                    color: '#f195b2',
                                                },
                                                paddingTop: 3,
                                            }}>
                                                <strong>*Sản phẩm của bạn dự kiến sẽ được giao trong ngày.<br />
                                                    Xin cảm ơn! (^.^)</strong>
                                            </Typography>
                                        )}
                                    </Box>
                                    <button onClick={() => handleToggleDetails(invoice.id)} style={{ width: '50px' }}>
                                        {visibleDetails[invoice.id]
                                            ? <i className="fa fa-chevron-up" aria-hidden="true" style={{ marginLeft: -3, }}></i>
                                            : <i className="fa fa-chevron-down" aria-hidden="true" style={{ marginLeft: -3, }}></i>
                                        }
                                    </button>
                                </Box>

                                <Box sx={{ display: visibleDetails[invoice.id] ? 'block' : 'none', padding: '10px 0' }}>
                                    <Typography variant='subtitle1' mt={2} gutterBottom>Sản phẩm:</Typography>
                                    <Box component="ul" sx={{ paddingLeft: '20px' }}>
                                        {invoice.items.map((item, index) => (
                                            <li key={index} style={{ marginBottom: '10px' }}>
                                                Sản phẩm: <strong>{item.product}</strong>, Số lượng: <strong>{item.quantity}</strong>
                                            </li>
                                        ))}
                                    </Box>
                                </Box>

                                {/* Phần nhập và gửi feedback riêng cho mỗi đơn hàng */}
                                {!isFeedbackSubmitted[invoice.id] ? (
                                    <Box mt={2}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1, padding: '5px 0' }}>
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <span
                                                    key={value}
                                                    onClick={() => setRating(value)}
                                                    style={{ cursor: 'pointer', color: value <= rating ? 'gold' : 'gray' }} // Đổi màu ngôi sao
                                                    value={rating[invoice.id] || ''}
                                                >
                                                    {value <= rating ? <StarIcon /> : <StarBorderIcon />}
                                                </span>
                                            ))}
                                        </Box>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            placeholder="Nhập phản hồi của bạn tại đây..."
                                            value={feedbacks[invoice.id] || ''}
                                            onChange={(e) => handleFeedbackChange(invoice.id, e.target.value)}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 1 }}
                                            onClick={() => handleFeedbackSubmit(invoice.id)}
                                        >
                                            <ChatIcon /> Gửi phản hồi
                                        </Button>

                                        {/* -------------------------------------------------------- */}

                                    </Box>
                                ) : (
                                    <Typography variant="h6" color="green" mt={2}>
                                        Cảm ơn bạn đã gửi phản hồi!
                                    </Typography>
                                )}
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
