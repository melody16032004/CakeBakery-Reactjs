import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import ProductItem from './ProductItem';
import LoadingOverlay from '../../Account/Home/MVC Pattern/Factory Pattern/LoadingOverlay';

const ProductListView = ({
    products, selectedProducts, searchQuery, setSearchQuery,
    setSelectedPage, handleDelete, handleDeleteSelected, handleSelectProduct, loading
}) => {
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Lọc sản phẩm theo tên
    useEffect(() => {
        setFilteredProducts(
            products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [products, searchQuery]);

    return (
        <Box sx={{ padding: 0 }}>
            <LoadingOverlay loading={loading} /> {/* Hiển thị loading */}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '30px', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4">Danh sách sản phẩm</Typography>
                <Box sx={{ display: 'flex' }}>
                    <Button variant="outlined" sx={{ width: '160px' }} color="success" onClick={() => setSelectedPage('add')}>
                        Thêm sản phẩm
                    </Button>
                    <Box sx={{ width: '20px' }} />
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDeleteSelected}
                        disabled={selectedProducts.length === 0}
                        sx={{ width: '150px' }}
                    >
                        Xóa đã chọn
                    </Button>
                </Box>
            </Box>

            {/* Thanh tìm kiếm */}
            <TextField
                label="Tìm kiếm sản phẩm"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {/* Hiển thị danh sách sản phẩm */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2 }}>
                {filteredProducts.map(product => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        selected={selectedProducts.includes(product.id)}
                        onSelect={() => handleSelectProduct(product.id)}
                        onDelete={() => handleDelete(product.id)}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default ProductListView;
