import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import BlogList from './BlogList';

const BlogAdmin = () => {
    const navigate = useNavigate(); // Khởi tạo navigate

    const handleAddPost = () => {
        navigate('/addpost'); // Điều hướng sang trang AddPost
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Quản lý bài viết
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddPost} // Sử dụng handleAddPost
            >
                Thêm bài viết
            </Button>
            <Box mt={4}>
                <Paper>
                    <BlogList onEdit={(blog) => console.log(blog)} />
                </Paper>
            </Box>
        </Container>
    );
};

export default BlogAdmin;
