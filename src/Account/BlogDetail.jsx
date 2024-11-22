import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("ID bài viết không hợp lệ!");
            return;
        }

        const fetchBlog = async () => {
            try {
                const docRef = doc(db, "blogs", id); // Kiểm tra nếu `id` hợp lệ
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setBlog({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError("Bài viết không tồn tại!");
                }
            } catch (err) {
                setError("Có lỗi xảy ra khi tải bài viết.");
                console.error("Error fetching blog:", err);
            }
        };

        fetchBlog();
    }, [id]);

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!blog) {
        return <p>Đang tải bài viết...</p>;
    }

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <h1>{blog.title}</h1>
            <img
                src={blog.imageUrl}
                alt={blog.title}
                style={{ width: "100%", borderRadius: "8px", margin: "20px 0" }}
            />
            <p>
                <strong>Thể loại:</strong> {blog.category}
            </p>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} style={{ lineHeight: "1.6", color: "#333" }} />
        </div>
    );
};

export default BlogDetails;
