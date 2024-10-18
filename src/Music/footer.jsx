import React from 'react';
import { Box, Typography, Grid, IconButton, Divider, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#212121', color: '#fff', padding: '50px 30px' }}>
            <Grid container spacing={4} justifyContent="center">
                {/* Column 1: Company Info */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                        <MusicNoteIcon sx={{ marginRight: 1 }} />
                        MusicStore
                    </Typography>
                    <Typography variant="body2">
                        Your one-stop shop for the best musical instruments. Whether you're a beginner or a professional, we have the perfect instrument for you.
                    </Typography>
                </Grid>

                {/* Column 2: Categories */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                        Categories
                    </Typography>
                    <Link href="/piano" color="inherit" underline="none">
                        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                            Pianos
                        </Typography>
                    </Link>
                    <Link href="/guitar" color="inherit" underline="none">
                        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                            Guitars
                        </Typography>
                    </Link>
                    <Link href="/drums" color="inherit" underline="none">
                        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                            Drums
                        </Typography>
                    </Link>
                    <Link href="/strings" color="inherit" underline="none">
                        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                            String Instruments
                        </Typography>
                    </Link>
                </Grid>

                {/* Column 3: Customer Service */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                        Customer Service
                    </Typography>
                    <Link href="/contact" color="inherit" underline="none">
                        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                            Contact Us
                        </Typography>
                    </Link>
                    <Link href="/faq" color="inherit" underline="none">
                        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                            FAQ
                        </Typography>
                    </Link>
                    <Link href="/shipping" color="inherit" underline="none">
                        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                            Shipping & Returns
                        </Typography>
                    </Link>
                    <Link href="/support" color="inherit" underline="none">
                        <Typography variant="body2">
                            Support
                        </Typography>
                    </Link>
                </Grid>
            </Grid>

            <Divider sx={{ backgroundColor: '#616161', margin: '40px 0' }} />

            {/* Social Media */}
            <Box textAlign="center">
                <Typography variant="h6" gutterBottom>
                    Follow Us
                </Typography>
                <IconButton sx={{ color: '#fff' }} href="https://facebook.com">
                    <FacebookIcon />
                </IconButton>
                <IconButton sx={{ color: '#fff' }} href="https://twitter.com">
                    <TwitterIcon />
                </IconButton>
                <IconButton sx={{ color: '#fff' }} href="https://instagram.com">
                    <InstagramIcon />
                </IconButton>
                <IconButton sx={{ color: '#fff' }} href="https://youtube.com">
                    <YouTubeIcon />
                </IconButton>
            </Box>

            {/* Copyright */}
            <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                <Typography variant="body2">
                    © 2024 MusicStore. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
