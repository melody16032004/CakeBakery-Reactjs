import React, { useState, useEffect } from 'react';
import { db } from '../Account/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import NavBar from './navbar';
import "./BlogPost.css"

const BlogPost = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogsCollection = collection(db, 'blogs');
            const blogSnapshot = await getDocs(blogsCollection);
            const BlogPost = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBlogs(BlogPost);
        };

        fetchBlogs();
    }, []);

    return (
        <div className="bg-gray">
    <NavBar />
    <div className="container">
        <h1 className="title">Danh sách bài viết</h1>
        <ul className="blog-list">
            {blogs.map(blog => (
                <li key={blog.id} className="blog-card">
                    {blog.imageUrl && (
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="blog-image"
                        />
                    )}
                    <h2 className="blog-title">{blog.title}</h2>
                    <p className="blog-description">
                        {blog.description || 'Không có mô tả'}
                    </p>
                    <Link
                        to={`/blog/${blog.id}`}
                        className="blog-link"
                    >
                        Xem chi tiết
                    </Link>
                </li>
            ))}
        </ul>
    </div>
</div>
    );
};

export default BlogPost;
