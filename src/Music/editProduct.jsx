import React, { useState, useEffect } from 'react';
import { db, storage } from '../Account/firebaseConfig'; // Đường dẫn đến cấu hình Firebase của bạn
import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { BorderAll, Grid3x3 } from '@mui/icons-material';

const EditProduct = ({ product, onClose, fetchProducts }) => {
    const [productName, setProductName] = useState(product.name);
    const [productDescription, setProductDescription] = useState(product.description);
    const [productPrice, setProductPrice] = useState(product.price);
    const [productQuantity, setProductQuantity] = useState(product.qty);
    const [productBrand, setProductBrand] = useState(product.brand);
    const [productColor, setProductColor] = useState(product.color);
    const [productOrigin, setProductOrigin] = useState(product.origin);
    const [img, setImg] = useState(product.img);
    const [imgDetail, setImgDetail] = useState(product.imgDetail);

    const [selectedCategory, setSelectedCategory] = useState(product.categoryId);
    const [categories, setCategories] = useState([]);


    // Lấy danh sách danh mục từ Firestore
    const fetchCategories = async () => {
        const querySnapshot = await getDocs(collection(db, 'categories'));
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
        setImg(e.target.files[0]); // Lưu tệp hình ảnh vào state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let newImg = img;
            let newImgDetail = imgDetail;

            // Nếu có tệp hình ảnh mới, tải lên Firebase Storage
            if (setImg) {
                const storageRefImg = ref(storageRefImg, `music-products/${setImg.name}`);
                await uploadBytes(storageRefImg, setImg);
                newImg = await getDownloadURL(storageRefImg);
            }
            if (setImgDetail) {
                const storageRefImgDetail = ref(storage, `music-products/${setImgDetail.name}`);
                await uploadBytes(storageRefImgDetail, setImgDetail);
                newImgDetail = await getDownloadURL(storageRefImgDetail);
            }

            // Cập nhật sản phẩm trong Firestore
            await updateDoc(doc(db, 'music-products', product.id), {
                // name: productName,
                // description: productDescription,
                // price: productPrice,
                // quantity: productQuantity,
                // categoryId: selectedCategory,
                // imageUrl: newImg,

                id: product.id,
                name: productName,
                price: productPrice,
                qty: productQuantity,
                brand: product.brand,
                color: productColor,
                origin: productOrigin,
                description: productDescription,
                img: img,
                imgDetail: imgDetail,
                // id: idPro,
                // name: productName,
                // price: productPrice,
                // img: imageUrl,
                // imgDetail: imageDetailUrl,
                // qty: productQty,
                // brand: productBrand,
                // color: productColor,
                // origin: productOrigin,
                // description: productDescription,
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControl>
                        <TextField
                            label="Màu sắc"
                            fullWidth
                            value={productColor}
                            onChange={(e) => setProductColor(e.target.value)}
                            margin="normal"
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            label="Xuất xứ"
                            fullWidth
                            value={productOrigin}
                            onChange={(e) => setProductOrigin(e.target.value)}
                            margin="normal"
                        />
                    </FormControl>
                </Box>








                {/* Chọn danh mục sản phẩm */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="category-label">Chọn thương hiệu</InputLabel>
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
                {img && <img src={img} alt="Hình ảnh sản phẩm" style={{ maxWidth: '100%', margin: '10px 0' }} />}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ margin: '16px 0' }}
                />

                {imgDetail && <img src={imgDetail} alt="Hình ảnh sản phẩm" style={{ maxWidth: '100%', margin: '10px 0' }} />}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ margin: '16px 0' }}
                />


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
