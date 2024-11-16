import React from 'react';
import { Bar } from 'react-chartjs-2';
import useProductStatistics from '../Account/use-product-statistics';

const ProductStatistics = () => {
    const statistics = useProductStatistics();

    // Chuẩn bị dữ liệu cho biểu đồ
    const data = {
        labels: Object.keys(statistics), // productId làm nhãn
        datasets: [
            {
                label: 'Số lượng bán',
                data: Object.values(statistics), // Số lượng sản phẩm tương ứng
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
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
                text: 'Thống kê sản phẩm bán được',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Thống kê sản phẩm bán được</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ProductStatistics;
