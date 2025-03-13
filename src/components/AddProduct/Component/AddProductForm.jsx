// src/components/AddProductForm.js
import React from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, Grid, CircularProgress } from '@mui/material';

const AddProductForm = ({
    productName, setProductName,
    productDescription, setProductDescription,
    productPrice, setProductPrice,
    productQuantity, setProductQuantity,
    productImage, setProductImage,
    categories, selectedCategory, setSelectedCategory,
    isLoading, isDuplicateName, errorMessage, handleSubmit
}) => {
    return (
        <Box sx={{ padding: '20px 120px' }}>
            <Typography variant="h4">Thêm sản phẩm</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Tên sản phẩm" fullWidth value={productName} onChange={(e) => setProductName(e.target.value)} margin="normal" required />
                {isDuplicateName && <p style={{ color: 'red' }}>Tên sản phẩm đã tồn tại.</p>}

                <TextField label="Mô tả sản phẩm" fullWidth multiline rows={4} value={productDescription} onChange={(e) => setProductDescription(e.target.value)} margin="normal" />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Chọn danh mục</InputLabel>
                    <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Grid container spacing={2} marginTop={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Giá sản phẩm ($)"
                            value={productPrice}
                            onChange={(e) => setProductPrice(Number(e.target.value))}
                            type="number"
                            fullWidth
                            inputProps={{ min: 0 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Số lượng sản phẩm"
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(Number(e.target.value))}
                            type="number"
                            fullWidth
                            inputProps={{ min: 1 }}
                        />
                    </Grid>
                </Grid>

                <input type="file" accept="image/*" onChange={(e) => setProductImage(e.target.files[0])} style={{ margin: '20px 0' }} />

                {errorMessage && <Typography color="error">{errorMessage}</Typography>}

                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Thêm sản phẩm'}
                </Button>
            </form>
        </Box>
    );
};

export default AddProductForm;
