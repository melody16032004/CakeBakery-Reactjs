import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./Statistics.css";

const Statistics = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalBlogs: 0,
        categoriesCount: {},
        latestBlog: null,
    });

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "invoices"));
                const blogsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setBlogs(blogsData);

                // Tính toán thống kê
                const totalBlogs = blogsData.length;

                // Đếm số bài viết theo thể loại
                const categoriesCount = blogsData.reduce((acc, blog) => {
                    acc[blog.category] = (acc[blog.category] || 0) + 1;
                    return acc;
                }, {});

                // Bài viết mới nhất
                const latestBlog = blogsData.sort(
                    (a, b) => b.createdAt.seconds - a.createdAt.seconds
                )[0];

                setStats({ totalBlogs, categoriesCount, latestBlog });
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu Firestore:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <p>Đang tải thống kê...</p>;
    }

    return (
        <div className="statistics-container">
            <h1>Thống kê bài viết</h1>
            <div className="stat-item">
                <h2>Tổng số bài viết</h2>
                <p>{stats.totalBlogs}</p>
            </div>
            <div className="stat-item">
                <h2>Số bài viết theo thể loại</h2>
                <ul>
                    {Object.entries(stats.categoriesCount).map(([category, count]) => (
                        <li key={category}>
                            <strong>{category}:</strong> {count} bài viết
                        </li>
                    ))}
                </ul>
            </div>
            <div className="stat-item">
                <h2>Bài viết mới nhất</h2>
                {stats.latestBlog ? (
                    <div>
                        <h3>{stats.latestBlog.title}</h3>
                        <p><strong>Thể loại:</strong> {stats.latestBlog.category}</p>
                        <p><strong>Mô tả:</strong> {stats.latestBlog.description}</p>
                    </div>
                ) : (
                    <p>Không có bài viết.</p>
                )}
            </div>
        </div>
    );
};

export default Statistics;
