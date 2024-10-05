import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Account/firebaseConfig'; // Đường dẫn đến cấu hình Firebase của bạn
import { TextField, Button, Box, Grid, List, ListItem, ListItemText, IconButton, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [searchKeyword, setSearchKeyword] = useState(''); // Thêm state cho từ khóa tìm kiếm
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [existingCategories, setExistingCategories] = useState([]);
    const [products, setProducts] = useState([]); // Danh sách sản phẩm
    const [sortOrder, setSortOrder] = useState('asc'); // Mặc định sắp xếp tăng dần

    // Lấy danh sách danh mục hiện có từ Firestore
    const fetchCategories = async () => {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categories = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log('Danh mục:', categories); // Thêm log để kiểm tra danh mục
        setExistingCategories(categories);
    };

    // Lấy danh sách sản phẩm từ Firestore
    const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log('Sản phẩm:', productsData); // Thêm log để kiểm tra sản phẩm
        setProducts(productsData);
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts(); // Gọi hàm lấy sản phẩm khi component mount
    }, []);

    // Xử lý việc tạo danh mục mới
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!categoryName) {
            setErrorMessage('Tên danh mục không được để trống');
            return;
        }

        try {
            // Lấy tất cả danh mục từ Firestore và chuyển chúng về chữ thường
            const categoriesSnapshot = await getDocs(collection(db, 'categories'));
            const categories = categoriesSnapshot.docs.map(doc => doc.data().name.toLowerCase());

            // Chuyển tên danh mục người dùng nhập vào thành chữ thường để so sánh
            const lowerCaseCategoryName = categoryName.toLowerCase();

            // Kiểm tra xem tên danh mục đã tồn tại chưa
            if (categories.includes(lowerCaseCategoryName)) {
                setErrorMessage('Danh mục đã tồn tại');
                return;
            }

            // Nếu không tồn tại, thêm danh mục mới vào Firestore (giữ nguyên định dạng nhập)
            await addDoc(collection(db, 'categories'), { name: categoryName });
            setSuccessMessage('Danh mục đã được tạo thành công');
            setCategoryName(''); // Xóa nội dung sau khi tạo
            fetchCategories(); // Lấy lại danh sách danh mục sau khi thêm mới
        } catch (error) {
            console.error('Lỗi khi tạo danh mục:', error);
            setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại sau.');
        }
    };



    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'categories', id));
            setSuccessMessage('Danh mục đã được xóa');
            fetchCategories();
        } catch (error) {
            console.error('Lỗi khi xóa danh mục:', error);
            setErrorMessage('Không thể xóa danh mục, vui lòng thử lại.');
        }
    };

    const sortCategories = (categories, order) => {
        return categories.sort((a, b) => {
            if (order === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    };

    // Lọc danh mục dựa trên từ khóa tìm kiếm
    const filteredCategories = existingCategories.filter(category =>
        category.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const sortedCategories = sortCategories(filteredCategories, sortOrder);

    // Tính số lượng sản phẩm theo danh mục
    const productsCountByCategory = existingCategories.reduce((acc, category) => {
        acc[category.name] = products.filter(product => product.category === category.name).length;
        return acc;
    }, {});

    const getProductCountByCategory = (categoryId) => {
        const count = products.filter(product => product.categoryId === categoryId).length;
        console.log(`Số lượng sản phẩm trong danh mục ${categoryId}:`, count); // Thêm log để kiểm tra
        return count;
    };


    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Grid container spacing={3}>
                {/* Cột tạo danh mục */}
                <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Tạo danh mục mới
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Tên danh mục"
                                    fullWidth
                                    value={categoryName}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Allow only Vietnamese letters and spaces (remove digits and special characters)
                                        const filteredValue = value.replace(/[^a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕỎỌÙÚỦŨỤĂĐĨỊŨƠàáâãèéêìíỉĩỊòóôõỏọùúủũụăđĩịíìỉũơƯĂÊÂÁẢẠẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăêâáảạấầẩẫậắằẳẵặẹẻẽềểế ]/g, '');
                                        setCategoryName(filteredValue);
                                    }}
                                    margin="normal"
                                    type='text'
                                />

                                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                                {successMessage && <Typography color="success">{successMessage}</Typography>}

                                <Button type="submit" variant="contained" color="primary">
                                    Tạo danh mục
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Cột hiển thị danh mục đã tồn tại */}
                <Grid item xs={12} md={5}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Danh mục đã tồn tại
                            </Typography>

                            {/* Ô tìm kiếm danh mục */}
                            <TextField
                                label="Tìm kiếm danh mục"
                                fullWidth
                                margin="normal"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)} // Cập nhật từ khóa tìm kiếm
                            />

                            {/* Menu chọn cách sắp xếp */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="sort-label">Sắp xếp theo</InputLabel>
                                <Select
                                    labelId="sort-label"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    label="Sắp xếp theo"
                                    variant="outlined"
                                >
                                    <MenuItem value="asc">Tăng dần</MenuItem>
                                    <MenuItem value="desc">Giảm dần</MenuItem>
                                </Select>
                            </FormControl>

                            <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                                <List>
                                    {sortedCategories.length > 0 ? (
                                        sortedCategories.map((category) => (
                                            <ListItem key={category.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <ListItemText primary={category.name} />
                                                <Typography
                                                    variant="body2"
                                                    color={getProductCountByCategory(category.id) === 0 ? 'red' : 'green'}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                    paddingRight={10}
                                                >
                                                    {`(Số lượng sản phẩm: ${getProductCountByCategory(category.id)})`}
                                                </Typography>
                                                <Box
                                                    component="span"
                                                    onClick={() => getProductCountByCategory(category.id) === 0 && handleDelete(category.id)}
                                                    sx={{ cursor: getProductCountByCategory(category.id) === 0 ? 'pointer' : 'not-allowed', color: getProductCountByCategory(category.id) === 0 ? 'inherit' : 'gray' }} // Điều kiện hóa con trỏ và màu
                                                    disabled={getProductCountByCategory(category.id) !== 0} // Điều kiện hóa disabled
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Box>
                                            </ListItem>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color='textDisabled' disabled>Không có danh mục nào</Typography>
                                    )}
                                </List>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CreateCategory;
