import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddProduct from '../components/AddProduct'; // Component thêm sản phẩm
import ProductList from '../components/ListProduct'; // Component hiển thị danh sách sản phẩm
import CreateCategory from '../components/CreateCategory';
import InvoiceList from '../components/InvoiceList';
import UserAccountManagement from '../components/UserManagement';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(() => {
        // Đọc trạng thái từ localStorage, nếu không có thì mặc định là false
        const savedState = localStorage.getItem('drawerOpen');
        return savedState === 'true'; // Chuyển đổi từ string sang boolean
    });

    const [selectedPage, setSelectedPage] = useState('products'); // State để lưu trang đang chọn

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen); // Đảo ngược trạng thái của sidebar
    };

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            alert('Đăng xuất thành công');
            navigate('/navigation');
            // Bạn có thể chuyển hướng người dùng về trang đăng nhập hoặc cập nhật trạng thái UI
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };

    // Lưu trạng thái sidebar vào localStorage mỗi khi nó thay đổi
    useEffect(() => {
        localStorage.setItem('drawerOpen', drawerOpen);
    }, [drawerOpen]);

    const handleListItemClick = (page) => {
        setSelectedPage(page); // Cập nhật trang đang chọn
        // setDrawerOpen(false); // Đóng drawer khi chọn trang
    };

    const renderContent = () => {
        switch (selectedPage) {
            case 'products':
                return <ProductList setSelectedPage={setSelectedPage} />;
            case 'add':
                return <AddProduct />;
            case 'addCategory':
                return <CreateCategory />;
            case 'invoices':
                return <InvoiceList />;
            case 'users':
                return <UserAccountManagement />;
            default:
                return <ProductList setSelectedPage={setSelectedPage} />;
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#4CAF50' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div
                        onClick={toggleDrawer}
                        style={{
                            backgroundColor: 'transparent',
                            borderRadius: '50%',
                            padding: '5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '40px',
                            width: '40px',
                            border: '1px solid white',
                            transition: 'margin 0.3s ease',
                            marginLeft: drawerOpen ? '240px' : '0',
                        }}
                    >
                        <i className="fa fa-bars" aria-hidden="true" style={{ color: 'white' }}></i>
                    </div>
                    <Typography variant="h6" noWrap sx={{ marginLeft: '16px', color: 'white' }}>
                        Quản lý Cửa hàng Bánh Ngọt
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="contained" color="inherit" onClick={() => handleLogout()}
                            sx={{
                                color: 'black',
                                border: 'solid 2px white',
                                height: '65px',
                                scale: '0.7',
                                borderRadius: '50%',
                            }}>
                            <i className="fa fa-sign-out" aria-hidden="true" style={{ scale: '2' }} />
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer variant="persistent" anchor="left" open={drawerOpen} sx={{ flexShrink: 0 }}>
                <Toolbar sx={{ backgroundColor: '#4CAF50' }} />
                <Box sx={{ width: 240, backgroundColor: '#4CAF50', height: '100%' }}>
                    <List>
                        <ListItem button onClick={() => handleListItemClick('products')} sx={{ color: 'white' }}>
                            <ListItemText primary={<><i className="fa fa-list" aria-hidden="true"></i> Danh sách sản phẩm</>} />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('invoices')} sx={{ color: 'white' }}>
                            <ListItemText primary={<><i className="fa fa-list" aria-hidden="true"></i> Danh sách đơn hàng</>} />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('users')} sx={{ color: 'white' }}>
                            <ListItemText primary={<><i className="fa fa-list" aria-hidden="true"></i> Danh sách người dùng</>} />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('add')} sx={{ color: 'white' }}>
                            <ListItemText primary={<><i className="fa fa-plus" aria-hidden="true"></i> Thêm sản phẩm</>} />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('addCategory')} sx={{ color: 'white' }}>
                            <ListItemText primary={<><i className="fa fa-plus" aria-hidden="true"></i> Thêm danh mục</>} />
                        </ListItem>
                    </List>
                    <Box sx={{ alignItems: 'end' }} />



                </Box>

            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    transition: 'margin 0.3s ease',
                    marginLeft: drawerOpen ? '240px' : '0',
                }}
            >
                <Toolbar />
                {renderContent()} {/* Hiển thị nội dung tương ứng với trang đã chọn */}
            </Box>
            <div
                onClick={toggleDrawer}
                style={{
                    position: 'fixed',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'transparent',
                    borderRadius: '50%',
                    padding: '5px',
                    cursor: 'pointer',
                    zIndex: 1000,
                    height: '40px',
                    width: '40px',
                }}
            >
                <i className="fa fa-bars" aria-hidden="true" style={{ color: 'white' }}></i>
            </div>
        </Box>
    );
};

export default AdminDashboard;
