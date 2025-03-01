import React, { useState, useEffect } from 'react';
import { Fab, Box, Modal, TextField, Button, Autocomplete } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { collection, getDocs } from 'firebase/firestore';
import firebaseInstance from '../Account/Firebase Singleton Pattern/firebaseConfig';

const FeedbackPopup = ({ onSubmitFeedback, userEmail }) => {
    const [open, setOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [username, setUsername] = useState('');
    const [tags, setTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [rating, setRating] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        if (feedback && rating) {
            const feedbackData = {
                user: username || "Người dùng",
                content: feedback,
                // tags: tags.map(tag => tag.name),
                // img: tags.map(tag => tag.imageUrl),
                tags: tags.map(tag => ({ name: tag.name, imageUrl: tag.imageUrl })),
                rating,
                timestamp: new Date().toLocaleString(),
            };
            onSubmitFeedback(feedbackData);
            setUsername('');
            setFeedback('');
            setTags([]);
            setRating(0);
            handleClose();
        }

        if (!rating) {
            alert('Vui lòng đánh giá sao 🌟')
        }
    };

    // Lấy danh sách bánh từ Firestore
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const querySnapshot = await getDocs(collection(firebaseInstance.db, 'products')); // Đổi 'cakes' thành tên collection của bạn
                const tagsArray = querySnapshot.docs.map(doc => ({
                    name: doc.data().name,
                    imageUrl: doc.data().imageUrl, // Giả định mỗi document có trường 'avatar'
                }));
                setAvailableTags(tagsArray);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bánh: ", error);
            }
        };

        fetchTags();
    }, []);

    return (
        <>
            <Fab
                color="primary"
                aria-label="feedback"
                onClick={handleOpen}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    zIndex: 1000,
                    '&:focus': {
                        outline: 'none',
                    }
                }}
            >
                <ChatIcon />
            </Fab>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="feedback-modal-title"
                aria-describedby="feedback-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '10%',
                        width: 500, // Tăng chiều rộng form
                        height: 440, // Tăng chiều cao form
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 3,
                    }}
                >
                    <h2 id="feedback-modal-title">Phản hồi</h2>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1, padding: '5px 0' }}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span
                                key={value}
                                onClick={() => setRating(value)}
                                style={{ cursor: 'pointer', color: value <= rating ? 'gold' : 'gray' }} // Đổi màu ngôi sao
                            >
                                {value <= rating ? <StarIcon /> : <StarBorderIcon />}
                            </span>
                        ))}
                    </Box>

                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={availableTags}
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        value={tags}
                        onChange={(event, newValue) => {
                            setTags(newValue);
                        }}
                        renderOption={(props, option) => (
                            <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={option.imageUrl} alt={option.name} sx={{ marginRight: 1 }} />
                                {option.name}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Loại bánh"
                                placeholder="Chọn loại bánh"
                            />
                        )}
                    />

                    <TextField
                        id="feedback-input"
                        label="Nhập phản hồi của bạn"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        sx={{ marginTop: 2 }}
                    />



                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button variant="contained" onClick={handleSubmit} sx={{ marginRight: 1 }}>
                            Gửi
                        </Button>
                        <Button variant="outlined" onClick={handleClose}>
                            Hủy
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default FeedbackPopup;
