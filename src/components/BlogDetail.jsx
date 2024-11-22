// BlogDetail.js
import React, { useState, useEffect } from 'react';
import { db } from '../Account/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import "./BlogDetail.css"

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogRef = doc(db, 'blogs', id);
                const blogSnap = await getDoc(blogRef);
                if (blogSnap.exists()) {
                    setBlog(blogSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                // Nếu có hành động cần thực hiện sau khi hoàn thành
                console.log("Finished fetching blog data");
            }
        }; 
    
        fetchBlog();
    }, [id]);
    

    if (!blog) return <p>Loading...</p>;

    return (
        <div className="blog-detail">
        <h2 className="blog-title">{blog.title}</h2>
        <p className="blog-author">Author: {blog.author}</p>
        <p className="blog-category">Category: {blog.category}</p>
        {blog.imageUrl && <img src={blog.imageUrl} alt="Blog" className="blog-image" />}
        {/* Hiển thị thêm nội dung khác của blog nếu có */}
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
    );
};

export default BlogDetail;
