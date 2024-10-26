import React, { useState, useEffect } from 'react';

const SelectLocation = () => {
    const [tinh, setTinh] = useState([]);
    const [quan, setQuan] = useState([]);
    const [phuong, setPhuong] = useState([]);
    const [selectedTinh, setSelectedTinh] = useState("0");
    const [selectedQuan, setSelectedQuan] = useState("0");

    // Lấy danh sách tỉnh thành khi component được mount
    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 0) {
                    setTinh(data.data);
                }
            })
            .catch((error) => console.error('Lỗi khi lấy tỉnh thành:', error));
    }, []);

    // Lấy danh sách quận huyện khi tỉnh được chọn
    useEffect(() => {
        if (selectedTinh !== "0") {
            fetch(`https://esgoo.net/api-tinhthanh/2/${selectedTinh}.htm`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 0) {
                        setQuan(data.data);
                        setPhuong([]); // Xóa danh sách phường khi thay đổi tỉnh
                    }
                })
                .catch((error) => console.error('Lỗi khi lấy quận huyện:', error));
        }
    }, [selectedTinh]);

    // Lấy danh sách phường xã khi quận được chọn
    useEffect(() => {
        if (selectedQuan !== "0") {
            fetch(`https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 0) {
                        setPhuong(data.data);
                    } else {
                        console.error('Không tìm thấy phường xã:', data.message);
                    }
                })
                .catch((error) => console.error('Lỗi khi lấy phường xã:', error));
        }
    }, [selectedQuan]);

    return (
        <div className="css_select_div">
            <select
                className="css_select"
                id="tinh"
                name="tinh"
                title="Chọn Tỉnh Thành"
                value={selectedTinh}
                onChange={(e) => {
                    setSelectedTinh(e.target.value);
                    setSelectedQuan("0");  // Đặt lại quận và phường khi chọn tỉnh mới
                    setPhuong([]);
                }}
            >
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
                    setSelectedQuan(e.target.value);
                    setPhuong([]); // Đặt lại phường khi chọn quận mới
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
