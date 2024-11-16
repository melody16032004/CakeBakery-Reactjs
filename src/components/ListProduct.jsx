import React, { useState, useEffect } from 'react';
import { db } from '../Account/firebaseConfig'; // Đường dẫn đến cấu hình Firebase của bạn
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {
    IconButton, Box, Typography, Card, CardContent, CardMedia,
    Button, Dialog, DialogTitle, DialogContent, DialogActions,
    Checkbox, TextField
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import EditProduct from './EditProduct'; // Import component sửa sản phẩm
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList, faTh, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'; // Thêm icon Edit và Trash
import { Link, useNavigate } from 'react-router-dom';
// import { scales } from 'chart.js';
import CurrencyConverter from './CurrencyConverter';

const ProductList = ({ setSelectedPage }) => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null); // Sản phẩm để sửa
    const [openDialog, setOpenDialog] = useState(false); // Trạng thái hiển thị hộp thoại
    const [viewMode, setViewMode] = useState('list'); // Chế độ hiển thị: danh sách hoặc chi tiết
    const [selectedProducts, setSelectedProducts] = useState([]); // State để lưu ID sản phẩm đã chọn
    const [searchQuery, setSearchQuery] = useState(''); // State cho search query
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [openDialogQty, setOpenDialogQty] = useState(false);
    const usdToVndRate = 25415;
    const formatTOVND = (usd) => {
        return (usd * usdToVndRate).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    const toggleAddProduct = () => {
        setSelectedPage('add');
    };

    // Lấy danh sách sản phẩm từ Firestore
    const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setProducts(productsData);
    };

    // Gọi hàm fetchProducts khi component được render
    useEffect(() => {
        fetchProducts();
    }, []);

    // Xóa sản phẩm
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'products', id));
            alert('Sản phẩm đã được xóa thành công!');
            fetchProducts(); // Cập nhật danh sách sản phẩm sau khi xóa
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            alert('Đã xảy ra lỗi khi xóa sản phẩm.');
        }
    };

    // Xóa các sản phẩm đã chọn
    const handleDeleteSelected = async () => {
        try {
            for (const id of selectedProducts) {
                await deleteDoc(doc(db, 'products', id));
            }
            alert('Các sản phẩm đã được xóa thành công!');
            setSelectedProducts([]); // Reset danh sách đã chọn
            fetchProducts(); // Cập nhật danh sách sản phẩm
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            alert('Đã xảy ra lỗi khi xóa sản phẩm.');
        }
    };

    const handleSelectProduct = (id) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]
        );
    };

    const handleEditClick = (product) => {
        setEditProduct(product);
        setOpenDialog(true); // Mở hộp thoại khi nhấn nút sửa
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditProduct(null); // Reset sản phẩm đang sửa
    };

    // Hàm chuyển đổi chế độ hiển thị
    const toggleViewMode = () => {
        setViewMode((prevMode) => (prevMode === 'list' ? 'detailed' : 'list'));
    };


    // Lọc sản phẩm dựa trên search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };
    const handleConfirmQuantity = () => {
        console.log('Số lượng sản phẩm:', quantity); // Xử lý số lượng tại đây (gọi API hoặc logic khác)
        handleCloseDialog(); // Đóng dialog sau khi xác nhận
    };
    // Hàm mở dialog
    const handleOpenDialogQty = () => {
        setOpenDialog(true);
    };

    // Hàm đóng dialog
    const handleCloseDialogQty = () => {
        setOpenDialog(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: '',
                gap: '30px',
                alignItems: 'center',
                marginBottom: 2,


            }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách sản phẩm
                </Typography>
                <Button variant="outlined" sx={{ padding: '10px 0', width: '150px' }} color="green" onClick={toggleAddProduct}>
                    {/* <FontAwesomeIcon icon={faPlus} /> */}
                    Thêm sản phẩm
                </Button>
            </Box>


            {/* Search Input */}
            <TextField
                label="Tìm kiếm sản phẩm"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {/* <Button variant="contained" onClick={toggleViewMode} sx={{ marginBottom: 2 }}>
                <FontAwesomeIcon icon={viewMode === 'list' ? faTh : faThList} />
                <span style={{ marginLeft: '8px' }}>Chuyển sang chế độ {viewMode === 'list' ? 'chi tiết' : 'danh sách'}</span>
            </Button> */}
            <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteSelected}
                disabled={selectedProducts.length === 0}
                sx={{ marginBottom: 2 }}
            >
                Xóa đã chọn
            </Button>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2, marginTop: 2 }}>
                {filteredProducts.map((product) => (
                    <Card key={product.id} sx={{ marginBottom: 2 }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            {/* Checkbox cho cả hai chế độ hiển thị */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
                                <Checkbox
                                    checked={selectedProducts.includes(product.id)}
                                    onChange={() => handleSelectProduct(product.id)}
                                    sx={{ marginRight: 2 }} // Cách ra một chút cho đẹp
                                />
                            </Box>

                            <Box sx={{ flexGrow: 1, maxWidth: 200, position: 'relative' }}>
                                <>
                                    <Box>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={product.imageUrl}
                                            alt={product.name}
                                        />
                                        {/* <a style={{
                                            position: 'absolute',
                                            bottom: '60px',
                                            right: '10px',
                                            backgroundColor: 'black',
                                            borderRadius: '50%',
                                            width: '29px',
                                            height: '29px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: 'white',
                                            cursor: 'pointer',
                                        }}>
                                            <i class="fa fa-plus-circle" aria-hidden="true" style={{ scale: '2' }}></i>
                                        </a> */}
                                    </Box>
                                    {/* Dialog nhập số lượng */}
                                    <Dialog open={openDialogQty} onClose={handleCloseDialogQty}>
                                        <DialogTitle>Nhập số lượng sản phẩm</DialogTitle>
                                        <DialogContent>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                label="Số lượng"
                                                type="number"
                                                fullWidth
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}  // Cập nhật số lượng khi nhập
                                                InputProps={{ inputProps: { min: 1 } }}  // Giới hạn số lượng nhỏ nhất là 1
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleCloseDialogQty} color="secondary">Hủy</Button>
                                            <Button onClick={handleConfirmQuantity} color="primary">Xác nhận</Button>
                                        </DialogActions>
                                    </Dialog>

                                    <Typography variant="h8">
                                        <strong style={{
                                            fontSize: 14,
                                            overflow: "hidden",         // Ẩn phần nội dung vượt quá chiều rộng
                                            textOverflow: "ellipsis",
                                            color: '#fc7da5',
                                        }}>
                                            {product.name}
                                        </strong>
                                    </Typography>
                                    <Typography variant="body1" color='primary'
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'left',
                                            textDecoration: 'none',
                                            "&:hover": {
                                                textDecoration: 'none', // Bỏ gạch dưới khi hover
                                            },
                                            "& a": {
                                                textDecoration: 'none', // Xóa gạch dưới cho các thẻ <a> bên trong nếu có
                                                "&:hover": {
                                                    textDecoration: 'none', // Bỏ gạch dưới khi hover vào liên kết
                                                }
                                            }
                                        }}>
                                        {/* {`Giá: $${product.price}`} */}
                                        {/* Giá: {formatTOVND(product.price)} */}
                                        Giá: <CurrencyConverter usdAmount={product.price} />
                                    </Typography>
                                </>
                            </Box>
                        </CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'row', padding: "0 10px 20px 10px" }}>
                            <Button variant="outlined" sx={{ marginRight: '5.5px', padding: '10px 0' }} color="primary" onClick={() => handleEditClick(product)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button variant="outlined" sx={{ marginLeft: '5.5px', padding: '10px 0' }} color="error" onClick={() => handleDelete(product.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Box>
                    </Card>
                ))}
            </Box>

            {/* Hộp thoại sửa sản phẩm */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Sửa sản phẩm</DialogTitle>
                <DialogContent>
                    {editProduct && (
                        <EditProduct product={editProduct} onClose={handleCloseDialog} fetchProducts={fetchProducts} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Hủy</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductList;
