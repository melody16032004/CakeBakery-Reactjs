import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Input } from '@mui/material';
import '../components/card.css';

const Card = ({ product, addToCart }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true); // Open the dialog
    };

    const handleClose = () => {
        setOpen(false); // Close the dialog
    };

    const handleClick = () => {
        navigate('/product-details', {
            state: {
                // id,
                // name,
                // price,
                // image,
                // image_L,
                // description,
                // quantity
            }
        });
    };
    const styles = {

    }

    return (

        <div className="col-lg-4 col-md-4 col-6" >
            {product.qty === 0 && (
                <div
                    style={{
                        position: 'absolute', // Position it over the card
                        top: '50%', // Center vertically
                        left: '50%', // Center horizontally
                        transform: 'translate(-50%, -50%)', // Adjust for perfect centering
                        backgroundColor: 'rgb(0 0 0 / 70%)', // Semi-transparent white background
                        padding: '10px 16px', // Padding for the text
                        fontSize: '20px', // Size of the watermark text
                        fontWeight: 'bold', // Bold text
                        color: 'white', // Color of the text
                        zIndex: 99, // Make sure it appears on top
                        pointerEvents: 'none', // Prevent interaction with the watermark
                        borderRadius: '10px',
                    }}
                >
                    Out of Stock
                </div>
            )}
            <div className="cake_feature_item"
                style={{
                    opacity: product.qty === 0 ? 0.3 : 1,
                    pointerEvents: product.qty === 0 ? 'none' : 'auto',
                }}>

                <div className="cake_img">
                    <img
                        src={product.img}
                        alt=""
                        onClick={product.qty > 0 ? handleClick : undefined}
                        style={{
                            cursor: product.qty === 0 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                    <button
                        className="view-btn"
                        onClick={handleClickOpen}
                        disabled={product.qty === 0}
                        style={{
                            cursor: product.qty === 0 ? 'not-allowed' : 'pointer',
                            backgroundColor: product.qty === 0 ? 'grey' : '',
                        }}>
                        Xem
                    </button>
                </div>

                <div className="cake_text">
                    <Typography color="textPrimary" sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '25px',
                        fontWeight: 'bold',
                        fontFamily: 'Poppins',
                        textDecoration: 'none',
                        color: 'red',
                    }}>
                        {product.price} VND
                    </Typography>
                    <h3>{product.name}</h3>
                    <a
                        className={`pest_btn ${product.qty === 0 ? 'disabled' : ''}`}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (product.qty > 0) {
                                addToCart(product);
                            }
                        }}
                        style={{
                            backgroundColor: product.qty === 0 ? 'grey' : '',
                            cursor: product.qty === 0 ? 'not-allowed' : 'pointer'
                        }}>
                        Add to cart
                    </a>
                </div>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{product.name}</DialogTitle>
                <DialogContent>
                    {/* Large Product Image */}
                    <img src={product.imgDetail} alt={product.name} style={{ width: '100%' }} />

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
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </div >


    );
};

export default Card