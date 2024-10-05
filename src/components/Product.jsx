import React, { useState, useEffect } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);  // Lưu trữ danh sách sản phẩm
    const [open, setOpen] = useState(false);       // Mở dialog thêm/sửa
    const [editingProduct, setEditingProduct] = useState(null); // Sản phẩm đang chỉnh sửa

    // Lấy danh sách sản phẩm từ API (hoặc cục bộ)
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        // Giả lập gọi API để lấy dữ liệu sản phẩm
        axios.get('http://localhost:5000/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error(error));
    };

    // Mở dialog để thêm hoặc sửa sản phẩm
    const handleOpenDialog = (product = null) => {
        setEditingProduct(product);
        setOpen(true);
    };

    // Đóng dialog
    const handleCloseDialog = () => {
        setEditingProduct(null);
        setOpen(false);
    };

    // Thêm hoặc cập nhật sản phẩm
    const handleSaveProduct = () => {
        if (editingProduct.id) {
            // Cập nhật sản phẩm
            axios.put(`http://localhost:5000/products/${editingProduct.id}`, editingProduct)
                .then(() => {
                    fetchProducts();
                    handleCloseDialog();
                })
                .catch(error => console.error(error));
        } else {
            // Thêm sản phẩm mới
            axios.post('http://localhost:5000/products', editingProduct)
                .then(() => {
                    fetchProducts();
                    handleCloseDialog();
                })
                .catch(error => console.error(error));
        }
    };

    // Xóa sản phẩm
    const handleDeleteProduct = (id) => {
        axios.delete(`http://localhost:5000/products/${id}`)
            .then(() => {
                fetchProducts();
            })
            .catch(error => console.error(error));
    };

    // Cập nhật giá trị sản phẩm trong form
    const handleChange = (e) => {
        setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Quản lý sản phẩm</h2>

            {/* Nút thêm sản phẩm */}
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                Thêm sản phẩm
            </Button>

            {/* Bảng hiển thị danh sách sản phẩm */}
            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell>Mô tả</TableCell>
                            <TableCell>Giá</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog(product)}>
                                        Sửa
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteProduct(product.id)}>
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog thêm/sửa sản phẩm */}
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>{editingProduct?.id ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Tên sản phẩm"
                        name="name"
                        value={editingProduct?.name || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Mô tả"
                        name="description"
                        value={editingProduct?.description || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Giá"
                        name="price"
                        value={editingProduct?.price || ''}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Hủy</Button>
                    <Button onClick={handleSaveProduct} color="primary">Lưu</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Products;
