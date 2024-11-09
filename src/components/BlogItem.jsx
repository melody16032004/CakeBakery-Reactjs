import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const BlogItem = ({ blog, onEdit, onDelete }) => {
    return (
        <TableRow key={blog.id}>
            <TableCell>{blog.title}</TableCell>
            <TableCell>{blog.category}</TableCell>
            <TableCell>{blog.author}</TableCell>
            <TableCell>
                <IconButton onClick={() => onEdit(blog)}>
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
