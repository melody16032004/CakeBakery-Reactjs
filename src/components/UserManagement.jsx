import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseInstance from '../Account/Firebase Singleton Pattern/firebaseConfig';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { Box, Button, Typography, Grid, Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

const UserAccountManagement = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [users, setUsers] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const auth = getAuth(); // Get the auth instance once
    const [loading, setLoading] = useState([]);
    const [userList, setUserList] = useState(users);
    const [currentPage, setCurrentPage] = useState(0); // Trạng thái cho trang hiện tại
    const [usersPerPage] = useState(7); // Số lượng người dùng trên mỗi trang

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                fetchUserInfo(user.uid);
            } else {
                setCurrentUser(null);
                setUserInfo(null); // Clear user info on logout
            }
        });

        return () => unsubscribe();
    }, [auth]); // Add auth to the dependency array

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/list-users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        };

        fetchUsers();
    }, []);

    // Fetch active users from Firestore
    const fetchActiveUsers = async () => {
        try {
            const activeUsersCollection = collection(firebaseInstance.db, 'activeUsers');
            const activeUsersSnapshot = await getDocs(activeUsersCollection);
            const activeUsersList = activeUsersSnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
            setActiveUsers(activeUsersList);
        } catch (error) {
            console.error('Error fetching active users:', error);
        }
    };

    // Fetch additional user info from Firestore
    const fetchUserInfo = async (uid) => {
        setLoading(true);
        try {
            const userRef = doc(firebaseInstance.db, 'users', uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserInfo(userData);
                console.log('User info fetched successfully:', userData); // Ghi log dữ liệu người dùng
                return userData; // Trả về dữ liệu người dùng nếu cần
            } else {
                console.log('No user info found in Firestore.');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            alert('Successfully logged out');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Update user activity in Firestore
    const updateActivityStatus = async (uid) => {
        await setDoc(doc(firebaseInstance.db, "activeUsers", uid), {
            isActive: true,
            lastActive: new Date(), // Update last active time
        }, { merge: true }); // Merge to avoid overwriting old data
    };



    useEffect(() => {
        const handleUserActivity = () => {
            const uid = auth.currentUser?.uid;
            if (uid) {
                updateActivityStatus(uid);
            }
        };

        window.addEventListener("mousemove", handleUserActivity);
        window.addEventListener("keydown", handleUserActivity);

        return () => {
            window.removeEventListener("mousemove", handleUserActivity);
            window.removeEventListener("keydown", handleUserActivity);
        };
    }, [auth]);

    // Fetch active users when the component mounts
    useEffect(() => {
        fetchActiveUsers(); // Fetch active users when the component mounts
    }, []);


    // Hàm để lấy danh sách người dùng từ API
    const fetchUsers = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const response = await axios.get('http://localhost:5000/list-users');
            setUserList(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    // Hàm để thay đổi trạng thái tài khoản
    const toggleUserStatus = async (uid, currentStatus) => {
        const newStatus = currentStatus === 'Enabled' ? 'Disabled' : 'Enabled';

        setLoading(true); // Bắt đầu loading
        try {
            // Gửi yêu cầu đến API để cập nhật trạng thái tài khoản
            await axios.post('http://localhost:5000/toggle-user-status', {
                uid,
                currentStatus,
            });

            // Fetch lại danh sách người dùng sau khi thay đổi trạng thái
            fetchUsers(); // Gọi lại hàm fetchUsers để cập nhật danh sách
        } catch (error) {
            console.error('Lỗi khi thay đổi trạng thái tài khoản:', error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    useEffect(() => {
        fetchUsers(); // Lấy danh sách người dùng lần đầu tiên
    }, []);

    // Tính toán người dùng cần hiển thị cho trang hiện tại
    const indexOfLastUser = (currentPage + 1) * usersPerPage; // Chỉ số cuối cùng
    const indexOfFirstUser = indexOfLastUser - usersPerPage; // Chỉ số đầu tiên
    const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser); // Người dùng hiện tại

    // Hàm để chuyển trang
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>

            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>Danh sách người dùng</Typography>

                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center', // Căn giữa theo chiều ngang
                            alignItems: 'center', // Căn giữa theo chiều dọc
                            height: '60vh', // Chiều cao 100% viewport để căn giữa hoàn toàn
                        }}
                    >
                        <CircularProgress /> {/* Hiển thị spinner khi loading */}
                    </Box>
                ) : (
                    <>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>UID</TableCell>
                                        <TableCell>Ngày tạo</TableCell>
                                        <TableCell>Trạng thái</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentUsers.map(user => (
                                        <TableRow key={user.uid}>
                                            <TableCell sx={{ color: user.status === 'Enabled' ? 'black' : 'grey' }}>
                                                {user.email}
                                            </TableCell>
                                            <TableCell sx={{ color: user.status === 'Enabled' ? 'black' : 'grey' }}>
                                                {user.uid}
                                            </TableCell>
                                            <TableCell sx={{ color: user.status === 'Enabled' ? 'black' : 'grey' }}>
                                                {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}
                                            </TableCell>
                                            <TableCell
                                                onClick={() => toggleUserStatus(user.uid, user.status)}
                                                sx={
                                                    {
                                                        color: user.status === 'Enabled' ? 'green' : 'red',
                                                        cursor: 'pointer',
                                                        textDecoration: 'underline'
                                                    }
                                                }>
                                                <strong>{user.status}</strong>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Button
                                disabled={currentPage === 0}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Trang trước
                            </Button>
                            <Typography variant='body1' color='textPrimary' sx={{ margin: '0 5px', whiteSpace: 'nowrap', }}>
                                Trang {currentPage + 1}
                            </Typography>
                            <Button
                                disabled={indexOfLastUser >= userList.length}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Trang sau
                            </Button>
                        </Box>
                    </>
                )}

            </Box>


        </div>
    );
};

export default UserAccountManagement;
