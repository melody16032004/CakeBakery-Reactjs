import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import firebaseInstance from './Firebase Singleton Pattern/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Input } from '@mui/material';

const SimilarProducts = ({ currentProductId, currentCategoryId }) => {
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true); // Open the dialog
    };

    const handleClose = () => {
        setOpen(false); // Close the dialog
    };

    // Hàm lấy sản phẩm tương tự từ cùng danh mục
    const fetchSimilarProducts = async () => {
        if (!currentCategoryId) return;

        // Lấy tất cả sản phẩm có categoryId giống với sản phẩm hiện tại
        const q = query(
            collection(firebaseInstance.db, 'products'),
            where('categoryId', '==', currentCategoryId)
        );

        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            // Loại bỏ sản phẩm hiện tại khỏi danh sách tương tự
            .filter(product => product.id !== currentProductId);

        setSimilarProducts(products);
    };

    useEffect(() => {
        fetchSimilarProducts();
    }, [currentCategoryId, currentProductId]);

    return (
        <section className="similar_product_area p_100">
            <div className="container">
                <div className="main_title">
                    <h2>Sản phẩm tương tự</h2>
                </div>
                {/* <div className="row similar_product_inner">
                    {similarProducts.map(product => (
                        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                            <div className="product_item">
                                <h4>{product.name}</h4>
                                <p>Giá: {product.price}</p>
                            </div>
                        </div>
                    ))}
                </div> */}
                <div className="cake_feature_row row">
                    {/* {productList} */}
                    {similarProducts.slice(0, 4).map((product, index) => (
                        <div key={index} className="col-lg-3 col-md-4 col-6">
                            <div className="cake_feature_item">
                                <div className="cake_img">
                                    <img
                                        src={product.imageUrl}
                                        alt=""
                                        // onClick={product.quantity > 0 ? handleClick : undefined}
                                        style={{ cursor: product.quantity === 0 ? 'not-allowed' : 'pointer' }}
                                    />
                                </div>
                                <div className="cake_text">
                                    {/* <h4>
                                            <CurrencyConverter usdAmount={product.price} />
                                        </h4> */}
                                    <h3 style={{
                                        maxWidth: 270,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        textAlign: "center",
                                        margin: "0 20px 30px 20px",
                                    }}>
                                        <strong>
                                            {product.name}
                                        </strong>
                                    </h3>
                                    <Link
                                        to="/product-details"
                                        className="pest_btn"
                                        state={{
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            image: product.image,
                                            image_L: product.imageUrl,
                                            description: product.description,
                                            quantity: product.quantity
                                        }}
                                    >
                                        Xem
                                    </Link>

                                </div>
                            </div>

                            <Dialog
                                open={open}
                                onClose={handleClose}
                            >

                                <DialogTitle>{product.name}</DialogTitle>
                                <DialogContent>
                                    {/* Large Product Image */}
                                    <img src={product.image_L} alt={product.name} style={{ width: '100%' }} />

                                    {/* Product Price */}
                                    <Typography variant="body1" color="info" sx={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                                        Price: ${product.price}
                                    </Typography>

                                    {/* Product Description Section (Non-editable Input) */}
                                    <div style={{ marginTop: '16px' }}>
                                        <Typography variant="h6">Description</Typography>
                                        <Input
                                            type="text"
                                            value={product.description && product.description.length > 115 ? `${product.description.slice(0, 50)}...` : product.description || 'empty'}
                                            fullWidth
                                            multiline
                                            disabled // This disables the input field, making it non-clickable and non-editable
                                            inputProps={{
                                                style: { color: 'black', cursor: 'default' } // Style to ensure it doesn't look 'disabled'
                                            }}
                                        />
                                    </div>
                                </DialogContent>

                                <DialogActions>
                                    <Button
                                    // onClick={handleClick}
                                    >
                                        View
                                        {/* <Link to='/product-details'>
                            View
                        </Link> */}
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SimilarProducts;
