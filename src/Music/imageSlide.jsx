import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';

// Images for the carousel
// const images = [
//     'https://vietthuong.vn/image/catalog/Baner/2024/donthusang-ngan-uu-dai-home.png',
//     'https://vietthuong.vn/image/catalog/Baner/2024/giai-kho-vtm-2024.png',
//     'https://vietthuong.vn/image/catalog/Baner/2024/thayday-guitar-vietthuong.jpg',
//     'https://vietthuong.vn/image/catalog/Baner/2023/samdanfender-ldp-t03.jpg',
//     'https://vietthuong.vn/image/catalog/Baner/2023/km-tang-voucher-hoc-nhac-vt.png',
// ];
const images = [
    'img/home-slider/slider-1.jpg',
    'img/home-slider/slider-2.jpg',
    'img/home-slider/slider-3.jpg',
];

const ImageSlider = () => {
    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Enables auto-slide
        autoplaySpeed: 3000, // Time in ms between slides

    };

    return (
        <Box sx={{
            paddingBottom: '30px',
            // marginTop: '110px',
            overflowX: 'hidden',
        }}>
            <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>
                Featured Instruments
            </Typography>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <img src={image} alt={`slide-${index}`}
                            style={{
                                borderRadius: '10px',
                                maxWidth: '100%',   // Ensure the image stays within its container
                                height: '600px',     // Maintain the aspect ratio
                                display: 'block',   // Remove inline space
                                objectFit: 'cover', // Ensure the image is fully visible
                            }} />
                    </Box>
                ))}
            </Slider>
        </Box>
    );




};

export default ImageSlider;
