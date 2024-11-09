// BlogDetail.js
import React, { useState, useEffect } from 'react';
import { db } from '../Account/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const blogRef = doc(db, 'blogs', id);
            const blogSnap = await getDoc(blogRef);
            if (blogSnap.exists()) {
                setBlog(blogSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) return <p>Loading...</p>;

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>Author: {blog.author}</p>
            <p>Category: {blog.category}</p>
            {blog.imageUrl && <img src={blog.imageUrl} alt="Blog" style={{ width: '100%' }} />}
            {/* Hiển thị thêm nội dung khác của blog nếu có */}
        </div>
    );
};

export default BlogDetail;
