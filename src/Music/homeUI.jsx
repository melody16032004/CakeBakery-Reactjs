import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Card, CardMedia, CardActionArea, CardContent, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar, faDrum, faMusic, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import Footer from './footer';
import ImageSlider from './imageSlide';
import { Link } from 'react-router-dom';

const categories = [
    { title: 'ĐÀN GUITAR', img: 'category-guitar.png', url: '/guitar' },
    { title: 'ĐÀN PIANO', img: 'category-piano.png', url: '/piano' },

    { title: 'NHẠC CỤ DÂY', img: 'category-violin.png', url: '/violin' },
];
const sheets = [
    { title: 'CLASSIC', img: 'Fur-Elise-demo.jpg' },
    { title: 'MODERN', img: 'Ben-tren-tang-lau-demo.jpg' },
    // { title: 'NHẠC CỤ DÂY', img: 'category-violin.png' },
];
const HomeUI = () => {
    return (
        <>
            <ImageSlider />
            {/* Bán đàn */}
            <Box sx={{ padding: '150px 150px 50px 150px' }}>
                <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                    NHẠC CỤ
                </Typography>
                <Grid container spacing={3}>
                    {categories.map((category, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ position: 'relative' }}>
                                <Link to={category.url} style={{ textDecoration: 'none' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={`img/music/${category.img}`} // Path to your images
                                            alt={category.title}
                                            sx={{ filter: 'brightness(70%)' }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                padding: '10px',
                                                color: 'white',
                                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {category.title}
                                            </Typography>
                                        </Box>

                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Bán sheet nhạc */}
            <Box sx={{ padding: '50px 150px 50px' }}>
                <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                    Sheet nhạc PIANO
                </Typography>
                <Grid container spacing={3}>
                    {sheets.map((sheet, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ position: 'relative' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={`img/music/${sheet.img}`}
                                        alt={sheet.title}
                                        sx={{ objectFit: 'contain' }} />

                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            padding: '10px',
                                            color: 'white',
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                        }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            {sheet.title}
                                        </Typography>
                                    </Box>

                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>

    );
};

export default HomeUI;
