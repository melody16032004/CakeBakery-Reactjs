import React, { useState } from 'react';
import { Fab, Box, Modal, TextField, Button, Autocomplete, IconButton, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const FeedbackPopup = ({ onSubmitFeedback }) => {
    const [open, setOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [tags, setTags] = useState([]);

    const availableTags = [
        'Bánh mì',
        'Bánh ngọt',
        'Bánh trung thu',
        'Bánh xèo',
        'Bánh bao',
        'Bánh tét',
        'Bánh flan'
    ];

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        if (feedback && tags.length > 0) {
            const feedbackData = {
                content: feedback,
                tags: tags,
                likes: 0,
                dislikes: 0,
                likedBy: [],   // Thêm mảng để lưu người dùng đã like
                dislikedBy: [] // Thêm mảng để lưu người dùng đã dislike
            };
            onSubmitFeedback(feedbackData);
            setFeedback('');
            setTags([]);
            handleClose();
        }
    };

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
                        width: 400,
                        height: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 3,
                    }}
                >
                    <h2 id="feedback-modal-title">Phản hồi</h2>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={availableTags}
                        getOptionLabel={(option) => option}
                        filterSelectedOptions
                        value={tags}
                        onChange={(event, newValue) => {
                            setTags(newValue);
                        }}
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

const FeedbackList = ({ feedbacks, onLike, onDislike }) => {
    return (
        <Box sx={{ marginTop: 4 }}>
            {feedbacks.map((feedback, index) => (
                <Box
                    key={index}
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        padding: 2,
                        marginBottom: 2,
                    }}
                >
                    <Typography variant="h6">Phản hồi: {feedback.content}</Typography>
                    <Typography variant="body2">Loại bánh: {feedback.tags.join(', ')}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                        <IconButton onClick={() => onLike(index)}>
                            <ThumbUpIcon color={feedback.likedBy.includes('user') ? 'primary' : 'inherit'} />
                        </IconButton>
                        <Typography variant="body2" sx={{ marginRight: 2 }}>{feedback.likes}</Typography>

                        <IconButton onClick={() => onDislike(index)}>
                            <ThumbDownIcon color={feedback.dislikedBy.includes('user') ? 'secondary' : 'inherit'} />
                        </IconButton>
                        <Typography variant="body2">{feedback.dislikes}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

const FeedbackApp = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    const handleSubmitFeedback = (newFeedback) => {
        setFeedbacks([...feedbacks, newFeedback]);
    };

    const handleLike = (index) => {
        const updatedFeedbacks = [...feedbacks];
        const user = 'user'; // Thay thế bằng ID hoặc thông tin người dùng thực tế

        if (!updatedFeedbacks[index].likedBy.includes(user)) {
            updatedFeedbacks[index].likes += 1;
            updatedFeedbacks[index].likedBy.push(user);
        }

        if (updatedFeedbacks[index].dislikedBy.includes(user)) {
            updatedFeedbacks[index].dislikes -= 1;
            updatedFeedbacks[index].dislikedBy = updatedFeedbacks[index].dislikedBy.filter(u => u !== user);
        }

        setFeedbacks(updatedFeedbacks);
    };

    const handleDislike = (index) => {
        const updatedFeedbacks = [...feedbacks];
        const user = 'user'; // Thay thế bằng ID hoặc thông tin người dùng thực tế

        if (!updatedFeedbacks[index].dislikedBy.includes(user)) {
            updatedFeedbacks[index].dislikes += 1;
            updatedFeedbacks[index].dislikedBy.push(user);
        }

        if (updatedFeedbacks[index].likedBy.includes(user)) {
            updatedFeedbacks[index].likes -= 1;
            updatedFeedbacks[index].likedBy = updatedFeedbacks[index].likedBy.filter(u => u !== user);
        }

        setFeedbacks(updatedFeedbacks);
    };

    return (
        <div>
            <FeedbackPopup onSubmitFeedback={handleSubmitFeedback} />
            <FeedbackList feedbacks={feedbacks} onLike={handleLike} onDislike={handleDislike} />
        </div>
    );
};

export default FeedbackApp;
