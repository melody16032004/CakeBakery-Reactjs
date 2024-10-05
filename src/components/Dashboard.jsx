import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid, Card, CardContent, Typography, Box, Paper } from '@mui/material';
import { People, ShoppingCart, AttachMoney } from '@mui/icons-material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    // Dữ liệu ví dụ cho biểu đồ
    const data = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
        datasets: [
            {
                label: 'Doanh thu (VND)',
                data: [1200000, 1900000, 3000000, 5000000, 2000000],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Doanh thu hàng tháng',
            },
        },
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            <Grid container spacing={4}>
                {/* Thẻ thông tin số lượng người dùng */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
                        <CardContent>
                            <People sx={{ fontSize: 40 }} />
                            <Typography variant="h6">Số lượng người dùng</Typography>
                            <Typography variant="h3">1,500</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Thẻ thông tin số lượng sản phẩm */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: '#388e3c', color: '#fff' }}>
                        <CardContent>
                            <ShoppingCart sx={{ fontSize: 40 }} />
                            <Typography variant="h6">Số lượng sản phẩm</Typography>
                            <Typography variant="h3">120</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Thẻ thông tin doanh thu */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
                        <CardContent>
                            <People sx={{ fontSize: 40 }} />
                            <Typography variant="h6">Số lượng người dùng</Typography>
                            <Typography variant="h3">1,500</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Biểu đồ doanh thu */}
                <Grid item xs={12}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Biểu đồ doanh thu
                        </Typography>
                        <Bar data={data} options={options} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
