import React, { useEffect, useState } from 'react';
import firebaseInstance from '../Account/Firebase Singleton Pattern/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from '@mui/material';
import BlogItem from './BlogItem';  // Import BlogItem component

const BlogList = ({ onEdit }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogCollection = collection(firebaseInstance.db, 'blogs');
            const blogSnapshot = await getDocs(blogCollection);
            setBlogs(blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        await deleteDoc(doc(firebaseInstance.db, 'blogs', id));
        setBlogs(blogs.filter(blog => blog.id !== id));
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Tiêu đề</TableCell>
                    <TableCell>Danh mục</TableCell>
                    <TableCell>Tác giả</TableCell>
                    <TableCell>Thao tác</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {blogs.map((blog) => (
                    <BlogItem
                        key={blog.id}
                        blog={blog}
                        onEdit={onEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default BlogList;
