import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Input } from '@mui/material';
import './card.css';
import CurrencyConverter from "./CurrencyConverter";

const Card = ({ addToCart, id, name, price, image, image_L, description, quantity }) => {
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
                id,
                name,
                price,
                image,
                image_L,
                description,
                quantity
            }
        });
    };
    const product = {
        id,
        name,
        price,
        image,
        image_L,
        description,
    };
    const styles = {

    }

    return (


        <div className="col-lg-4 col-md-4 col-6" >
            {quantity === 0 && (
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
                        zIndex: 9, // Make sure it appears on top
                        pointerEvents: 'none', // Prevent interaction with the watermark
                        borderRadius: '10px',
                    }}
                >
                    Out of Stock
                </div>
            )}
            <div className="cake_feature_item"
                style={{
                    opacity: quantity === 0 ? 0.3 : 1, // Fade the image and card when quantity is 0
                    pointerEvents: quantity === 0 ? 'none' : 'auto', // Disable all interactions when quantity is 0
                }}>

                <div className="cake_img">
                    <img
                        src={image}
                        alt=""
                        onClick={quantity > 0 ? handleClick : undefined}
                        style={{ cursor: quantity === 0 ? 'not-allowed' : 'pointer' }}
                    />
                    <button
                        className="view-btn"
                        onClick={handleClickOpen}
                        disabled={quantity === 0}
                        style={{
                            cursor: quantity === 0 ? 'not-allowed' : 'pointer',
                            backgroundColor: quantity === 0 ? 'grey' : '',
                        }}>
                        Xem
                    </button>
                </div>

                <div className="cake_text">
                    <h4>
                        {/* ${price} */}
                        <CurrencyConverter usdAmount={price} />
                    </h4>
                    <h3>
                        <strong>
                            {name}
                        </strong>
                    </h3>
                    <a
                        className={`pest_btn ${quantity === 0 ? 'disabled' : ''}`}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (quantity > 0) {
                                addToCart(product);
                            }
                        }}
                        style={{
                            backgroundColor: quantity === 0 ? 'grey' : '',
                            cursor: quantity === 0 ? 'not-allowed' : 'pointer'
                        }}>
                        Add to cart
                    </a>
                </div>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{name}</DialogTitle>
                <DialogContent>
                    {/* Large Product Image */}
                    <img src={image_L} alt={name} style={{ width: '100%' }} />

                    {/* Product Price */}
                    {/* <Typography variant="body1" color="info" sx={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                        Price: <CurrencyConverter usdAmount={price} />
                    </Typography> */}

                    {/* Product Description Section (Non-editable Input) */}
                    <div style={{ marginTop: '16px' }}>
                        <Typography variant="h6">Description</Typography>
                        <Input
                            type="text"
                            value={description && description.length > 115 ? `${description.slice(0, 50)}...` : description || 'empty'}
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
                    <Button onClick={handleClick}>
                        View
                        {/* <Link to='/product-details'>
                            View
                        </Link> */}
                    </Button>
                </DialogActions>
            </Dialog>

        </div >


    );
};

export default Card