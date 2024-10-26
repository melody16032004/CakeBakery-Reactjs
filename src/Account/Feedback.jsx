import React, { useState, useEffect } from 'react';
import FeedbackPopup from '../components/FeedbackPopup';
import {
    Button, Container, Box, Avatar, Typography,
    CircularProgress, Chip, MenuItem, Select, InputLabel,
    FormControl, Grid, Dialog, DialogTitle, DialogContent,
    DialogActions,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import { auth, db } from './firebaseConfig';
import {
    collection, addDoc, onSnapshot, Timestamp,
    updateDoc, doc, getDocs
} from 'firebase/firestore';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filterOption, setFilterOption] = useState('');
    const [rating, setRating] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const feedbacksPerPage = 3;
    const [selectedStar, setSelectedStar] = useState('all');
    const [selectedTime, setSelectedTime] = useState('all');
    const [open, setOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
                setIsLoggedIn(true);
            } else {
                setUserEmail('');
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setLoading(true);

        const unsubscribe = onSnapshot(collection(db, 'feedbacks'), (snapshot) => {
            const feedbackData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                likedBy: doc.data().likedBy || [],
                dislikedBy: doc.data().dislikedBy || []
            }));

            setFeedbacks(feedbackData);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);


    const handleFeedbackSubmit = async (newFeedback) => {
        const feedbackWithLikes = {
            ...newFeedback,
            likes: 0,
            dislikes: 0,
            likedBy: [],
            dislikedBy: [],
            user: userEmail,
            timestamp: Timestamp.now(),
            rating: newFeedback.rating || 0,
        };

        try {
            await addDoc(collection(db, 'feedbacks'), feedbackWithLikes);
        } catch (error) {
            console.error("Lỗi khi lưu phản hồi: ", error);
        }
    };

    // -----------------------------------------------------------------------------
    // Like & dislike
    const handleLike = async (index) => {
        const updatedFeedbacks = [...feedbacks];
        const feedback = updatedFeedbacks[index];

        // Đảm bảo mảng likedBy và dislikedBy không undefined
        feedback.likedBy = feedback.likedBy || [];
        feedback.dislikedBy = feedback.dislikedBy || [];

        // Nếu người dùng đã like, thì unlike
        if (feedback.likedBy.includes(userEmail)) {
            feedback.likes -= 1;
            feedback.likedBy = feedback.likedBy.filter(email => email !== userEmail);
        } else {
            // Nếu đã dislike, hủy dislike trước khi like
            if (feedback.dislikedBy.includes(userEmail)) {
                feedback.dislikes -= 1;
                feedback.dislikedBy = feedback.dislikedBy.filter(email => email !== userEmail);
            }

            // Like phản hồi
            feedback.likes = (feedback.likes || 0) + 1;
            feedback.likedBy.push(userEmail);
        }

        setFeedbacks(updatedFeedbacks);

        // Cập nhật Firestore
        const feedbackRef = doc(db, 'feedbacks', feedback.id);
        await updateDoc(feedbackRef, {
            likes: feedback.likes,
            likedBy: feedback.likedBy,
            dislikes: feedback.dislikes,
            dislikedBy: feedback.dislikedBy
        });

        await refreshFeedbacks(); // Lấy lại dữ liệu mới từ Firestore
    };

    const handleDislike = async (index) => {
        const updatedFeedbacks = [...feedbacks];
        const feedback = updatedFeedbacks[index];

        // Đảm bảo mảng likedBy và dislikedBy không undefined
        feedback.likedBy = feedback.likedBy || [];
        feedback.dislikedBy = feedback.dislikedBy || [];

        // Nếu người dùng đã dislike, thì undislike
        if (feedback.dislikedBy.includes(userEmail)) {
            feedback.dislikes -= 1;
            feedback.dislikedBy = feedback.dislikedBy.filter(email => email !== userEmail);
        } else {
            // Nếu đã like, hủy like trước khi dislike
            if (feedback.likedBy.includes(userEmail)) {
                feedback.likes -= 1;
                feedback.likedBy = feedback.likedBy.filter(email => email !== userEmail);
            }

            // Dislike phản hồi
            feedback.dislikes = (feedback.dislikes || 0) + 1;
            feedback.dislikedBy.push(userEmail);
        }

        setFeedbacks(updatedFeedbacks);

        // Cập nhật Firestore
        const feedbackRef = doc(db, 'feedbacks', feedback.id);
        await updateDoc(feedbackRef, {
            likes: feedback.likes,
            likedBy: feedback.likedBy,
            dislikes: feedback.dislikes,
            dislikedBy: feedback.dislikedBy
        });

        await refreshFeedbacks(); // Lấy lại dữ liệu mới từ Firestore
    };








    const refreshFeedbacks = async () => {
        const snapshot = await getDocs(collection(db, 'feedbacks'));
        const feedbackData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setFeedbacks(feedbackData);
    };

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedTag(null);
    };

    // Hàm xử lý khi người dùng chọn tiêu chí lọc
    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const filterFeedbacksByStar = (feedbacks, selectedStar) => {
        if (selectedStar === "all") {
            return feedbacks; // Hiển thị tất cả feedback nếu chọn "all"
        }

        return feedbacks.filter(feedback => feedback.rating === selectedStar);
    };

    // Hàm chuyển đổi chuỗi thời gian thành đối tượng Date
    const parseDateTime = (dateTimeStr) => {
        if (!dateTimeStr) return null; // Trả về null nếu không có giá trị

        const [time, date] = dateTimeStr.split(' ');
        if (!time || !date) return null; // Trả về null nếu không thể tách được time hoặc date

        const [hour, minute, second] = time.split(':');
        const [day, month, year] = date.split('/');

        return new Date(year, month - 1, day, hour, minute, second);
    };


    // Hàm lọc feedbacks dựa trên tiêu chí
    const getFilteredFeedbacks = () => {
        let sortedFeedbacks = [...feedbacks];

        if (selectedStar !== 'all') {
            sortedFeedbacks = sortedFeedbacks.filter(feedback => feedback.rating === Number(selectedStar));
        }

        switch (filterOption) {
            case 'likes-high':
                sortedFeedbacks.sort((a, b) => (b.likes || 0) - (a.likes || 0)); // Likes nhiều -> ít
                break;
            case 'likes-low':
                sortedFeedbacks.sort((a, b) => (a.likes || 0) - (b.likes || 0)); // Likes ít -> nhiều
                break;
            case 'dislikes-high':
                sortedFeedbacks.sort((a, b) => (b.dislikes || 0) - (a.dislikes || 0)); // Dislikes nhiều -> ít
                break;
            case 'dislikes-low':
                sortedFeedbacks.sort((a, b) => (a.dislikes || 0) - (b.dislikes || 0)); // Dislikes ít -> nhiều
                break;
            default:
                break;
        }

        // Lọc theo thời gian (không xét giờ)
        const currentTime = new Date();
        switch (selectedTime) {
            case 'today':
                sortedFeedbacks = sortedFeedbacks.filter(feedback => {
                    const feedbackTime = parseDateTime(feedback.time);
                    return feedbackTime && feedbackTime.toDateString() === currentTime.toDateString();
                });
                break;
            case 'this-week':
                const startOfWeek = new Date(currentTime);
                startOfWeek.setDate(currentTime.getDate() - currentTime.getDay());
                startOfWeek.setHours(0, 0, 0, 0); // Đặt giờ về 0
                sortedFeedbacks = sortedFeedbacks.filter(feedback => {
                    const feedbackTime = parseDateTime(feedback.time);
                    return feedbackTime && feedbackTime >= startOfWeek;
                });
                break;
            case 'this-month':
                const startOfMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
                startOfMonth.setHours(0, 0, 0, 0); // Đặt giờ về 0
                sortedFeedbacks = sortedFeedbacks.filter(feedback => {
                    const feedbackTime = parseDateTime(feedback.time);
                    return feedbackTime && feedbackTime >= startOfMonth;
                });
                break;
            case 'this-year':
                const startOfYear = new Date(currentTime.getFullYear(), 0, 1);
                startOfYear.setHours(0, 0, 0, 0); // Đặt giờ về 0
                sortedFeedbacks = sortedFeedbacks.filter(feedback => {
                    const feedbackTime = parseDateTime(feedback.time);
                    return feedbackTime && feedbackTime >= startOfYear;
                });
                break;
            default:
                break;
        }

        // Sắp xếp theo thời gian
        sortedFeedbacks.sort((a, b) => {
            const timeA = parseDateTime(a.time);
            const timeB = parseDateTime(b.time);
            return (timeB || 0) - (timeA || 0);
        });

        return sortedFeedbacks;
    };

    const filteredFeedbacks = getFilteredFeedbacks(); // Lấy các phản hồi đã lọc
    // const filteredFeedback = filterFeedbacksByStar(feedbacks, selectedStar);
    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

    return (
        <>
            <NavBar />
            <section className="banner_area">
                <div className="container">
                    <div className="banner_text">
                        <h3>Feedback</h3>
                        <ul>
                            <li>
                                <Link to='/home'>Trang chủ</Link>
                            </li>
                            <li>
                                <Link to='/menu'>Đánh giá</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <div style={{ height: 'auto', paddingTop: '50px', paddingBottom: '100px' }}>
                <Container maxWidth="md">
                    {isLoggedIn && (
                        <FeedbackPopup onSubmitFeedback={handleFeedbackSubmit} userEmail={userEmail} />
                    )}

                    <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item xs={9.5}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <InputLabel>Filter by</InputLabel>
                                <Select value={filterOption} onChange={handleFilterChange} label="Filter by">
                                    <MenuItem value="likes-high">Lượt thích nhiều nhất</MenuItem>
                                    <MenuItem value="likes-low">Lượt thích ít nhất</MenuItem>
                                    {/* <MenuItem value="dislikes-high">Lượt không thích nhiều nhất</MenuItem>
                                    <MenuItem value="dislikes-low">Dislikes (Low to High)</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="rating-filter-label">Số sao</InputLabel>
                                <Select
                                    labelId="rating-filter-label"
                                    id="rating-filter"
                                    value={selectedStar} // State lưu giá trị số sao được chọn
                                    label="Số sao"
                                    onChange={(e) => setSelectedStar(e.target.value)} // Hàm để cập nhật giá trị
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value={5}>5 sao</MenuItem>
                                    <MenuItem value={4}>4 sao</MenuItem>
                                    <MenuItem value={3}>3 sao</MenuItem>
                                    <MenuItem value={2}>2 sao</MenuItem>
                                    <MenuItem value={1}>1 sao</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>




                    {loading ? ( // Hiển thị loading khi dữ liệu đang được tải
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <ul>
                            {currentFeedbacks.map((fb, index) => (
                                <li key={fb.id}
                                    style={{
                                        position: 'relative',
                                        listStyle: 'none',
                                        padding: '16px',
                                        borderBottom: '1px solid #ccc',
                                        backgroundColor: '#f8f9fa',
                                        margin: '10px 0',
                                        borderRadius: '4px',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'flex', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar
                                                alt="User Avatar"
                                                src="img/comment/comment-1.jpg" // Thay đổi thành URL avatar của bạn
                                                sx={{ width: 40, height: 40 }}
                                            />
                                            <Box sx={{ width: '10px' }} />
                                            <strong style={{ color: 'green', marginLeft: 2 }}>
                                                {fb.user}
                                            </strong>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} style={{ color: i < fb.rating ? 'gold' : 'gray' }}>
                                                    {i < fb.rating ? <StarIcon /> : <StarBorderIcon />}
                                                </span>
                                            ))}
                                        </Box>

                                    </Box>


                                    <strong>Feedback:</strong> {fb.content} <br />

                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                                        <strong>Tags: </strong>
                                        {fb.tags && fb.tags.length > 0 ? (
                                            fb.tags.map((tag, idx) => (
                                                <>
                                                    <Chip
                                                        key={idx}
                                                        label={tag.name} // Hiển thị tên tag
                                                        clickable // Cho phép click
                                                        color="primary"
                                                        variant="outlined"
                                                        onClick={() => handleTagClick(tag)} // Xử lý sự kiện click
                                                        sx={{ margin: '4px' }}
                                                    />
                                                    <Dialog open={open} onClose={handleClose}>
                                                        <DialogTitle>Image Preview</DialogTitle>
                                                        <DialogContent>
                                                            {selectedTag && <img key={idx} src={selectedTag.imageUrl} alt={selectedTag} style={{ maxWidth: '100%' }} />}
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleClose} color="inherit">
                                                                <Link to="/shop">Buy</Link>
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </>


                                            ))
                                        ) : (
                                            <span>No tags</span>
                                        )}
                                    </Box>

                                    <br />


                                    <em>{fb.timestamp.toDate().toLocaleString()}</em>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color='success'
                                            startIcon={<ThumbUpIcon />}
                                            onClick={() => handleLike(index)}
                                            disabled={fb.likedBy.includes(userEmail)} // Vô hiệu hóa khi đã like
                                            sx={{
                                                marginRight: 1, '&:focus': {
                                                    outline: 'none',
                                                }
                                            }}
                                        >
                                            {fb.likes || 0}
                                        </Button>

                                        <Button
                                            variant="contained"
                                            startIcon={<ThumbDownIcon />}
                                            onClick={() => handleDislike(index)}
                                            disabled={fb.dislikedBy.includes(userEmail)} // Vô hiệu hóa khi đã dislike
                                            sx={{
                                                '&:focus': {
                                                    outline: 'none',
                                                }
                                            }}
                                        >
                                            {fb.dislikes || 0}
                                        </Button>

                                    </Box>
                                </li>
                            ))}
                        </ul>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Box sx={{ margin: '0 10px', width: '200px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>{`Page ${currentPage}`}</Box>
                        <Button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={indexOfLastFeedback >= filteredFeedbacks.length}
                        >
                            Next
                        </Button>
                    </Box>

                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Feedback;
