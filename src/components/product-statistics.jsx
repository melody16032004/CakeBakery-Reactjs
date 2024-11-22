import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Account/firebaseConfig";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    TableSortLabel,
    CircularProgress,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import { BarChart, ShowChart } from "@mui/icons-material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { styled } from "@mui/material/styles";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold", // Làm đậm chữ tiêu đề
    fontSize: "14px", // Tăng hoặc giảm kích thước chữ
    "&:first-of-type": {
        color: theme.palette.primary.main, // Đổi màu ô đầu tiên (Mã sản phẩm)
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
        backgroundColor: "#f0f8ff", // Màu nền custom
        cursor: "pointer", // Thêm con trỏ chuột
        transition: "background-color 0.3s ease", // Hiệu ứng chuyển màu
    },
    "&:active": {
        backgroundColor: "#e0e0e0", // Màu nền khi click
    },
}));

const OrderStatistics = () => {
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState("asc"); // "asc" hoặc "desc"
    const [orderBy, setOrderBy] = useState("");
    const [chartDatas, setChartDatas] = useState({});
    const [chartType, setChartType] = useState("line");

    const productIdRef = React.createRef();
    const nameRef = React.createRef();
    const quantityRef = React.createRef();

    const handleRowClick = (column) => {
        switch (column) {
            case "productId":
                productIdRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                break;
            case "name":
                nameRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                break;
            case "quantity":
                quantityRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                break;
            default:
                break;
        }
    };

    const [selectedIndex, setSelectedIndex] = useState(null);
    const handleRowClickBar = (index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "invoices"));
                const productStats = {};
                const dailyStats = {};
                const dailyOrderCount = {}; // Thống kê số lượng đơn hàng theo ngày

                querySnapshot.forEach((doc) => {
                    const order = doc.data();
                    const orderDate = new Date(order.createdAt.seconds * 1000);
                    const dateString = `${orderDate.getFullYear()}-${orderDate.getMonth() + 1}-${orderDate.getDate()}`;

                    order.items.forEach((item) => {
                        // Cập nhật thống kê sản phẩm
                        if (productStats[item.id]) {
                            productStats[item.id].quantity += item.quantity;
                        } else {
                            productStats[item.id] = { name: item.product, quantity: item.quantity };
                        }
                    });

                    // Cập nhật thống kê số lượng đơn hàng theo ngày
                    if (dailyOrderCount[dateString]) {
                        dailyOrderCount[dateString] += 1;
                    } else {
                        dailyOrderCount[dateString] = 1;
                    }
                });

                const statsArray = Object.entries(productStats).map(([productId, data]) => ({
                    productId,
                    name: data.name,
                    quantity: data.quantity,
                }));

                const sortedDates = Object.keys(dailyOrderCount).sort();
                const dailyOrderQuantities = sortedDates.map(date => dailyOrderCount[date]);

                setStatistics(statsArray);
                setChartDatas({
                    labels: sortedDates,
                    datasets: [
                        {
                            label: "Số lượng đơn hàng theo ngày",
                            data: dailyOrderQuantities,
                            borderColor: "#3e95cd",
                            fill: false,

                            backgroundColor: statistics.map((_, index) =>
                                index === selectedIndex ? "rgba(255, 99, 132, 0.7)" : "rgba(75, 192, 192, 0.2)"
                            ),
                            borderColor: statistics.map((_, index) =>
                                index === selectedIndex ? "rgba(255, 99, 132, 1)" : "rgba(75, 192, 192, 1)"
                            ),
                            borderWidth: 1,
                        },
                    ]
                });
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleSort = (property) => {
        const isAscending = orderBy === property && order === "asc";
        setOrder(isAscending ? "desc" : "asc");
        setOrderBy(property);

        const sortedData = [...statistics].sort((a, b) => {
            if (isAscending) {
                return a[property] > b[property] ? -1 : 1;
            } else {
                return a[property] < b[property] ? -1 : 1;
            }
        });

        setStatistics(sortedData);
    };

    const handleChartTypeChange = (event, newChartType) => {
        if (newChartType !== null) {
            setChartType(newChartType);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Dữ liệu biểu đồ
    const chartData = {
        labels: statistics.map((stat) => stat.name),
        datasets: [
            {
                label: "Số Lượng Bán",
                data: statistics.map((stat) => stat.quantity),
                backgroundColor: statistics.map((_, index) =>
                    index === selectedIndex ? "rgba(255, 99, 132, 0.7)" : "rgba(75, 192, 192, 0.2)"
                ),
                borderColor: statistics.map((_, index) =>
                    index === selectedIndex ? "rgba(255, 99, 132, 1)" : "rgba(75, 192, 192, 1)"
                ),
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', justifyContent: 'center', marginBottom: '50px', }}>
                Thống Kê Đơn Hàng
            </Typography>

            {/* Biểu đồ */}
            <Box mt={5} sx={{ maxWidth: "800px", margin: "auto" }}>
                <Typography variant="h5" gutterBottom>
                    Biểu đồ Thống Kê
                </Typography>
                {chartType === "line" ? (
                    <Line data={chartDatas} />
                ) : (
                    <Bar
                        data={{
                            labels: statistics.map(stat => stat.name),
                            datasets: [
                                {
                                    label: "Số lượng bán",
                                    data: statistics.map(stat => stat.quantity),
                                    backgroundColor: "#3e95cd",
                                    borderColor: "#3e95cd",
                                    backgroundColor: statistics.map((_, index) =>
                                        index === selectedIndex ? "rgba(255, 99, 132, 0.7)" : "rgba(75, 192, 192, 0.2)"
                                    ),
                                    borderColor: statistics.map((_, index) =>
                                        index === selectedIndex ? "rgba(255, 99, 132, 1)" : "rgba(75, 192, 192, 1)"
                                    ),
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "top",
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            return `${tooltipItem.raw} sản phẩm`;
                                        },
                                    },
                                },
                            },
                        }}
                    />
                )}
            </Box>

            {/* Chuyển đổi giữa các loại biểu đồ */}
            <ToggleButtonGroup
                value={chartType}
                exclusive
                onChange={handleChartTypeChange}
                aria-label="chart type"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1, // Giảm khoảng cách giữa các nút
                    mt: 2,
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                    padding: "4px 8px", // Giảm padding tổng thể
                    boxShadow: 3,
                    margin: "40px 15%",
                }}
            >
                <ToggleButton
                    value="line"
                    aria-label="line chart"
                    disableRipple
                    sx={{
                        backgroundColor: chartType === "line" ? "#3e95cd" : "#e0e0e0",
                        color: chartType === "line" ? "#fff" : "#3e95cd",
                        borderRadius: "4px",
                        padding: "4px 8px", // Giảm padding của nút
                        fontSize: "0.875rem", // Giảm kích thước chữ
                        "&:hover": {
                            backgroundColor: "#3e95cd",
                            color: "#fff",
                        },
                        transition: "background-color 0.3s, color 0.3s",
                    }}
                >
                    <ShowChart sx={{ fontSize: "18px", mr: 0.5 }} /> {/* Giảm kích thước icon */}
                    Biểu Đồ Đơn Hàng
                </ToggleButton>
                <ToggleButton
                    value="bar"
                    aria-label="bar chart"
                    disableRipple
                    sx={{
                        backgroundColor: chartType === "bar" ? "#3e95cd" : "#e0e0e0",
                        color: chartType === "bar" ? "#fff" : "#3e95cd",
                        borderRadius: "4px",
                        padding: "4px 8px", // Giảm padding của nút
                        fontSize: "0.875rem", // Giảm kích thước chữ
                        "&:hover": {
                            backgroundColor: "#3e95cd",
                            color: "#fff",
                        },
                        transition: "background-color 0.3s, color 0.3s",
                    }}
                >
                    <BarChart sx={{ fontSize: "18px", mr: 0.5 }} /> {/* Giảm kích thước icon */}
                    Biểu Đồ Sản Phẩm
                </ToggleButton>
            </ToggleButtonGroup>


            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell ref={productIdRef}>
                            <TableSortLabel
                                active={orderBy === "productId"}
                                direction={orderBy === "productId" ? order : "asc"}
                                onClick={() => handleSort("productId")}
                            >
                                Mã Sản Phẩm
                            </TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell ref={nameRef}>
                            <TableSortLabel
                                active={orderBy === "name"}
                                direction={orderBy === "name" ? order : "asc"}
                                onClick={() => handleSort("name")}
                            >
                                Tên Sản Phẩm
                            </TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell ref={quantityRef}>
                            <TableSortLabel
                                active={orderBy === "quantity"}
                                direction={orderBy === "quantity" ? order : "asc"}
                                onClick={() => handleSort("quantity")}
                            >
                                Số Lượng Bán
                            </TableSortLabel>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {statistics.map((stat, index) => (
                        <StyledTableRow
                            key={stat.productId}
                            // onClick={() => handleRowClick("productId")}
                            onClick={() => handleRowClickBar(index)}
                        >
                            <StyledTableCell>{stat.productId}</StyledTableCell>
                            <StyledTableCell>{stat.name}</StyledTableCell>
                            <StyledTableCell>{stat.quantity}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            {/* <Bar data={chartData} /> */}

        </Box>
    );
};



export default OrderStatistics;
