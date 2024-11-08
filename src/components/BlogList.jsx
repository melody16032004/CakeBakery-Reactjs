import React, { useEffect, useState } from 'react';
import { db } from '../Account/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from '@mui/material';
import BlogItem from './BlogItem';  // Import BlogItem component

const BlogList = ({ onEdit }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogCollection = collection(db, 'blogs');
            const blogSnapshot = await getDocs(blogCollection);
            setBlogs(blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'blogs', id));
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
