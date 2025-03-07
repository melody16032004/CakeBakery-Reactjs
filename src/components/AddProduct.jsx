import React, { useState, useEffect } from 'react';
import firebaseInstance from '../Account/Firebase Singleton Pattern/firebaseConfig';
import { collection, query, where, addDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, Slider, Grid, CircularProgress, Grid2 } from '@mui/material';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0); // Giá sản phẩm (slider + input)
    const [productQuantity, setProductQuantity] = useState(10); // Số lượng sản phẩm (slider + input)
    const [productImage, setProductImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState([]); // Danh sách danh mục
    const [selectedCategory, setSelectedCategory] = useState(''); // Danh mục được chọn
    const [isLoading, setIsLoading] = useState(false);
    const [isDuplicateName, setIsDuplicateName] = useState(false);

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
        setProductImage(e.target.files[0]);
    };

    // Kiểm tra tên sản phẩm trong khi nhập
    useEffect(() => {
        const checkDuplicateProductName = async () => {
            if (!productName) {
                setIsDuplicateName(false);
                return;
            }

            const q = query(collection(firebaseInstance.firebaseInstance.db, 'products'), where('name', '==', productName.toLowerCase()));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setIsDuplicateName(true);
            } else {
                setIsDuplicateName(false);
            }
        };

        checkDuplicateProductName();
    }, [productName]); // Theo dõi sự thay đổi của productName

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (isDuplicateName) {
            setErrorMessage('Tên sản phẩm đã tồn tại.');
            return;
        }

        if (!productName || !productImage || !selectedCategory) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin sản phẩm, chọn ảnh và danh mục.');
            return;
        }

        setIsLoading(true);

        try {
            // Kiểm tra xem tên sản phẩm đã tồn tại chưa
            // const q = query(collection(firebaseInstance.db, 'products'), where('name', '==', productName.toLowerCase()));
            // const querySnapshot = await getDocs(q);

            // if (!querySnapshot.empty) {
            //     setErrorMessage('Tên sản phẩm đã tồn tại.');
            //     setIsLoading(false);
            //     return;
            // }

            // const productSnapshot = await getDocs(collection(firebaseInstance.db, 'products'));
            // const products = productSnapshot.docs.map(doc => doc.data().name.toLowerCase());
            // const lowerCaseProductName = productName.toLowerCase();
            // if (products.includes(lowerCaseProductName)) {
            //     alert('Sản phẩm này đã tồn tại.');
            //     return;
            // }


            // Tải ảnh lên Firebase Storage
            const storage = getStorage();
            const imageRef = ref(storage, `products/${productImage.name}`);
            await uploadBytes(imageRef, productImage);

            // Lấy URL của ảnh sau khi tải lên
            const imageUrl = await getDownloadURL(imageRef);

            // Thêm thông tin sản phẩm vào Firestore
            await addDoc(collection(firebaseInstance.db, 'products'), {
                name: productName, // Lưu tên sản phẩm dưới dạng viết thường
                description: productDescription,
                price: productPrice, // Lưu giá sản phẩm
                quantity: productQuantity, // Lưu số lượng sản phẩm
                imageUrl: imageUrl, // Lưu URL của hình ảnh
                categoryId: selectedCategory, // Lưu danh mục được chọn
                sold: 0,
            });

            // Hiện thông báo thành công
            alert('Sản phẩm đã được thêm thành công!');

            // Reset các trường đã nhập
            setProductName('');
            setProductDescription('');
            setProductPrice(0); // Reset thanh kéo giá
            setProductQuantity(10); // Reset thanh kéo số lượng
            setProductImage(null); // Reset ảnh
            setSelectedCategory(''); // Reset danh mục
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };


    // Hàm xử lý thay đổi giá
    const handlePriceChange = (event, newValue) => {
        setProductPrice(newValue);
    };

    // Hàm xử lý thay đổi số lượng
    const handleQuantityChange = (event, newValue) => {
        setProductQuantity(newValue);
    };

    // Hàm xử lý thay đổi giá trị bằng nhập liệu trực tiếp cho giá
    const handlePriceInputChange = (e) => {
        const value = e.target.value === '' ? '' : Number(e.target.value);
        setProductPrice(value);
    };

    // Hàm xử lý thay đổi giá trị bằng nhập liệu trực tiếp cho số lượng
    const handleQuantityInputChange = (e) => {
        const value = e.target.value === '' ? '' : Number(e.target.value);
        setProductQuantity(value);
    };

    return (
        <Box sx={{ padding: '20px 120px' }}>
            <Typography variant="h4" gutterBottom>
                Thêm sản phẩm
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Tên sản phẩm"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    margin="normal"
                    required
                />
                {isDuplicateName && <p style={{ color: 'red' }}>Tên sản phẩm đã tồn tại.</p>}
                <TextField
                    label="Mô tả sản phẩm"
                    fullWidth
                    multiline
                    rows={4}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    margin="normal"
                />
                <Grid>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="select-category-label">Chọn danh mục</InputLabel>
                        <Select
                            labelId="select-category-label"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            required
                            variant='outlined'
                            label='Chọn danh mục'
                            fullWidth
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
                </Grid>

                <Grid container
                    alignItems={'center'}
                    display={'flex'}
                    justifyContent={'space-between'}
                    marginTop={'15px'}>
                    {/* Chọn danh mục sản phẩm */}


                    {/* <Grid sx={{ width: '10px' }}></Grid> */}

                    {/* Cột Giá sản phẩm */}
                    <Grid item xs={5}>
                        <TextField
                            label="Giá sản phẩm ($)"
                            value={productPrice}
                            onChange={handlePriceInputChange}
                            onBlur={() => {
                                // Nếu người dùng xóa hoặc nhập giá trị nhỏ hơn 10, đặt lại giá trị mặc định là 10
                                if (!productPrice || productPrice < 0) {
                                    setProductPrice(0); // Giá trị mặc định là 10
                                }
                            }}
                            fullWidth
                            InputProps={{
                                sx: {
                                    border: 'none',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                    },
                                },
                                inputProps: {
                                    min: 0 // Giới hạn giá trị nhỏ nhất là 10
                                }
                            }}
                        />
                    </Grid>
                    <Grid2 />
                    {/* Cột Số lượng sản phẩm */}
                    <Grid item xs={5}>
                        <TextField
                            label="Số lượng sản phẩm"
                            value={productQuantity}
                            onChange={handleQuantityInputChange}
                            onBlur={() => {
                                // Nếu người dùng xóa hoặc nhập giá trị nhỏ hơn 1, đặt lại giá trị mặc định là 1
                                if (!productQuantity || productQuantity < 1) {
                                    setProductQuantity(1); // Giá trị mặc định là 1
                                }
                            }}
                            fullWidth
                            InputProps={{
                                sx: {
                                    border: 'none',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                    },
                                },
                                inputProps: {
                                    min: 1 // Giới hạn số lượng nhỏ nhất là 1
                                }
                            }}
                        />
                    </Grid>
                </Grid>


                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ margin: '20px 0' }}
                />
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Thêm sản phẩm'}
                </Button>
            </form>
        </Box>
    );
};

export default AddProduct;
