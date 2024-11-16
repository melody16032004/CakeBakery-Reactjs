import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../Account/firebaseConfig';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material'; // Thêm thành phần Select
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
} from '@mui/material';
import CurrencyConverter from './CurrencyConverter';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [startDate, setStartDate] = useState(null); // Lưu ngày bắt đầu lọc
    const [endDate, setEndDate] = useState(null);
    const [statusFilter, setStatusFilter] = useState('Tất cả');

    const fetchInvoices = async () => {
        const querySnapshot = await getDocs(collection(db, 'invoices'));
        const invoicesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setInvoices(invoicesData);
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'invoices', id));
            alert('Đơn hàng đã được xóa thành công!');
            fetchInvoices();
        } catch (error) {
            console.error('Lỗi khi xóa đơn hàng:', error);
            alert('Đã xảy ra lỗi khi xóa đơn hàng.');
        }
    };

    const handleOpenDialog = (invoice) => {
        setSelectedInvoice(invoice);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedInvoice(null);
    };

    const confirmDelete = () => {
        handleDelete(selectedInvoice.id);
        handleCloseDialog();
    };

    const handleOpenDetailDialog = (invoice) => {
        setSelectedInvoice(invoice);
        setOpenDetailDialog(true);
    };

    const handleCloseDetailDialog = () => {
        setOpenDetailDialog(false);
        setSelectedInvoice(null);
    };

    // Thêm hàm cập nhật trạng thái đơn hàng
    const handleConfirmShipping = async (invoiceId) => {
        try {
            const invoiceRef = doc(db, 'invoices', invoiceId); // Lấy tham chiếu đến tài liệu hóa đơn
            await updateDoc(invoiceRef, { status: 'Đang vận chuyển' }); // Cập nhật trạng thái thành "Đang vận chuyển"
            alert('Trạng thái đơn hàng đã được chuyển sang "Đang vận chuyển"');
            fetchInvoices(); // Tải lại danh sách đơn hàng sau khi cập nhật
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
            alert('Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng.');
        }
    };

    const formatCreatedAt = (timestamp) => {
        if (!timestamp) return ''; // Kiểm tra nếu không có timestamp

        // Chuyển đổi timestamp thành Date
        const date = timestamp.toDate();

        // Định dạng ngày theo kiểu mong muốn
        return format(date, 'dd/MM/yyyy HH:mm:ss'); // Thay đổi định dạng theo ý bạn
    };

    // Hàm lọc hóa đơn dựa trên ngày và trạng thái
    const filteredInvoices = invoices.filter(invoice => {
        const createdAtDate = invoice.createdAt.toDate(); // Chuyển timestamp thành Date

        // Kiểm tra nếu người dùng đã chọn ngày lọc
        const isAfterStart = startDate ? createdAtDate >= startDate : true;
        const isBeforeEnd = endDate ? createdAtDate <= endDate : true;

        // Lọc theo trạng thái đơn hàng
        const matchesStatus = statusFilter === 'Tất cả' || invoice.status === statusFilter;

        return isAfterStart && isBeforeEnd && matchesStatus; // Lọc theo khoảng thời gian và trạng thái
    });


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Quản lý đơn hàng
                </Typography>

                {/* Bộ lọc ngày và trạng thái */}
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                    <DatePicker
                        label="Ngày bắt đầu"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        label="Ngày kết thúc"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    {/* Thêm bộ lọc trạng thái đơn hàng */}
                    <FormControl fullWidth>
                        <InputLabel id="status-filter-label">Trạng thái</InputLabel>
                        <Select
                            labelId="status-filter-label"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            label="Trạng thái"
                            InputProps={{
                                style: {
                                    border: 'none',
                                },
                            }}
                        >
                            <MenuItem value="Tất cả">Tất cả</MenuItem>
                            <MenuItem value="Đã giao">Đã giao</MenuItem>
                            <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
                            <MenuItem value="Đang vận chuyển">Đang vận chuyển</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Grid container spacing={3}>
                    {filteredInvoices.map((invoice) => (
                        <Grid item xs={12} sm={6} md={4} key={invoice.id}>
                            <Card variant="outlined" sx={{ padding: 2, borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Khách hàng: {invoice.firstName}
                                    </Typography>
                                    <Typography variant='body1' color='textDisabled'>
                                        Mã đơn: <strong>#{invoice.id}</strong>
                                    </Typography>
                                    <Typography variant="body1" color="textDisabled">
                                        Tổng số tiền: <strong>{invoice.total.toLocaleString('vi-VN')} VND</strong>
                                    </Typography>

                                    <Typography variant="body1" color="textDisabled">
                                        Ngày tạo: <strong>{formatCreatedAt(invoice.createdAt)}</strong>
                                    </Typography>
                                    <Typography variant="body2" color={invoice.status === "Đã giao" ? "green" : invoice.status === "Đang xử lý" ? "red" : "orange"}>

                                        Trạng thái: {invoice.status}
                                    </Typography>
                                    {invoice.status === 'Đang vận chuyển' ? (
                                        <>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleOpenDetailDialog(invoice)}
                                                sx={{ marginTop: 2, marginRight: 1 }}
                                            >
                                                Xem chi tiết
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="grey"
                                                disabled
                                                onClick={() => handleOpenDialog(invoice)}
                                                sx={{ marginTop: 2 }}
                                            >
                                                Xóa
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="grey"
                                                disabled
                                                sx={{ marginTop: 2 }}
                                            >
                                                Xác nhận
                                            </Button>
                                        </>
                                    ) : invoice.status === 'Đã giao' ? (
                                        <>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleOpenDetailDialog(invoice)}
                                                sx={{ marginTop: 2, marginRight: 1 }}
                                            >
                                                Xem chi tiết
                                            </Button>
                                            <Button sx={{ marginTop: 5, marginRight: 1 }} disabled />
                                            <Button sx={{ marginTop: 5, marginRight: 1 }} disabled />
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleOpenDetailDialog(invoice)}
                                                sx={{ marginTop: 2, marginRight: 1 }}
                                            >
                                                Xem chi tiết
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleOpenDialog(invoice)}
                                                sx={{ marginTop: 2 }}
                                            >
                                                Xóa
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="warning"
                                                onClick={() => handleConfirmShipping(invoice.id)}
                                                sx={{ marginTop: 2 }}
                                            >
                                                Xác nhận
                                            </Button>
                                        </>
                                    )}


                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Hộp thoại xác nhận xóa */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Xác nhận xóa</DialogTitle>
                    <DialogContent>
                        <Typography color='textPrimary'>Bạn có chắc chắn muốn xóa đơn hàng này?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">Hủy</Button>
                        <Button onClick={confirmDelete} color="error">Xóa</Button>
                    </DialogActions>
                </Dialog>

                {/* Hộp thoại chi tiết đơn hàng */}
                <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog} maxWidth="xs" fullWidth={true}>
                    <DialogTitle>Chi tiết đơn hàng</DialogTitle>
                    <DialogContent>
                        {selectedInvoice && (
                            <Box sx={{ textAlign: 'left', width: '100%' }}>
                                <Typography color='black' variant="h6">Khách hàng: {selectedInvoice.firstName} {selectedInvoice.lastName}</Typography>
                                <Typography color='textDisabled' variant='body1'>Mã đơn: <strong>#{selectedInvoice.id}</strong></Typography>
                                <Typography color='textDisabled' variant="body1">Địa chỉ: <strong>{selectedInvoice.address}</strong></Typography>
                                <Typography color='textDisabled' variant="body1">Số điện thoại: <strong>{selectedInvoice.phone}</strong></Typography>
                                <Typography color="textDisabled" variant="body1" > Ngày tạo: <strong>{formatCreatedAt(selectedInvoice.createdAt)}</strong></Typography>
                                <Typography color='textDisabled' variant="body1">Tổng số tiền: <strong> <CurrencyConverter usdAmount={(selectedInvoice.total).toFixed(2)} /></strong></Typography>
                                <Typography color={selectedInvoice.status === "Đã giao" ? "green" : selectedInvoice.status === "Đang xử lý" ? "red" : "orange"} variant="body1"> <strong>Trạng thái: {selectedInvoice.status}</strong></Typography>
                                <TextField
                                    label='Lời nhắn của khách'
                                    maxWidth
                                    value={selectedInvoice.orderNotes}
                                    // {...selectedInvoice.orderNotes === "" ? focused : null}
                                    focused={
                                        selectedInvoice.orderNotes !== "" ? true : false
                                    }
                                    multiline
                                    sx={{
                                        marginTop: '20px',
                                        width: '100%',
                                    }}>

                                </TextField>
                                <Typography color='black' variant="h6" sx={{ marginTop: 4 }}>Danh sách sản phẩm:</Typography>
                                <List>
                                    {selectedInvoice.items && Object.keys(selectedInvoice.items).length > 0 ? (
                                        Object.keys(selectedInvoice.items).map(key => (
                                            <ListItem key={key}>
                                                <ListItemText
                                                    primary={selectedInvoice.items[key].product}
                                                    secondary={`Số lượng: ${selectedInvoice.items[key].quantity}`}
                                                />
                                            </ListItem>
                                        ))
                                    ) : (
                                        <Typography variant="body2">Không có sản phẩm nào trong đơn hàng này.</Typography>
                                    )}
                                </List>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDetailDialog} color="primary">Đóng</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </LocalizationProvider>
    );
};

export default InvoiceList;
