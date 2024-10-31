import React, { useState, useEffect } from 'react';

const SelectLocation = ({ onCityChange, onProvinceChange, onDistrictChange }) => {
    const [tinh, setTinh] = useState([]);
    const [quan, setQuan] = useState([]);
    const [phuong, setPhuong] = useState([]);
    const [selectedTinh, setSelectedTinh] = useState("0");
    const [selectedQuan, setSelectedQuan] = useState("0");

    // Fetch cities when component mounts
    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 0) {
                    setTinh(data.data);
                }
            })
            .catch((error) => console.error('Error fetching cities:', error));
    }, []);

    // Fetch districts when a city is selected
    useEffect(() => {
        if (selectedTinh !== "0") {
            fetch(`https://esgoo.net/api-tinhthanh/2/${selectedTinh}.htm`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 0) {
                        setQuan(data.data);
                        setPhuong([]); // Reset wards
                        const cityName = tinh.find((t) => t.id === selectedTinh)?.full_name;
                        onCityChange && onCityChange(cityName || '');
                    }
                })
                .catch((error) => console.error('Error fetching districts:', error));
        }
    }, [selectedTinh, tinh, onCityChange]);

    // Fetch wards when a district is selected
    useEffect(() => {
        if (selectedQuan !== "0") {
            fetch(`https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 0) {
                        setPhuong(data.data);
                        const districtName = quan.find((q) => q.id === selectedQuan)?.full_name;
                        onProvinceChange && onProvinceChange(districtName || '');
                    }
                })
                .catch((error) => console.error('Error fetching wards:', error));
        }
    }, [selectedQuan, quan, onProvinceChange]);

    return (
        <div className="css_select_div">
            <select
                className="css_select"
                id="tinh"
                name="tinh"
                title="Chọn Tỉnh Thành"
                value={selectedTinh}
                onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedTinh(selectedValue);
                    setSelectedQuan("0"); // Reset district and ward when changing city
                    setPhuong([]);
                }}>
                <option value="0">Tỉnh Thành</option>
                {tinh.map((t) => (
                    <option key={t.id} value={t.id}>{t.full_name}</option>
                ))}
            </select>

            <select
                className="css_select"
                id="quan"
                name="quan"
                title="Chọn Quận Huyện"
                value={selectedQuan}
                onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedQuan(selectedValue);
                    setPhuong([]); // Reset ward when changing district
                    const districtName = quan.find((q) => q.id === selectedValue)?.full_name;
                    onDistrictChange && onDistrictChange(districtName || '');
                }}
            >
                <option value="0">Quận Huyện</option>
                {quan.map((q) => (
                    <option key={q.id} value={q.id}>{q.full_name}</option>
                ))}
            </select>

            <select
                className="css_select"
                id="phuong"
                name="phuong"
                title="Chọn Phường Xã"
                onChange={(e) => {
                    const selectedValue = e.target.value;
                    const wardName = phuong.find((p) => p.id === selectedValue)?.full_name;
                    onDistrictChange && onDistrictChange(wardName || '');
                }}
            >
                <option value="0">Phường Xã</option>
                {phuong.map((p) => (
                    <option key={p.id} value={p.id}>{p.full_name}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectLocation;
