import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingOverlay = ({ loading }) => {
    if (!loading) return null; // Không hiển thị nếu không loading

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Hiệu ứng tối mờ
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <CircularProgress style={{ color: 'white' }} />
        </div>
    );
};

export default LoadingOverlay;
