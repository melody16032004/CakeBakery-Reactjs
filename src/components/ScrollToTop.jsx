import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn về vị trí (0, 0) tức là đỉnh trang
    }, [pathname]); // Mỗi khi pathname thay đổi, nó sẽ kích hoạt

    return null; // Component này không cần phải render bất kỳ nội dung nào
};

export default ScrollToTop;
