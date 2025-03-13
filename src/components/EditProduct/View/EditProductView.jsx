import React from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import LoadingOverlay from '../../../Account/Home/MVC Pattern/Factory Pattern/LoadingOverlay';

const EditProductView = ({
    productName, setProductName,
    productDescription, setProductDescription,
    productPrice, setProductPrice,
    productQuantity, setProductQuantity,
    selectedCategory, setSelectedCategory,
    categories, imageFile, setImageFile,
    handleSubmit, loading
}) => {
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            {loading && <LoadingOverlay loading={loading} />}

            <TextField fullWidth label="Tên sản phẩm" value={productName} onChange={(e) => setProductName(e.target.value)} margin="normal" required />

            <TextField fullWidth label="Mô tả" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} margin="normal" required multiline rows={4} />

            <TextField fullWidth label="Giá" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} margin="normal" required />

            <TextField fullWidth label="Số lượng" type="number" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} margin="normal" required />

            <FormControl fullWidth margin="normal">
                <InputLabel>Chọn danh mục</InputLabel>
                <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                    {categories.map(category => (
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Cập nhật sản phẩm
            </Button>
        </Box>
    );
};

export default EditProductView;
