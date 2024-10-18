import React, { useState } from 'react';
import axios from 'axios';

const MoMoPayment = () => {
    const [amount, setAmount] = useState(10000);  // Số tiền thanh toán mặc định là 10,000 VND
    const [loading, setLoading] = useState(false);  // Trạng thái loading

    const handleMoMoPayment = async () => {
        setLoading(true);  // Bật trạng thái loading
        try {
            const response = await axios.post('/api/momo/payment', { amount });

            if (response.data && response.data.payUrl) {
                window.location.href = response.data.payUrl;  // Chuyển hướng tới URL thanh toán MoMo
            } else {
                alert('Không thể lấy URL thanh toán MoMo');
            }
        } catch (error) {
            console.error('Lỗi khi thanh toán với MoMo:', error);
            alert('Có lỗi xảy ra khi thanh toán với MoMo.');
        }
        setLoading(false);  // Tắt trạng thái loading
    };

    return (
        <div style={styles.container}>
            <h3>Thanh toán với MoMo</h3>

            {/* Nhập số tiền cần thanh toán */}
            <div style={styles.formGroup}>
                <label>Số tiền:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={styles.input}
                />
            </div>

            {/* Nút thanh toán với MoMo */}
            <button
                onClick={handleMoMoPayment}
                style={styles.button}
                disabled={loading}
            >
                {loading ? 'Đang xử lý...' : 'Thanh toán qua MoMo'}
            </button>
        </div>
    );
};

// Một số style đơn giản cho giao diện
const styles = {
    container: {
        padding: '20px',
        maxWidth: '400px',
        margin: '50px auto',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9'
    },
    formGroup: {
        marginBottom: '20px'
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        width: '100%'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#ff5f00',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    }
};

export default MoMoPayment;
