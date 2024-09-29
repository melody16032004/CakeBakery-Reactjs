// CustomAlert.jsx
import React from 'react';
import '../index.css';

const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="custom-alert-overlay" style={styles.customAlertOverlay}>
            <div className="custom-alert" style={styles.customAlert}>
                <p>{message}</p>
                <button onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

const styles = {
    customAlertOverlay: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundcolor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifycontent: 'center',
        alignitems: 'center',
        zindex: '1000', /* Đảm bảo alert ở trên các thành phần khác */
    },
    customAlert: {
        background: 'white',
        padding: '20px',
        borderradius: '5px',
        boxshadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        textalign: 'center',
    }
};
export default CustomAlert;
