import React, { useState, useEffect } from 'react';
import firebaseInstance from '../Account/Firebase Singleton Pattern/firebaseConfig';
import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { BorderAll } from '@mui/icons-material';

const EditProduct = ({ product, onClose, fetchProducts }) => {
    const [productName, setProductName] = useState(product.name);
    const [productDescription, setProductDescription] = useState(product.description);
    const [productPrice, setProductPrice] = useState(product.price);
    const [productQuantity, setProductQuantity] = useState(product.quantity); // Thêm state cho số lượng sản phẩm
    const [selectedCategory, setSelectedCategory] = useState(product.categoryId);
    const [categories, setCategories] = useState([]); // Danh sách danh mục
    const [imageFile, setImageFile] = useState(null); // Tệp hình ảnh
    const [imageUrl, setImageUrl] = useState(product.imageUrl); // Đường dẫn hình ảnh hiện tại

    // Lấy danh sách danh mục từ Firestore
    const fetchCategories = async () => {
        const querySnapshot = await getDocs(collection(firebaseInstance.db, 'categories'));
        const categoriesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setCategories(categoriesData);
    };

    // Gọi hàm fetchCategories khi component được render
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]); // Lưu tệp hình ảnh vào state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let newImageUrl = imageUrl;

            // Nếu có tệp hình ảnh mới, tải lên Firebase Storage
            if (imageFile) {
                const storageRef = ref(firebaseInstance.db, `images/${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                newImageUrl = await getDownloadURL(storageRef); // Lấy URL của hình ảnh đã tải lên
            }

            // Cập nhật sản phẩm trong Firestore
            await updateDoc(doc(firebaseInstance.db, 'products', product.id), {
                name: productName,
                description: productDescription,
                price: productPrice,
                quantity: productQuantity, // Cập nhật số lượng sản phẩm
                categoryId: selectedCategory,
                imageUrl: newImageUrl, // Cập nhật hình ảnh
            });
            alert('Sản phẩm đã được cập nhật thành công!');
            fetchProducts(); // Cập nhật danh sách sản phẩm sau khi sửa
            onClose(); // Đóng modal hoặc component sửa sản phẩm
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            alert('Đã xảy ra lỗi khi cập nhật sản phẩm.');
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Chỉnh sửa thông tin sản phẩm
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Tên sản phẩm"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Mô tả sản phẩm"
                    fullWidth
                    multiline
                    rows={4}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    margin="normal"
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormControl margin="normal">
                        <TextField
                            label="Giá sản phẩm"
                            fullWidth
                            value={productPrice}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*\.?\d*$/.test(value)) { // Allow only positive numbers (including decimals)
                                    setProductPrice(value);
                                }
                            }}
                            margin="normal"
                            type="text" // Use text type to better control input
                        />
                    </FormControl>

                    <FormControl margin="normal">
                        <TextField
                            label="Số lượng sản phẩm"
                            type="text" // Use text type to better control input
                            value={productQuantity}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) { // Allow only positive integers
                                    setProductQuantity(value);
                                }
                            }}
                            fullWidth
                            margin="normal"
                        />
                    </FormControl>
                </Box>







                {/* Chọn danh mục sản phẩm */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="category-label">Chọn danh mục</InputLabel>
                    <Select
                        labelId="category-label"
                        value={selectedCategory}
                        label="Chọn danh mục"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        InputProps={{
                            style: {
                                border: 'none',
                            },
                        }}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Chọn hình ảnh sản phẩm */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ margin: '16px 0' }}
                />
                {imageUrl && <img src={imageUrl} alt="Hình ảnh sản phẩm" style={{ maxWidth: '100%', margin: '10px 0' }} />}

                <Button type="submit" variant="contained" color="primary">
                    Cập nhật sản phẩm
                </Button>
            </form>
        </Box>
    );
};

const styles = {
    inputField: {
        width: '200px',
    }
}

export default EditProduct;
