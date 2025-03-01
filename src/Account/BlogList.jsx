import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import firebaseInstance from "./Firebase Singleton Pattern/firebaseConfig";
import "./BlogList.css";
import Footer from "../components/footer";
import NavBar from "../components/navbar";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const querySnapshot = await getDocs(collection(firebaseInstance.db, "blogs"));
                const blogsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setBlogs(blogsData);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ Firestore:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    return (
        <>
            <NavBar />
            <section className="banner_area">
                <div className="container">
                    <div className="banner_text">
                        <h3>Blog</h3>
                        <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">Blog</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="blog-list-container">
                <h1>Danh sách bài viết</h1>
                <div className="blog-grid">
                    {blogs.map(blog => (
                        <div key={blog.id} className="blog-card">
                            <img src={blog.imageUrl} alt={blog.title} className="blog-image" style={{
                                scale: '.5',
                            }} />
                            <h2>{blog.title}</h2>
                            <p><strong>Thể loại:</strong> {blog.category}</p>
                            <p>{blog.description}</p>
                            <Link to={`/blogs/${blog.id}`} className="read-more">
                                Đọc thêm
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>

    );
};

export default BlogList;
