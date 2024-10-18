import React, { useState, useEffect } from 'react';
import { db } from '../Account/firebaseConfig'; // Đường dẫn đến cấu hình Firebase của bạn
import { collection, query, where, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, Slider, Grid, CircularProgress } from '@mui/material';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(100);
    const [productQty, setproductQty] = useState(10);
    const [productBrand, setProductBrand] = useState('');
    const [productColor, setProductColor] = useState('');
    const [productOrigin, setProductOrigin] = useState(null);
    const [productDescription, setProductDescription] = useState('');

    const [productImg, setProductImg] = useState(null);
    const [productImgDetail, setProductImgDetail] = useState(null);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [brand, setBrand] = useState([]); // Danh sách danh mục
    const [selectedCategory, setSelectedCategory] = useState(''); // Danh mục được chọn
    const [isLoading, setIsLoading] = useState(false);
    const [isDuplicateName, setIsDuplicateName] = useState(false);

    // Lấy danh sách danh mục từ Firestore
    const fetchCategories = async () => {
        const querySnapshot = await getDocs(collection(db, 'brand'));
        const brandData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setBrand(brandData);
    };

    // Gọi hàm fetchCategories khi component được render
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        setProductImg(e.target.files[0]);
    };

    const handleImageDetailChange = (e) => {
        setProductImgDetail(e.target.files[0]);
    };

    // Kiểm tra tên sản phẩm trong khi nhập
    useEffect(() => {
        const checkDuplicateProductName = async () => {
            if (!productName) {
                setIsDuplicateName(false);
                return;
            }

            const q = query(collection(db, 'products'), where('name', '==', productName.toLowerCase()));
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

        if (!productName || !productImg) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin sản phẩm, chọn ảnh và danh mục.');
            return;
        }

        setIsLoading(true);

        try {


            // Tải ảnh lên Firebase Storage
            const storage = getStorage();
            const imageRef = ref(storage, `music-products/${productImg.name}`);
            await uploadBytes(imageRef, productImg);
            const imageUrl = await getDownloadURL(imageRef);

            const imageDetailUrl = "";
            if (productImgDetail != null) {
                const imageDetailRef = ref(storage, `music-products/${productImgDetail.name}`);
                await uploadBytes(imageDetailRef, productImgDetail);
                imageDetailUrl = await getDownloadURL(imageDetailRef);
            }

            const idPro = Date.now().toString();

            await setDoc(doc(db, "music-products", idPro), {
                id: idPro,
                name: productName,
                price: productPrice,
                img: imageUrl,
                imgDetail: imageDetailUrl,
                qty: productQty,
                brand: productBrand,
                color: productColor,
                origin: productOrigin,
                description: productDescription,
            })

            // Hiện thông báo thành công
            alert('Sản phẩm đã được thêm thành công!');

            // Reset các trường đã nhập
            setProductName('');
            setProductDescription('');
            setProductPrice(1000);
            setproductQty(10);
            setProductImg(null);
            setProductImgDetail(null);
            setProductBrand('');
            setProductColor('');

            setSelectedCategory('');
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
        setproductQty(newValue);
    };

    // Hàm xử lý thay đổi giá trị bằng nhập liệu trực tiếp cho giá
    const handlePriceInputChange = (e) => {
        const value = e.target.value === '' ? '' : Number(e.target.value);
        setProductPrice(value);
    };

    // Hàm xử lý thay đổi giá trị bằng nhập liệu trực tiếp cho số lượng
    const handleQuantityInputChange = (e) => {
        const value = e.target.value === '' ? '' : Number(e.target.value);
        setproductQty(value);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Thêm sản phẩm
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Tên nhạc cụ"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    label="Giá (VND)"
                    fullWidth
                    value={productPrice}
                    onChange={handlePriceInputChange}
                    margin="normal"
                    required
                    InputProps={{
                        inputProps: { min: 10 }
                    }}
                />

                <TextField
                    label="Số lượng (Quantity)"
                    fullWidth
                    value={productQty}
                    onChange={handleQuantityInputChange}
                    margin="normal"
                    InputProps={{
                        inputProps: { min: 1 }
                    }}
                />

                <TextField
                    label="Thương hiệu (Brand)"
                    fullWidth
                    value={productBrand}
                    onChange={(e) => setProductBrand(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    label="Màu sắc (Color)"
                    fullWidth
                    value={productColor}
                    onChange={(e) => setProductColor(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Xuất xứ (Origin)"
                    fullWidth
                    value={productOrigin}
                    onChange={(e) => setProductOrigin(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Mô tả (Description)"
                    fullWidth
                    multiline
                    rows={4}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    margin="normal"
                />

                <Typography variant="h6" gutterBottom>
                    Hình ảnh
                </Typography>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ margin: '10px 0' }}
                />
                {productImg && <img src={productImg} alt="Piano" style={{ maxWidth: '100%' }} />}

                <Typography variant="h6" gutterBottom>
                    Hình ảnh chi tiết
                </Typography>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageDetailChange}
                    style={{ margin: '10px 0' }}
                />
                {productImgDetail && <img src={productImgDetail} alt="Piano Detail" style={{ maxWidth: '100%' }} />}

                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Thêm sản phẩm'}
                </Button>
            </form>
        </Box>

    );
};

export default AddProduct;
