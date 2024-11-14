import React, { useEffect } from 'react';

const FacebookComments = ({ currentUrl }) => {
    useEffect(() => {
        // Kiểm tra nếu Facebook SDK đã tải thì chỉ cần khởi tạo lại plugin
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, [currentUrl]);

    return (
        <div className="fb-comments"
            data-href={currentUrl}
            data-width="100%"
            data-numposts="5">
        </div>
    );
};

export default FacebookComments;
