
import React, { useState, useEffect } from 'react';
import { db } from '../Account/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

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
        <div>
            <h1>Danh sách bài viết</h1>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPost;
