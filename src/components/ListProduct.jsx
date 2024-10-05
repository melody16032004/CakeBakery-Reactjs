import React, { useState, useEffect } from 'react';
import { db } from '../Account/firebaseConfig'; // Đường dẫn đến cấu hình Firebase của bạn
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Box, Typography, Card, CardContent, CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, TextField } from '@mui/material';
import EditProduct from './EditProduct'; // Import component sửa sản phẩm
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList, faTh, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'; // Thêm icon Edit và Trash
import { Link, useNavigate } from 'react-router-dom';

const ProductList = ({ setSelectedPage }) => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null); // Sản phẩm để sửa
    const [openDialog, setOpenDialog] = useState(false); // Trạng thái hiển thị hộp thoại
    const [viewMode, setViewMode] = useState('list'); // Chế độ hiển thị: danh sách hoặc chi tiết
    const [selectedProducts, setSelectedProducts] = useState([]); // State để lưu ID sản phẩm đã chọn
    const [searchQuery, setSearchQuery] = useState(''); // State cho search query
    const navigate = useNavigate();


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

            <Button variant="contained" onClick={toggleViewMode} sx={{ marginBottom: 2 }}>
                <FontAwesomeIcon icon={viewMode === 'list' ? faTh : faThList} />
                <span style={{ marginLeft: '8px' }}>Chuyển sang chế độ {viewMode === 'list' ? 'chi tiết' : 'danh sách'}</span>
            </Button>
            <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteSelected}
                disabled={selectedProducts.length === 0}
                sx={{ marginBottom: 2 }}
            >
                Xóa đã chọn
            </Button>

            <Box sx={{ display: 'grid', gridTemplateColumns: viewMode === 'list' ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2, marginTop: 2 }}>
                {filteredProducts.map((product) => (
                    <Card key={product.id} sx={{ marginBottom: 2 }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            {/* Checkbox cho cả hai chế độ hiển thị */}
                            <Checkbox
                                checked={selectedProducts.includes(product.id)}
                                onChange={() => handleSelectProduct(product.id)}
                                sx={{ marginRight: 2 }} // Cách ra một chút cho đẹp
                            />
                            <Box sx={{ flexGrow: 1, maxWidth: 200 }}>
                                {viewMode === 'detailed' ? (
                                    <>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={product.imageUrl}
                                            alt={product.name}
                                        />
                                        <Typography variant="h8">{product.name}</Typography>
                                        <Typography variant="body1" color='primary' sx={{ display: 'flex', justifyContent: 'left' }}>{`Giá: $${product.price}`}</Typography>
                                    </>
                                ) : (
                                    <>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <Box>
                                                <Typography variant="h6" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</Typography>
                                                <Typography variant="body1" color='primary' sx={{ display: 'flex', justifyContent: 'left' }}>{`Giá: $${product.price}`}</Typography>
                                                <Typography variant="body1" color='primary' sx={{ display: 'flex', justifyContent: 'left' }}>{`Số lượng: \t${product.quantity}`}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Button variant="outlined" sx={{ padding: '10px 0' }} color="primary" onClick={() => handleEditClick(product)}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button variant="outlined" sx={{ padding: '10px 0' }} color="error" onClick={() => handleDelete(product.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </Box>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </CardContent>
                        {viewMode === 'detailed' ? (
                            <Box sx={{ display: 'flex', flexDirection: 'row', padding: "0 10px 20px 10px" }}>
                                <Button variant="outlined" sx={{ marginRight: '5.5px', padding: '10px 0' }} color="primary" onClick={() => handleEditClick(product)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button variant="outlined" sx={{ marginLeft: '5.5px', padding: '10px 0' }} color="error" onClick={() => handleDelete(product.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Box>
                        ) : null}
                        {product.quantity === 0 && (
                            <Typography color='red' sx={{ display: 'flex', justifyContent: 'center' }}>Sản phẩm này hiện đã hết hàng!</Typography>
                        )}
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
