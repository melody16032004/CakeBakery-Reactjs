import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Import the arrow icon

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);

    const handleMenuOpen = (event, menu) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(menu);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpenMenu(null);
    };

    const categories = [
        { label: "ĐÀN PIANO", subCategories: ["Steinway & Sons", "Kawai", "Yamaha", "Piano điện Roland", "Piano điện Casio"] },
        { label: "GUITAR", subCategories: ["Acoustic Guitar", "Classic Guitar", "Electronic Guitar", "Ukulele"] },
        { label: "VIOLIN", subCategories: ["Violin Yamaha", "Violin Amati", "Violin Scott"] },
        // Add other categories here
    ];

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#FFD700', // Yellow background like the image
                color: 'black',
                padding: '10px',
                alignItems: 'center',
                maxWidth: 'auto',
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

                <Box sx={{ display: 'flex', gap: 5 }}>
                    {categories.map((category, index) => (
                        <Box
                            key={index}
                            onMouseEnter={(event) => handleMenuOpen(event, index)}  // Open menu on hover
                            onMouseLeave={handleMenuClose}                          // Close menu when mouse leaves
                        >
                            <Button
                                sx={{ color: 'black', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                            >
                                {category.label}
                                <KeyboardArrowDownIcon sx={{ ml: 1 }} />  {/* Add the arrow icon */}
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu === index}
                                onClose={handleMenuClose}
                                MenuListProps={{ onMouseLeave: handleMenuClose }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                PaperProps={{
                                    sx: {
                                        maxHeight: '300px',  // Max height to trigger scrolling
                                        overflowY: 'auto',   // Allow vertical scrolling
                                        '&::-webkit-scrollbar': {
                                            width: '0px',      // Always hide scrollbar in WebKit browsers
                                            background: 'transparent',  // Ensure no background for scrollbar
                                        },
                                        '-ms-overflow-style': 'none',  // IE and Edge hide scrollbar
                                        'scrollbar-width': 'none',     // Hide scrollbar in Firefox
                                    },
                                }}
                            >
                                {category.subCategories.map((sub, i) => (
                                    <MenuItem key={i} onClick={handleMenuClose}>
                                        <Link to={`/${sub.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none', color: 'black' }}>
                                            {sub}
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
