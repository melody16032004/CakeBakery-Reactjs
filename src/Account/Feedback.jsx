import React, { useState, useEffect } from 'react';
import FeedbackPopup from '../components/FeedbackPopup';
import {
    Button, Container, Box, Avatar, Typography,
    CircularProgress, Chip, MenuItem, Select, InputLabel,
    FormControl
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

        // Đảm bảo likedBy và dislikedBy luôn là mảng
        feedback.likedBy = feedback.likedBy || [];
        feedback.dislikedBy = feedback.dislikedBy || [];

        // Nếu người dùng đã dislike
        if (feedback.dislikedBy.includes(userEmail)) {
            feedback.dislikes -= 1; // Giảm số lượng dislikes
            feedback.dislikedBy = feedback.dislikedBy.filter(email => email !== userEmail); // Xóa người dùng khỏi dislikedBy
        }

        // Nếu người dùng chưa like
        if (!feedback.likedBy.includes(userEmail)) {
            feedback.likes = (feedback.likes || 0) + 1; // Tăng likes
            feedback.likedBy.push(userEmail); // Thêm người dùng vào danh sách đã like
        }

        // Cập nhật feedbacks
        setFeedbacks(updatedFeedbacks);

        // Cập nhật Firestore
        const feedbackRef = doc(db, 'feedbacks', feedback.id);
        await updateDoc(feedbackRef, {
            likes: feedback.likes,
            dislikedBy: feedback.dislikedBy,
            likedBy: feedback.likedBy
        });

        // Lấy lại dữ liệu phản hồi sau khi cập nhật
        await refreshFeedbacks();
    };

    const handleDislike = async (index) => {
        const updatedFeedbacks = [...feedbacks];
        const feedback = updatedFeedbacks[index];

        // Đảm bảo likedBy và dislikedBy luôn là mảng
        feedback.likedBy = feedback.likedBy || [];
        feedback.dislikedBy = feedback.dislikedBy || [];

        // Nếu người dùng đã like
        if (feedback.likedBy.includes(userEmail)) {
            feedback.likes -= 1; // Giảm số lượng likes
            feedback.likedBy = feedback.likedBy.filter(email => email !== userEmail); // Xóa người dùng khỏi likedBy
        }

        // Nếu người dùng chưa dislike
        if (!feedback.dislikedBy.includes(userEmail)) {
            feedback.dislikes = (feedback.dislikes || 0) + 1; // Tăng dislikes
            feedback.dislikedBy.push(userEmail); // Thêm người dùng vào danh sách đã dislike
        }

        // Cập nhật feedbacks
        setFeedbacks(updatedFeedbacks);

        // Cập nhật Firestore
        const feedbackRef = doc(db, 'feedbacks', feedback.id);
        await updateDoc(feedbackRef, {
            dislikes: feedback.dislikes,
            likedBy: feedback.likedBy,
            dislikedBy: feedback.dislikedBy
        });

        // Lấy lại dữ liệu phản hồi sau khi cập nhật
        await refreshFeedbacks();
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
        alert(`Clicked on tag: ${tag}`); // Tùy chỉnh chức năng ở đây
    };

    // Hàm xử lý khi người dùng chọn tiêu chí lọc
    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    // Hàm lọc feedbacks dựa trên tiêu chí
    const getFilteredFeedbacks = () => {
        let sortedFeedbacks = [...feedbacks];
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
        return sortedFeedbacks;
    };

    const filteredFeedbacks = getFilteredFeedbacks(); // Lấy các phản hồi đã lọc
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
                                <Link to='/home'>Home</Link>
                            </li>
                            <li>
                                <Link to='/menu'>Feedback</Link>
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

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Filter by</InputLabel>
                        <Select value={filterOption} onChange={handleFilterChange} label="Filter by">
                            <MenuItem value="likes-high">Likes (High to Low)</MenuItem>
                            <MenuItem value="likes-low">Likes (Low to High)</MenuItem>
                            <MenuItem value="dislikes-high">Dislikes (High to Low)</MenuItem>
                            <MenuItem value="dislikes-low">Dislikes (Low to High)</MenuItem>
                        </Select>
                    </FormControl>

                    {loading ? ( // Hiển thị loading khi dữ liệu đang được tải
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <ul>
                            {/* {getFilteredFeedbacks().map((fb, index) => ( */}
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
                                            <span
                                                // key={value}
                                                style={{ color: fb.rating <= rating ? 'gold' : 'gray' }}>
                                                <StarBorderIcon />
                                                <StarBorderIcon />
                                                <StarBorderIcon />
                                                <StarBorderIcon />
                                                <StarBorderIcon />
                                            </span>


                                            {/* {[1, 2, 3, 4, 5].map((value) => (
                                                <span
                                                    key={value}
                                                    // onClick={() => setRating(value)}
                                                    style={{ cursor: 'pointer', color: value <= rating ? 'gold' : 'gray' }} // Đổi màu ngôi sao
                                                >
                                                    {value <= rating ? <StarIcon /> : <StarBorderIcon />}
                                                </span>
                                            ))} */}
                                        </Box>
                                    </Box>


                                    <strong>Feedback:</strong> {fb.content} <br />

                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                                        <strong>Tags: </strong>
                                        {fb.tags && fb.tags.length > 0 ? (
                                            fb.tags.map((tag, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={tag} // Hiển thị tên tag
                                                    clickable // Cho phép click
                                                    color="primary"
                                                    variant="outlined"
                                                    onClick={() => handleTagClick(tag)} // Xử lý sự kiện click
                                                    sx={{ margin: '4px' }}
                                                />
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
                                            disabled={fb.likedBy.includes(userEmail)}
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
                                            disabled={fb.dislikedBy.includes(userEmail)}
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
                        <Box sx={{ margin: '0 10px' }}>{`Page ${currentPage}`}</Box>
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
