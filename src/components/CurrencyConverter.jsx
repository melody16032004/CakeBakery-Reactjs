import React from "react";

const usdToVndRate = 25000;
const CurrencyConverter = ({ usdAmount }) => {

    const formatTOVND = (usd) => {
        return (usd * usdToVndRate).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    return <span>{formatTOVND(usdAmount)}</span>;
}

export default CurrencyConverter