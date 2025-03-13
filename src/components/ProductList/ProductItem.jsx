import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Button, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import CurrencyConverter from '../../components/CurrencyConverter';
import EditProduct from '../EditProduct/EditProduct';

const ProductItem = ({ product, selected, onSelect, onDelete }) => {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Card sx={{
            p: 2,
            border: '1px solid',
            borderColor: selected ? 'primary.main' : 'grey.300',
            borderRadius: 2,
            transition: 'all 0.3s ease-in-out',
            // marginBottom: 2,
            '&:hover': {
                boxShadow: 3,
                transform: 'translateY(-5px)', // Di chuyển lên 5px khi hover
                borderColor: 'primary.main',
            },
            cursor: 'pointer',
        }}>

            <CardContent sx={{ display: 'flex', flexShrink: 0, alignItems: 'flex-start', padding: '0px' }}>
                <Checkbox checked={selected} onChange={onSelect} sx={{ marginRight: 2 }} />
                <Box sx={{ flexGrow: 1, position: 'relative' }}>
                    <CardMedia
                        component="img"
                        image={product.imageUrl}
                        alt={product.name}
                        sx={{
                            width: '190px', // Ảnh sẽ full chiều rộng của Box chứa nó
                            height: '140px', // Chiều cao cố định
                            objectFit: 'cover', // Cắt ảnh để vừa khung mà không méo
                            borderRadius: '8px' // Bo góc nhẹ cho đẹp
                        }}
                    />

                    <Box
                        sx={{
                            paddingTop: '5px',
                            maxWidth: '50%',
                            margin: '5px auto',
                            textAlign: 'left',
                            overflow: 'hidden',
                            display: 'inline',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        <Typography
                            variant="h7"

                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontWeight: 'bold',
                                color: '#fc7da5'
                            }}
                        >
                            {product.name}
                        </Typography>
                    </Box>


                    <Box sx={{ color: 'primary' }}>
                        Giá: <CurrencyConverter usdAmount={product.price} />
                    </Box>
                </Box>


            </CardContent>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: "20px" }}>
                <Button variant="outlined" color="primary" onClick={() => setOpenDialog(true)}>
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Box sx={{ width: '40px' }} />
                <Button variant="outlined" color="error" onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Box>

            {/* Dialog sửa sản phẩm */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Sửa sản phẩm</DialogTitle>
                <DialogContent>
                    <EditProduct product={product} onClose={() => setOpenDialog(false)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">Hủy</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default ProductItem;
