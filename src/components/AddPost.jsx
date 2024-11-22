import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Paper, IconButton, MenuItem } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { collection, addDoc,doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../Account/firebaseConfig'; // Cấu hình Firebase của bạn
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate, useParams } from 'react-router-dom';


const AddPost = () => {
    const { id } = useParams(); // Lấy ID bài viết từ URL
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const categories = ['Bánh Mousse', 'Bánh Sinh Nhật', 'Bánh xu kem', 'Cookie'];
    
    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                const docRef = doc(db, 'blogs', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.title);
                    setDescription(data.description);
                    setCategory(data.category);
                    setContent(data.content);
                    setImageUrl(data.imageUrl || '');
                }
            };
            fetchBlog();
        }
    }, [id]);

    const handleContentChange = (content) => {
        setContent(content);
    };

    const handleImageUpload = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const storageRef = ref(storage, `images/${file.name}`);
            
            // Xóa ảnh cũ trên Firebase nếu cần (tùy chọn)
            if (imageUrl) {
                const oldImageRef = ref(storage, imageUrl.replace(/.*\/o\/(.*?)\?.*/, '$1')); // Lấy ref ảnh cũ
                deleteObject(oldImageRef).catch((error) => {
                    console.error("Lỗi khi xóa ảnh cũ: ", error);
                });
            }
            
            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrl(url); // Cập nhật URL ảnh mới
                });
            });
            setImage(file); // Cập nhật file ảnh mới
        }
    };
    

    const handleSubmit = async () => {
        try {
            if (id) {
                // Cập nhật bài viết
                const docRef = doc(db, 'blogs', id);
                await updateDoc(docRef, {
                    title,
                    description,
                    category,
                    content,
                    imageUrl,
                    updatedAt: new Date(),
                });
                alert('Bài viết đã được cập nhật thành công!');
            } else {
                // Thêm bài viết mới
                await addDoc(collection(db, 'blogs'), {
                    title,
                    description,
                    category,
                    content,
                    imageUrl,
                    createdAt: new Date(),
                });
                alert('Bài viết đã được thêm thành công!');
            }

            navigate('/blogs'); // Chuyển hướng về danh sách bài viết
        } catch (error) {
            console.error("Lỗi khi lưu bài viết: ", error);
            alert('Có lỗi xảy ra khi lưu bài viết');
        }
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
            <Paper sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                    {id ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
                </Typography>

                {/* Tiêu đề */}
                <TextField
                    fullWidth
                    label="Tiêu đề"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Mô tả */}
                <TextField
                    fullWidth
                    label="Mô tả"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Danh mục */}
                <TextField
                    fullWidth
                    select
                    label="Danh mục"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    sx={{ mb: 2 }}
                >
                    {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Nội dung */}
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

                {/* Upload ảnh */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
    {imageUrl ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={imageUrl} alt="Preview" style={{ width: '150px', marginBottom: '10px' }} />
            <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                Thay đổi ảnh
                <input type="file" hidden onChange={handleImageUpload} />
            </Button>
        </Box>
    ) : (
        <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
            Tải ảnh lên
            <input type="file" hidden onChange={handleImageUpload} />
        </Button>
    )}
</Box>

                {/* Nút đăng bài */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    {id ? 'Cập nhật bài viết' : 'Đăng bài viết'}
                </Button>
            </Paper>
        </Box>
    );
};

export default AddPost;
