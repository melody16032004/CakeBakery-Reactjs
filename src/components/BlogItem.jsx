import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const BlogItem = ({ blog, onEdit, onDelete }) => {
    const navigate = useNavigate();
    return (
        <TableRow key={blog.id}>
            <TableCell>{blog.title}</TableCell>
            <TableCell>{blog.category}</TableCell>
            <TableCell>{blog.author}</TableCell>
            <TableCell>
            <IconButton onClick={() => navigate(`/addpost/${blog.id}`)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(blog.id)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default BlogItem;
