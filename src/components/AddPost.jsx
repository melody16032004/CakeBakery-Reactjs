import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, IconButton } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../Account/firebaseConfig';  // Cấu hình Firebase của bạn
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom'; 



const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate(); 

    const handleContentChange = (content) => {
        setContent(content);
    };

    const handleImageUpload = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const storageRef = ref(storage, `images/${file.name}`);
            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrl(url);
                });
            });
            setImage(file);
        }
    };

    const handleSubmit = async () => {
        try {
            await addDoc(collection(db, 'blogs'), {
                title: title,
                content: content,
                imageUrl: imageUrl,
                createdAt: new Date(),
            });
            alert('Bài viết đã được thêm thành công!');
            navigate('/blogs');
            setTitle('');
            setContent('');
            setImage(null);
            setImageUrl('');
        } catch (error) {
            console.error("Lỗi khi thêm bài viết: ", error);
            alert('Có lỗi xảy ra khi thêm bài viết');
        }
    };


    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>Thêm bài viết</Typography>

                <TextField
                    fullWidth
                    label="Tiêu đề"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <Editor
                    apiKey="i7cqen2w1fcg5r8jkbdd35iv337ti97pf4wnz01n1jwlyitd"
                    value={content}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={handleContentChange}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                        Tải ảnh lên
                        <input type="file" hidden onChange={handleImageUpload} />
                    </Button>
                    {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '100px', marginLeft: '10px' }} />}
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    Đăng bài viết
                </Button>
            </Paper>
        </Box>
    );
};

export default AddPost;
