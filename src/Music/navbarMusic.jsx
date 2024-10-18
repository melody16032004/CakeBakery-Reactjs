import Navbar from "./navbar";
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, InputBase } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle, faHeadphones, faGuitar, faMusic, faKeyboard, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NavbarHeader = ({ handleLogin, handleLogout, isLoggedIn }) => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollPos, setLastScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const isScrollingUp = lastScrollPos > currentScrollPos;

            setShowNavbar(isScrollingUp || currentScrollPos < 50); // Hiện navbar khi scroll lên hoặc ở vị trí đầu trang
            setLastScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPos]);

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#303030',
                transition: 'top 0.3s',
                top: showNavbar ? '0' : '-90px',  // Điều chỉnh vị trí navbar khi scroll
                zIndex: 1100,
            }}>
            <Box sx={{ padding: { xs: '10px', sm: '10px' }, }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Logo và tên thương hiệu */}
                    <Typography variant="h6" noWrap sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        {/* Vòng tròn bao quanh logo */}
                        <Box
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: '50%',
                                height: '60px',
                                width: '60px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                mr: 2,
                            }}
                        >
                            <img src="img/music/logo.png" alt="Music Store Logo" style={{ height: '80px' }} />
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Roboto, sans-serif' }}
                        >
                            MusicStore
                        </Typography>
                        <gap style={{ width: '100px' }} />
                        {/* Search Bar */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '30px',
                                overflow: 'hidden',
                                width: { xs: '100%', sm: '500px' },
                                height: '40px',
                                mx: 2,
                                backgroundColor: 'white',
                                border: 'none',
                            }}>
                            <InputBase
                                sx={{
                                    flex: 1,
                                    padding: '0 20px',
                                    fontSize: '14px',
                                    color: 'black',
                                    '&::placeholder': {
                                        color: 'grey',  // Placeholder màu trắng nhạt
                                    },
                                }}
                                placeholder="Tìm kiếm sản phẩm, khóa học..."
                            />
                            <Button
                                type="submit"
                                sx={{
                                    backgroundColor: '#FFD700',
                                    marginTop: '1px',
                                    border: 'none',
                                    borderRadius: 0,
                                    width: '50px',
                                    height: '100%',
                                    '&:hover': {
                                        backgroundColor: '#ff9900',
                                    },
                                }}
                            >
                                <FontAwesomeIcon icon={faSearch} color='black' />
                            </Button>
                        </Box>
                    </Typography>

                    {/* Cart và User */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button color="inherit" sx={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </Button>

                        {isLoggedIn ? (
                            <Button sx={{ color: 'white', display: 'flex', alignItems: 'center' }} onClick={handleLogout}>
                                <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: '8px' }} />
                                Logout
                            </Button>
                        ) : (
                            <Button sx={{ color: 'white', display: 'flex', alignItems: 'center' }} onClick={handleLogin}>
                                <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: '8px' }} />
                                Login
                            </Button>
                        )}
                    </Box>

                </Toolbar>
            </Box>
            <Navbar />
        </AppBar>

    );
};

export default NavbarHeader;
